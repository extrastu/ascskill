import { notFound } from "next/navigation"
import { buildLlmsFullTxt } from "@/lib/llms"
import { LOCALES, isLocale } from "@/lib/i18n"
export const dynamic = "force-static"
const headers = { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=0, s-maxage=3600" }
export const dynamicParams = false

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export async function GET(_req: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return new Response(buildLlmsFullTxt(locale), { headers })
}
