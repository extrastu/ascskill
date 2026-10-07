export const LOCALES = ["zh-CN", "zh-TW"] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = "zh-CN"
export const LOCALE_COOKIE = "NEXT_LOCALE"

export const LOCALE_META: Record<Locale, { label: string; htmlLang: string; ogLocale: string }> = {
  "zh-CN": { label: "简体", htmlLang: "zh-CN", ogLocale: "zh_CN" },
  "zh-TW": { label: "繁體", htmlLang: "zh-TW", ogLocale: "zh_TW" },
}

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value)
}

/**
 * Pick a locale from an Accept-Language header. The first Chinese entry (by q-weight) decides:
 * zh-TW / zh-HK / zh-MO / zh-Hant* → zh-TW, any other zh → zh-CN. No Chinese entry → default.
 */
export function detectLocale(acceptLanguage: string | null | undefined): Locale {
  if (!acceptLanguage) return DEFAULT_LOCALE
  const entries = acceptLanguage
    .split(",")
    .map((part, index) => {
      const [tag, ...params] = part.trim().split(";")
      const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="))
      return { tag: tag.trim().toLowerCase(), q: q ? Number.parseFloat(q.slice(2)) : 1, index }
    })
    .filter((e) => e.tag && e.q > 0)
    .sort((a, b) => b.q - a.q || a.index - b.index)

  for (const { tag } of entries) {
    if (tag === "zh" || tag.startsWith("zh-")) {
      return /^zh-(tw|hk|mo|hant)/.test(tag) ? "zh-TW" : "zh-CN"
    }
  }
  return DEFAULT_LOCALE
}

/** Public URL path of a page in a locale. Simplified Chinese lives at the unprefixed root. */
export function localePath(locale: Locale, path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`
  if (locale === DEFAULT_LOCALE) return clean
  return clean === "/" ? `/${locale}` : `/${locale}${clean}`
}

/** Remove a leading /zh-CN or /zh-TW segment from a pathname. */
export function stripLocale(pathname: string): string {
  for (const l of LOCALES) {
    if (pathname === `/${l}`) return "/"
    if (pathname.startsWith(`/${l}/`)) return pathname.slice(l.length + 1)
  }
  return pathname
}

export function fmt(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`))
}
