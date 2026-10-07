import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist_Mono, Noto_Sans_SC } from 'next/font/google'
import './globals.css'

const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'http://localhost:3000'

const title = 'ASC Skills 手册｜ASC CLI Skills 全量中文示例（asc-cli）'
const description =
  'ASC Skills（也写作 AscSkill / AscSkills）是 App Store Connect CLI 的 Agent 技能集合。本站收录全部 ASC CLI Skill（AscCliSkill / AscCliSkills）的适用场景与可直接运行的命令示例，覆盖安装配置、构建发布、签名分发、TestFlight、元数据本地化与商业化配置。'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: '%s | ASC Skills 手册',
  },
  description,
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
  generator: 'v0.app',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: siteUrl,
    siteName: 'ASC Skills 手册',
    title,
    description,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ASC CLI Skills — App Store Connect CLI Agent Skills 中文手册',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0b0c0f',
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className={`${notoSansSC.variable} ${geistMono.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
