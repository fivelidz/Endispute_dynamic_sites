import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Endispute — Leaders in Conflict Resolution",
  description:
    "Endispute is a leading provider of dispute resolution, dispute advisory and dispute management services in respect of complex disputes. Australia & internationally.",
  keywords:
    "dispute resolution, mediation, arbitration, ADR, commercial disputes, Australia",
  openGraph: {
    title: "Endispute — Leaders in Conflict Resolution",
    description:
      "Dispute resolution, advisory and management services for complex commercial matters.",
    url: "https://endispute.com.au",
    siteName: "Endispute",
    locale: "en_AU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU">
      <head>
        {/* This site is already dark — tell the browser (and dark-mode
            extensions like Dark Reader) not to re-tint it, which can otherwise
            invert colours and hide images. */}
        <meta name="color-scheme" content="dark" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-[#0a0a0a] text-[#f4eedf] antialiased">{children}</body>
    </html>
  );
}
