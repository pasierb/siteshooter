import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PageNav } from "@/src/page-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Siteshooter.app",
  description: "Screenshot as a Service. No libraries, just the URL",
  applicationName: "Siteshooter.app",
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
