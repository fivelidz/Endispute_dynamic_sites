import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.endispute.com.au"),
  title: "Endispute — Dispute Resolution & Advisory",
  description:
    "Endispute is a leading provider of dispute resolution, advisory and management services for complex disputes — across Australia and internationally.",
  keywords: [
    "dispute resolution",
    "mediation",
    "arbitration",
    "commercial disputes",
    "NBN resolution advisor",
    "Australia",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Endispute — Leaders in Conflict Resolution",
    description:
      "Expert dispute resolution, advisory and management services for complex commercial matters.",
    url: "https://www.endispute.com.au",
    siteName: "Endispute",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "/Endispute-V1Taniafinal.jpg",
        width: 1200,
        height: 630,
        alt: "Endispute — Dispute Resolution & Advisory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Endispute — Leaders in Conflict Resolution",
    description:
      "Expert dispute resolution, advisory and management services for complex commercial matters.",
    images: [
      {
        url: "/Endispute-V1Taniafinal.jpg",
        alt: "Endispute — Dispute Resolution & Advisory",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
