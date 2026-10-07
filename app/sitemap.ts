import type { MetadataRoute } from "next"
import { SKILLS, SITE_URL } from "@/lib/skills-data"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...SKILLS.map((skill) => ({
      url: `${SITE_URL}/skills/${skill.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ]
}
