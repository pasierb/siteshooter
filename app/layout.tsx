import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PageNav } from "@/src/page-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Siteshooter.app",
  description: "Screenshot as a Service. No libraries, just the URL",
  applicationName: "Siteshooter.app",
  openGraph: {
    type: "website",
    url: "https://www.siteshooter.app",
    title: "Siteshooter.app",
    description: "Screenshot as a Service. No libraries, just the URL",
    locale: 'en_US',
    images: [
      {
        url: "https://www.siteshooter.app/api/shot?url=https%3A%2F%2Fwww.siteshooter.app%2F%3Fv2&preset=twitterStream&key=1a25f1f0f8baa749f69708c1cca906981d921809672a7106e338a35e9a8278bb",
        width: 1600,
        height: 900,
      },
      {
        url: "https://www.siteshooter.app/api/shot?url=https%3A%2F%2Fwww.siteshooter.app%2F%3Fv2&preset=twitterCard&key=1a25f1f0f8baa749f69708c1cca906981d921809672a7106e338a35e9a8278bb",
        width: 800,
        height: 418,
      },
      {
        url: "https://www.siteshooter.app/api/shot?url=https%3A%2F%2Fwww.siteshooter.app%2F%3Fv2&preset=browserWindow&key=1a25f1f0f8baa749f69708c1cca906981d921809672a7106e338a35e9a8278bb",
        width: 1366,
        height: 768,
      },
      {
        url: "https://www.siteshooter.app/api/shot?url=https%3A%2F%2Fwww.siteshooter.app%2F%3Fv2&preset=browserWindow&key=1a25f1f0f8baa749f69708c1cca906981d921809672a7106e338a35e9a8278bb",
        width: 800,
        height: 600,
      }
    ]
  },
  keywords: [
    "screenshot",
    "api",
    "service",
    "url",
    "SaaS",
    "screenshots",
    "opengraph",
    "OG",
    "images",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PageNav />
        <main className="py-16">{children}</main>
        <footer></footer>
      </body>
    </html>
  );
}
