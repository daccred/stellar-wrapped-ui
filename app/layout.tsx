import { Inter, Schabo } from "../utlis/font";
import "./global.css";
import { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Stellar Wrapped",
  description:
    "Dive into your Stellar wallet activity to uncover insights, track transactions, explore DeFi, and see your impact on the ecosystem.",
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
        {children}
      </body>
    </html>
  );
}
