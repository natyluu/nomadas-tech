import type { Metadata } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Nómadas Tech | Marketing Digital 360°',
  description:
    'Agencia de marketing digital 360°. Diseño web, SEO, Google Analytics, Meta Pixel, CRM y automatizaciones — todo incluido, listo para vender desde el día 1.',
  keywords:
    'agencia marketing digital, diseño web, seo, meta pixel, google analytics, crm, e-commerce, automatizaciones',
  authors: [{ name: 'Nómadas Tech' }],
  openGraph: {
    title: 'Nómadas Tech | Marketing Digital 360°',
    description:
      'Ecosistema completo de marketing digital para vender online desde el día 1.',
    url: 'https://nomadas.tech',
    siteName: 'Nómadas Tech',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nómadas Tech | Marketing Digital 360°',
    description:
      'Ecosistema completo de marketing digital para vender online desde el día 1.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${syne.variable} ${dmSans.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-dark text-content antialiased">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  )
}
