import { Playground } from "@/components/playground";
import type { Metadata } from "next";
import { pageOgImages } from "@/lib/ogImages";
import { metadata as layoutMetadata } from "@/app/layout";

const ogImages = pageOgImages("/playground");

export const metadata: Metadata = {
  ...layoutMetadata,
  openGraph: {
    ...layoutMetadata.openGraph,
    url: "https://www.siteshooter.app/playground",
    images: ogImages,
  },
};

const initialImageUrl = new URL(ogImages[0].url);
const initialUrl = new URL(initialImageUrl.searchParams.get("url")!);

export default function PlaygroundPage() {
  return (
    <div className="container">
      <Playground
        initialImageUrl={initialImageUrl.toString()}
        initialUrl={initialUrl.toString()}
      />
    </div>
  );
}
