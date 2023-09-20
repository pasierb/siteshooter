import { NextResponse } from "next/server";
import { sizePreset } from "@/lib/sizePresets";

const CDN_BASE_URL = "https://cdn.siteshooter.app/";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const urlRaw = searchParams.get("url");
  const preset = sizePreset(searchParams.get("preset"));

  if (!urlRaw) {
    return NextResponse.error();
  }

  const screenshotUrl = await fetch(
    " https://2qcip9gtv1.execute-api.eu-west-1.amazonaws.com/Prod/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: new URL(urlRaw).toString(),
        width: preset[0],
        height: preset[1],
      }),
    }
  ).then((res) => res.text());

  const url = new URL(screenshotUrl);
  const cdnUrl = new URL(url.pathname, CDN_BASE_URL);

  return Response.redirect(cdnUrl, 301);
}
