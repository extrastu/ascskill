import type { MetadataRoute } from "next"
import { LOCALES, LOCALE_META, localePath } from "@/lib/i18n"
import { SKILLS, SITE_URL } from "@/lib/skills-data"

const url = (locale: (typeof LOCALES)[number], path: string) => `${SITE_URL}${localePath(locale, path)}`

function entry(path: string, priority: number, changeFrequency: "weekly" | "monthly"): MetadataRoute.Sitemap {
  const now = new Date()
  const languages: Record<string, string> = Object.fromEntries(
    LOCALES.map((l) => [LOCALE_META[l].htmlLang, url(l, path)]),
  )
  languages["x-default"] = url("zh-CN", path)
  // /zh-CN is a duplicate of the unprefixed root, so only the canonical URLs are listed.
  return (["zh-CN", "zh-TW"] as const).map((l) => ({
    url: url(l, path),
    lastModified: now,
    changeFrequency,
    priority,
    alternates: { languages },
  }))
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [...entry("/", 1, "weekly"), ...SKILLS.flatMap((s) => entry(`/skills/${s.id}`, 0.7, "monthly"))]
}
