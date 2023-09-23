"use client";

import { useEffect } from "react";
import Script from "next/script";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function LaunchTally() {
  useEffect(() => {
    if (window.Tally) {
      window.Tally.loadEmbeds();
    }
  }, []);

  return (
    <>
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold">Siteshooter is going live!</h2>
        </CardHeader>
        <CardContent>
          <iframe
            data-tally-src="https://tally.so/embed/n0BXXj?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
            loading="lazy"
            width="100%"
            height="387"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="Coming soon!"
          ></iframe>
        </CardContent>
      </Card>
      <Script
        id="tally-js"
        src="https://tally.so/widgets/embed.js"
        onLoad={() => {
          window.Tally.loadEmbeds();
        }}
      />
    </>
  );
}
