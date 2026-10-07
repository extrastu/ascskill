import type { Metadata } from "next"
import { LOCALES, LOCALE_META, localePath, type Locale } from "@/lib/i18n"
import { SITE_URL } from "@/lib/skills-data"

/** Canonical + hreflang alternates for a page. Simplified Chinese (unprefixed) is the canonical default. */
export function localeAlternates(locale: Locale, path = "/"): NonNullable<Metadata["alternates"]> {
  const languages: Record<string, string> = Object.fromEntries(
    LOCALES.map((l) => [LOCALE_META[l].htmlLang, localePath(l, path)]),
  )
  languages["x-default"] = localePath("zh-CN", path)
  return { canonical: localePath(locale, path), languages }
}

export const absolute = (locale: Locale, path = "/") => `${SITE_URL}${localePath(locale, path)}`
