import type { Metadata } from "next";
import { EB_Garamond, Cormorant_SC, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

// Self-hosted via next/font with display:swap so text paints immediately
// (no render-blocking external stylesheet, no FOIT).
const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-garamond-next",
});

const cormorant = Cormorant_SC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-smallcaps-next",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-mono-next",
});

export const metadata: Metadata = {
  title: "Endispute — Leaders in Conflict Resolution",
  description:
    "Endispute is a leading provider of dispute resolution, advisory and management services for complex disputes across Australia and internationally.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${garamond.variable} ${cormorant.variable} ${plexMono.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
