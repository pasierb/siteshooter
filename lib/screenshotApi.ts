const { LAMBDA_ACCESS_KEY } = process.env;
const CDN_BASE_URL = "https://cdn.siteshooter.app/";
const LAMBDA_EXECUTE_URL =
  "https://2qcip9gtv1.execute-api.eu-west-1.amazonaws.com/Prod/";

export interface ScreenshotConfig extends Object {
  url: string;
  width: number;
  height: number;
  scrollIntoView?: string | null;
  removeEl: string[];
  imageKey: string;
}

export async function createScreenshot(config: ScreenshotConfig) {
  const screenshotUrl = await fetch(LAMBDA_EXECUTE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${LAMBDA_ACCESS_KEY}`,
    },
    body: JSON.stringify(config),
  })
    .then((res) => {
      if (!res.ok) {
        //   errorResponse = res;
        throw new Error("Failed to generate screenshot");
      }

      return res;
    })
    .then((res) => res.text());

  const url = new URL(screenshotUrl);
  return url;
}
