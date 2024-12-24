import localFont from "next/font/local";

export const Inter = localFont({
  src: [
    {
      path: "../public/fonts/inter/Inter-Italic-VariableFont_opsz,wght.ttf",
      style: "italic",
      weight: "100 900",
    },
    {
      path: "../public/fonts/inter/Inter-VariableFont_opsz,wght.ttf",
      style: "normal",
      weight: "100 900",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const Schabo = localFont({
  src: "../public/fonts/SCHABO-Condensed.otf",
  variable: "--font-schabo",
  display: "swap",
});
