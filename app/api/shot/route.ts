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

function getConfig(request: Request): ScreenshotConfig {
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

  return {
    ...config,
    imageKey: simpleHash(JSON.stringify(config)),
  };
}

async function getSchotByKey(key: string) {
  const { data } = await supabaseServiceRole
    .from("shots")
    .select("*")
    .eq("image_key", key)
    .single();

  return data;
}

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const apiKeyValue = searchParams.get("key");

  try {
    const apiKey = await authenticateApiKey(apiKeyValue);
    touchApiKey(apiKey.id); // No need to await response.

    const config = getConfig(request);
    const existingShot = await getSchotByKey(config.imageKey);
    let screenshotUrl: URL | null;

    if (existingShot !== null) {
      screenshotUrl = new URL(existingShot.image_url);
    } else {
      screenshotUrl = await createScreenshot(config);

      // Don't wait for this to finish.
      // TODO: Log errors.
      supabaseServiceRole
        .from("shots")
        .insert({
          api_key_id: apiKey.id,
          image_key: config.imageKey,
          image_url: screenshotUrl.toString(),
          config: JSON.parse(JSON.stringify(config)), // TODO: Find a better way to do this.
          user_id: apiKey.user_id,
        })
        .then(console.log);
    }

    const cdnUrl = new URL(screenshotUrl.pathname, CDN_BASE_URL);
    return Response.redirect(cdnUrl, 301);
  } catch (e) {
    if (e instanceof UnauthorizedError) {
      return new Response(e.message, { status: 401 });
    }

    return NextResponse.error();
  }
}
