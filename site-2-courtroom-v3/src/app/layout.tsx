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
        {/* This site is already dark. Tell the browser its colour scheme is
            dark, and explicitly lock Dark Reader OFF — the extension was
            re-tinting the already-dark page and hiding the portrait. The
            `darkreader-lock` meta is Dark Reader's official opt-out and fully
            disables it for this page. */}
        <meta name="color-scheme" content="dark" />
        <meta name="darkreader-lock" />
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
