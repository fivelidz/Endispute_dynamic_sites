import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Endispute — Two Sides. One Resolution.",
  description:
    "Endispute is a leading provider of dispute resolution, advisory and management services for complex disputes across Australia and internationally.",
  keywords: [
    "dispute resolution",
    "arbitration",
    "mediation",
    "conflict resolution",
    "Endispute",
    "Tania Sourdin",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
