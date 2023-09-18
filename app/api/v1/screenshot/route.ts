import { NextResponse } from "next/server";
import { screenshot } from "./screenshot";
import { sizePreset } from "@/lib/sizePresets";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const urlRaw = searchParams.get("url");
  const preset = sizePreset(searchParams.get("preset"));

  if (!urlRaw) {
    return NextResponse.error();
  }

  const url = new URL(urlRaw);
  const buffer = await screenshot({ url, width: preset[0], height: preset[1] });

  const res = new Response(buffer);
  return res;
}
