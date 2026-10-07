import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import { Geist_Mono, Noto_Sans_SC, Noto_Sans_TC } from 'next/font/google'
import '../globals.css'
import { I18nProvider } from '@/components/i18n-provider'
import { LOCALES, LOCALE_META, isLocale } from '@/lib/i18n'
import { getMessages } from '@/lib/i18n-server'
import { absolute, localeAlternates } from '@/lib/seo'
import { SITE_URL } from '@/lib/skills-data'

// Only the active locale's font class is applied, so only that font is downloaded.
const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-sans',
})
const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const dynamicParams = false

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const m = getMessages(locale).site

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: m.title, template: `%s | ${m.name}` },
    description: m.description,
    keywords: [
      'asc skill',
      'asc skills',
      'ascskill',
      'ascskills',
      'asc cli skill',
      'asc cli skills',
      'asccliskill',
      'asccliskills',
      'asc-cli',
      'App Store Connect CLI',
      'App Store Connect Agent Skills',
      'asc install-skills',
    ],
    alternates: localeAlternates(locale, '/'),
    openGraph: {
      type: 'website',
      locale: LOCALE_META[locale].ogLocale,
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => LOCALE_META[l].ogLocale),
      url: absolute(locale, '/'),
      siteName: m.name,
      title: m.title,
      description: m.description,
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: m.ogAlt }],
    },
    twitter: { card: 'summary_large_image', title: m.title, description: m.description, images: ['/og-image.png'] },
    icons: {
      icon: [
        { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
        { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
        { url: '/icon.svg', type: 'image/svg+xml' },
      ],
      apple: '/apple-icon.png',
    },
  }
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0b0c0f',
  userScalable: true,
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const messages = getMessages(locale)
  const sans = locale === 'zh-TW' ? notoSansTC : notoSansSC

  return (
    <html lang={LOCALE_META[locale].htmlLang} className={`${sans.variable} ${geistMono.variable} bg-background`}>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
        >
          {messages.site.skip}
        </a>
        <I18nProvider locale={locale} messages={messages}>
          {children}
        </I18nProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
