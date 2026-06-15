import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Endispute — End Your Dispute',
  description:
    'Leaders in Conflict Resolution. Endispute provides dispute resolution, advisory and management services for complex commercial disputes across Australia and internationally.',
  keywords: [
    'dispute resolution',
    'mediation',
    'arbitration',
    'ADR',
    'commercial disputes',
    'Australia',
    'Endispute',
  ],
  openGraph: {
    title: 'Endispute — End Your Dispute',
    description: 'Leaders in Conflict Resolution.',
    url: 'https://endispute.com.au',
    siteName: 'Endispute',
    locale: 'en_AU',
    type: 'website',
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
