import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
