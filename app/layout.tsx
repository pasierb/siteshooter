import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PageNav } from "@/components/page-nav";
import { Footer } from "@/components/footer";
import { pageOgImages } from "@/lib/ogImages";
import { GoogleAnalytics } from "@/components/google-analytics";
import { CookieConsent } from "@/components/cookie-consent";

const inter = Inter({ subsets: ["latin"] });
const gaMeasurementId = "G-6KM36XLXJL";
const isDev = process.env.NEXT_PUBLIC_DEV === "true";

export const metadata: Metadata = {
  title: "Siteshooter.app",
  description: "Screenshot as a Service. No libraries, just the URL",
  applicationName: "Siteshooter.app",
  openGraph: {
    type: "website",
    url: "https://www.siteshooter.app",
    title: "Siteshooter.app",
    description: "Screenshot as a Service. No libraries, just the URL",
    locale: "en_US",
    images: pageOgImages("/"),
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
      {!isDev && <GoogleAnalytics measurementId={gaMeasurementId} />}
      <body className={inter.className}>
        <PageNav />
        <main className="py-16">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
