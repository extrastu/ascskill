import type { MetadataRoute } from "next"
import { CATEGORIES } from "@/lib/skills-data"

const siteUrl = "https://ascskill.wiki"

export default function sitemap(): MetadataRoute.Sitemap {
  const categoryEntries: MetadataRoute.Sitemap = CATEGORIES.map((category) => ({
    url: `${siteUrl}/#cat-${category.key}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }))

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/#install`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...categoryEntries,
  ]
}
