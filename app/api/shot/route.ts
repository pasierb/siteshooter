import { NextResponse } from "next/server";
import { screenshotSizePresets, ScreenshotSizePreset } from "@/lib/sizePresets";
import { touchApiKey, authenticateApiKey } from "@/lib/apiKey";
import { createScreenshot, ScreenshotConfig } from "@/lib/screenshotApi";
import { simpleHash } from "@/lib/hash";
import { UnauthorizedError } from "@/lib/errors";
import { supabaseServiceRole } from "@/lib/supabaseClient";

const CDN_BASE_URL = "https://cdn.siteshooter.app/";

function parseScreenshotSizePreset(
  preset: string | null
): ScreenshotSizePreset {
  if (!preset) return ScreenshotSizePreset.twitterCard;

  return ScreenshotSizePreset[preset as keyof typeof ScreenshotSizePreset];
}

function getConfig(request: Request): Omit<ScreenshotConfig, "imageKey"> {
  const { searchParams } = new URL(request.url);
  const urlRaw = searchParams.get("url");

  if (!urlRaw) {
    throw new Error("Missing url");
  }

  const presetEnum = parseScreenshotSizePreset(searchParams.get("preset"));
  const preset = screenshotSizePresets[presetEnum];

  const config = {
    url: new URL(decodeURIComponent(urlRaw)).toString(),
    width: preset.width,
    height: preset.height,
    scrollIntoView: searchParams.get("scrollIntoView"),
    removeEl: searchParams
      .getAll("removeEl")
      .map((el) => el.trim())
      .filter((el) => el.length > 0)
      .map((el) => decodeURIComponent(el)),
  };

  return { ...config };
}

async function getSchotByKey(key: string) {
  const { data, error } = await supabaseServiceRole
    .from("shots")
    .select("*")
    .eq("image_key", key);

  if (error) {
    throw error;
  }

  return data[0] ?? null;
}

export const dynamic = "force-dynamic";

function callScreenshotApi(
  config: Omit<ScreenshotConfig, "imageKey">,
  updatedAt: Date
) {
  const apiImageKey = simpleHash(
    JSON.stringify({ ...config, t: updatedAt.getTime() })
  );

  return createScreenshot({ ...config, imageKey: apiImageKey });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const apiKeyValue = searchParams.get("key");
  const invalidateCache = searchParams.get("invalidateCache") === "1";

  try {
    const apiKey = await authenticateApiKey(apiKeyValue);
    touchApiKey(apiKey.id); // No need to await response.

    const config = getConfig(request);
    const imageKey = simpleHash(JSON.stringify(config));
    const existingShot = await getSchotByKey(imageKey);
    const updatedAt =
      existingShot !== null && !invalidateCache
        ? new Date(existingShot.updated_at)
        : new Date();

    let screenshotUrl: URL | null;
    if (existingShot !== null) {
      if (invalidateCache) {
        screenshotUrl = await callScreenshotApi(config, updatedAt);

        await supabaseServiceRole
          .from("shots")
          .update({
            updated_at: updatedAt.toISOString(),
            image_url: screenshotUrl.toString(),
          })
          .eq("image_key", imageKey);
      } else {
        screenshotUrl = new URL(existingShot.image_url);
      }
    } else {
      screenshotUrl = await callScreenshotApi(config, updatedAt);

      await supabaseServiceRole.from("shots").insert({
        api_key_id: apiKey.id,
        image_key: imageKey,
        image_url: screenshotUrl.toString(),
        config: JSON.parse(JSON.stringify(config)), // TODO: Find a better way to do this.
        user_id: apiKey.user_id,
        updated_at: updatedAt.toISOString(),
      });
    }

    const cdnUrl = new URL(screenshotUrl.pathname, CDN_BASE_URL);
    return Response.redirect(cdnUrl, 302);
  } catch (e) {
    if (e instanceof UnauthorizedError) {
      return new Response(e.message, { status: 401 });
    }

    console.error(e);
    return NextResponse.error();
  }
}
