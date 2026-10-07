import { NextResponse, type NextRequest } from "next/server"
import { DEFAULT_LOCALE, LOCALE_COOKIE, detectLocale, isLocale, type Locale } from "@/lib/i18n"

const ONE_YEAR = 60 * 60 * 24 * 365

function withVary(res: NextResponse) {
  res.headers.set("Vary", "Accept-Language, Cookie")
  return res
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const first = pathname.split("/")[1]

  // Explicit locale path (/zh-CN, /zh-TW/...): serve it and remember the choice.
  if (isLocale(first)) {
    const res = NextResponse.next()
    res.cookies.set(LOCALE_COOKIE, first, { path: "/", maxAge: ONE_YEAR, sameSite: "lax" })
    return res
  }

  // No locale in the path: a stored choice wins, otherwise follow the browser language.
  const stored = request.cookies.get(LOCALE_COOKIE)?.value
  const locale: Locale = isLocale(stored) ? stored : detectLocale(request.headers.get("accept-language"))

  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`
  // Simplified Chinese is served at the unprefixed URL (rewrite); other locales redirect to their prefix.
  return withVary(locale === DEFAULT_LOCALE ? NextResponse.rewrite(url) : NextResponse.redirect(url))
}

export const config = {
  // Skip Next internals, API routes and anything with a file extension (icons, robots.txt, sitemap.xml…).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
}
