import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Endispute — Dispute Resolution, Advisory & Management",
  description:
    "Endispute is a leading provider of dispute resolution, dispute advisory and dispute management services for complex disputes across Australia and internationally.",
  keywords: [
    "dispute resolution",
    "arbitration",
    "mediation",
    "conflict resolution",
    "dispute advisory",
    "dispute management",
    "Endispute",
  ],
  openGraph: {
    title: "Endispute — Dispute Resolution, Advisory & Management",
    description:
      "Leaders in conflict resolution. Tailored dispute processes for complex commercial disputes.",
    type: "website",
  },
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
