import { NextResponse } from "next/server";
import { screenshotSizePresets, ScreenshotSizePreset } from "@/lib/sizePresets";
import { touchApiKey, authenticateApiKey } from "@/lib/apiKey";
import { createScreenshot, ScreenshotConfig } from "@/lib/screenshotApi";
import { simpleHash } from "@/lib/hash";
import { UnauthorizedError } from "@/lib/errors";
import { supabaseServiceRole } from "@/lib/supabaseClient";
import type { Database } from "@/types/supabase";

const CDN_BASE_URL = "https://cdn.siteshooter.app/";

type ApiKey = Database["public"]["Tables"]["api_keys"]["Row"];
type Shot = Database["public"]["Tables"]["shots"]["Row"];

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

async function getSchotByKey(key: string, userId: string) {
  const { data, error } = await supabaseServiceRole
    .from("shots")
    .select("*")
    .eq("image_key", key)
    .eq("user_id", userId);

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

function createInvocation(apiKey: ApiKey, shotId: string) {
  return supabaseServiceRole.from("shot_invocations").insert({
    api_key_id: apiKey.id,
    user_id: apiKey.user_id,
    shot_id: shotId,
  });
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
    const existingShot = await getSchotByKey(imageKey, apiKey.user_id);
    const updatedAt =
      existingShot !== null && !invalidateCache
        ? new Date(existingShot.updated_at)
        : new Date();

    let screenshotUrl: URL | null;
    if (existingShot !== null) {
      if (invalidateCache) {
        screenshotUrl = await callScreenshotApi(config, updatedAt);

        await Promise.all([
          supabaseServiceRole
            .from("shots")
            .update({
              updated_at: updatedAt.toISOString(),
              image_url: screenshotUrl.toString(),
            })
            .eq("image_key", imageKey),
          createInvocation(apiKey, existingShot.id),
        ]);
      } else {
        screenshotUrl = new URL(existingShot.image_url);
      }
    } else {
      screenshotUrl = await callScreenshotApi(config, updatedAt);

      const { data: existingShot, error } = await supabaseServiceRole
        .from("shots")
        .insert({
          image_key: imageKey,
          image_url: screenshotUrl.toString(),
          config: JSON.parse(JSON.stringify(config)), // TODO: Find a better way to do this.
          user_id: apiKey.user_id,
          updated_at: updatedAt.toISOString(),
        })
        .select("id")
        .single();

      if (error) {
        console.error(error);
        throw error;
      }

      await createInvocation(apiKey, existingShot.id);
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
