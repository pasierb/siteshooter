import { NextResponse } from "next/server";
import { sizePreset } from "@/lib/sizePresets";

const CDN_BASE_URL = "https://cdn.siteshooter.app/";
const { LAMBDA_ACCESS_KEY } = process.env;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const urlRaw = searchParams.get("url");
  const preset = sizePreset(searchParams.get("preset"));

  if (!urlRaw) {
    return NextResponse.error();
  }

  let errorResponse = null;
  try {
    const screenshotUrl = await fetch(
      " https://2qcip9gtv1.execute-api.eu-west-1.amazonaws.com/Prod/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${LAMBDA_ACCESS_KEY}`,
        },
        body: JSON.stringify({
          url: new URL(decodeURIComponent(urlRaw)).toString(),
          width: preset[0],
          height: preset[1],
          removeEl: searchParams
            .getAll("removeEl")
            .map(el => el.trim())
            .filter(el => el.length > 0)
            .map(el => decodeURIComponent(el)),
        }),
      }
    )
      .then((res) => {
        if (!res.ok) {
          errorResponse = res;
          throw new Error("Failed to generate screenshot");
        }

        return res;
      })
      .then((res) => res.text());

    const url = new URL(screenshotUrl);
    const cdnUrl = new URL(url.pathname, CDN_BASE_URL);

    return Response.redirect(cdnUrl, 301);
  } catch (e) {
    return errorResponse || NextResponse.error();
  }
}
