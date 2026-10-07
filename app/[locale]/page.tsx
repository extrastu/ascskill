import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { InstallSection } from "@/components/install-section"
import { SkillsExplorer } from "@/components/skills-explorer"
import { SiteFooter } from "@/components/site-footer"
import { SITE_URL } from "@/lib/skills-data"
import { fmt, isLocale, LOCALE_META, localePath } from "@/lib/i18n"
import { getCategories, getMessages, getSkills } from "@/lib/i18n-server"

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const m = getMessages(locale).jsonld
  const skills = getSkills(locale)
  const categories = getCategories(locale)

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "ASC CLI Skills",
        alternateName: ["AscSkill", "AscSkills", "ASC CLI Skill", "AscCliSkill", "AscCliSkills"],
        applicationCategory: "DeveloperApplication",
        operatingSystem: "macOS, Linux, Windows",
        inLanguage: LOCALE_META[locale].htmlLang,
        description: m.appDescription,
        softwareHelp: "https://github.com/rorkai/App-Store-Connect-CLI",
      },
      {
        "@type": "ItemList",
        name: m.listName,
        description: m.listDescription,
        numberOfItems: skills.length,
        itemListElement: skills.map((skill, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: `${skill.title}（${skill.id}）`,
          description: skill.summary,
          url: `${SITE_URL}${localePath(locale, `/skills/${skill.id}`)}`,
        })),
      },
      {
        "@type": "FAQPage",
        inLanguage: LOCALE_META[locale].htmlLang,
        mainEntity: m.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: fmt(item.a, { n: skills.length, c: categories.length }) },
        })),
      },
    ],
  }

  return (
    <main id="main" className="min-h-screen">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader locale={locale} />
      <Hero locale={locale} />
      <InstallSection skillCount={skills.length} />
      <div className="px-4 pb-20 sm:px-6">
        <SkillsExplorer skills={skills} categories={categories} />
      </div>
      <SiteFooter locale={locale} />
    </main>
  )
}
