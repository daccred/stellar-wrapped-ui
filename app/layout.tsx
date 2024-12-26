import Providers from "@/providers";
import { Inter, Schabo } from "../utlis/font";
import "./global.css";
import { Metadata, Viewport } from "next";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const meta = {
  title: "Stellar Wrapped 2024",
  description:
    "Dive into your Stellar wallet activity to uncover insights, track transactions, explore DeFi, and see your impact on the ecosystem.",
  cardImage: "/stellar-logo.svg",
  robots: "follow, index",
  favicon: "/stellar-logo.svg",
  metadataBase: new URL(defaultUrl),
  url: defaultUrl,
  type: "website",
};

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  applicationName: meta.title,
  authors: [{ name: "Attest.so" }],
  creator: "Attest",
  publisher: "Attest.so",
  robots: meta.robots,
  metadataBase: new URL(meta.url),
  openGraph: {
    url: meta.url,
    title: meta.title,
    description: meta.description,
    type: meta.type,
    siteName: meta.title,
    images: [
      {
        url: meta.cardImage,
        width: 512,
        height: 512,
        alt: "Stellar Wrapped 2024 - Your Year in Stellar",
      },
    ],
  } as OpenGraph,
  twitter: {
    card: "summary",
    title: meta.title,
    description: meta.description,
    images: [meta.cardImage],
    creator: "@stellar",
    site: "@stellar",
  },
  icons: [
    {
      rel: "icon",
      url: meta.favicon,
    },
    {
      rel: "apple-touch-icon",
      url: meta.favicon,
    },
  ],
  keywords: [
    "Stellar",
    "Wrapped",
    "Blockchain",
    "Cryptocurrency",
    "NFT",
    "DeFi",
    "Web3",
    "Developer Tools",
    "Stellar Ecosystem",
  ],
  category: "Technology",
  classification: "Blockchain Analytics",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${Inter.variable} ${Schabo.variable} font-inter`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
