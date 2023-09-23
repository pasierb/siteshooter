import { ScreenshotSizePreset, screenshotSizePresets } from "@/lib/sizePresets";
import packageJson from "@/package.json";

const buildId = `v${packageJson.version}`;
const apiKey =
  "1a25f1f0f8baa749f69708c1cca906981d921809672a7106e338a35e9a8278bb";

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
