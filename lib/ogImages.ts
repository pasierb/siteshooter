import { ScreenshotSizePreset, screenshotSizePresets } from "@/lib/sizePresets";
import packageJson from "@/package.json";

const buildId = `v${packageJson.version}`;
const apiKey = process.env.NEXT_PUBLIC_PREVIEW_API_KEY!;

export function pageOgImages(slug: string) {
  return [
    ScreenshotSizePreset.twitterStream,
    // ScreenshotSizePreset.browserWindow,
    // ScreenshotSizePreset.twitterCard,
    // ScreenshotSizePreset.iphone12pro,
  ].map((preset) => {
    const { width, height } = screenshotSizePresets[preset];

    const url = new URL(slug, "https://www.siteshooter.app");
    url.searchParams.set("v", buildId);

    const siteshotUrl = new URL("/api/shot", "https://www.siteshooter.app");
    siteshotUrl.searchParams.set("url", url.toString());
    siteshotUrl.searchParams.set("preset", preset);
    siteshotUrl.searchParams.set("key", apiKey);

    return {
      width,
      height,
      url: siteshotUrl.toString(),
    };
  });
}
