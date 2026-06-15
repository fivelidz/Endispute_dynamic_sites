import type { Metadata, Viewport } from "next";
import { Libre_Caslon_Text, Inter, Spline_Sans_Mono } from "next/font/google";
import "./globals.css";

const serif = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif-g",
  display: "swap",
});
const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans-g",
  display: "swap",
});
const mono = Spline_Sans_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono-g",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Endispute — Two Sides. One Resolution.",
  description:
    "Endispute resolves complex commercial disputes through facilitative, advisory and determinative processes — out of court and in confidence, across Australia and internationally.",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
