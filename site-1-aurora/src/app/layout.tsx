import type { Metadata } from 'next';
import './globals.css';
import { company, contact } from '@/lib/content';

export const metadata: Metadata = {
  title: {
    default: `${company.name} — ${company.shortPitch}`,
    template: `%s | ${company.name}`,
  },
  description: company.about,
  keywords: [
    'dispute resolution',
    'mediation',
    'arbitration',
    'commercial disputes',
    'ADR',
    'Australia',
    'Endispute',
  ],
  authors: [{ name: company.name, url: 'https://endispute.com.au' }],
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://endispute.com.au',
    siteName: company.name,
    title: `${company.name} — ${company.shortPitch}`,
    description: company.about,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${company.name} — ${company.shortPitch}`,
    description: company.about,
  },
  metadataBase: new URL('https://endispute.com.au'),
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://endispute.com.au' },
  other: {
    'contact:phone_number': contact.phone,
    'contact:email': contact.email,
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
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
