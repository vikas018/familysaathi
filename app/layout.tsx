import type { Metadata, Viewport } from 'next'
import './globals.css'
import { config } from '@/lib/config'

export const metadata: Metadata = {
  metadataBase: new URL(config.siteUrl),
  title: 'FamilySaathi — Verified Drivers for Your Car, in Meerut',
  description:
    'Get a verified, trained driver for your own car in Meerut — in 30 minutes. Hourly, outstation to Delhi-NCR, weddings or daily. Plus trusted help for your family. Talk before you book.',
  keywords: [
    'driver on hire Meerut',
    'hire driver for own car Meerut',
    'outstation driver Meerut Delhi',
    'verified driver Meerut',
    'family assistance Meerut',
    'FamilySaathi',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    title: 'FamilySaathi — Verified Drivers for Your Car, in Meerut',
    description:
      'Verified, trained drivers for your own car in Meerut — hourly, outstation to Delhi-NCR, weddings or daily. Plus trusted family help. Talk before you book.',
    locale: 'en_IN',
    url: '/',
    siteName: 'FamilySaathi',
  },
}

export const viewport: Viewport = {
  themeColor: '#1E3A8A',
  width: 'device-width',
  initialScale: 1,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'FamilySaathi',
  description:
    'Verified drivers for your own car and trusted family assistance in Meerut and the Delhi-NCR corridor.',
  areaServed: 'Meerut, Uttar Pradesh, India',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Meerut',
    addressRegion: 'Uttar Pradesh',
    addressCountry: 'IN',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
