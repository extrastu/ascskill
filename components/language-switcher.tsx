"use client"

import { usePathname } from "next/navigation"
import { LOCALES, LOCALE_META, stripLocale } from "@/lib/i18n"
import { useI18n } from "@/components/i18n-provider"
import { cn } from "@/lib/utils"

/**
 * Plain <a> tags on purpose: the proxy stores the visited locale path in a cookie, and
 * next/link would also fire that on prefetch, flipping the preference on hover.
 */
export function LanguageSwitcher() {
  const pathname = usePathname() ?? "/"
  const { locale, m } = useI18n()
  const rest = stripLocale(pathname)

  return (
    <div role="group" aria-label={m.header.language} className="flex items-center rounded-md border border-border p-0.5">
      {LOCALES.map((l) => (
        <a
          key={l}
          href={`/${l}${rest === "/" ? "" : rest}`}
          hrefLang={LOCALE_META[l].htmlLang}
          lang={LOCALE_META[l].htmlLang}
          aria-current={l === locale ? "true" : undefined}
          className={cn(
            "rounded px-2 py-1 font-mono text-xs transition-colors",
            l === locale ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {LOCALE_META[l].label}
        </a>
      ))}
    </div>
  )
}
