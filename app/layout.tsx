import type { Metadata } from 'next';
import { Archivo, Inter } from 'next/font/google';
import './globals.css';
import { site } from '@/lib/site';
import { JsonLd } from '@/components/JsonLd';
import { Preloader } from '@/components/Preloader';

const display = Archivo({
  subsets: ['latin'],
  weight: ['600', '700', '800', '900'],
  variable: '--font-display',
  display: 'swap',
});

const sans = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Automotora en Paysandú — Usados y 0 km`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    'automotora Paysandú',
    'autos usados Paysandú',
    'autos usados Uruguay',
    'comprar auto Paysandú',
    'venta de autos Paysandú',
    'financiación de autos Uruguay',
    'permuta de autos',
    'JP Automóviles',
    'camionetas usadas Uruguay',
    'pick up usadas',
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'es_UY',
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Automotora en Paysandú`,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — Automotora en Paysandú`,
    description: site.description,
  },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans">
        <JsonLd />
        <Preloader />
        {children}
      </body>
    </html>
  );
}
