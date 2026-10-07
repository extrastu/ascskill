import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { TerminalBlock } from "@/components/terminal-block"
import { SKILLS, getCommands } from "@/lib/skills-data"
import { LOCALES, LOCALE_META, fmt, isLocale, localePath } from "@/lib/i18n"
import { getCategories, getMessages, getSkills } from "@/lib/i18n-server"
import { absolute, localeAlternates } from "@/lib/seo"

type Params = { locale: string; id: string }

export function generateStaticParams(): Params[] {
  return LOCALES.flatMap((locale) => SKILLS.map((s) => ({ locale, id: s.id })))
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, id } = await params
  if (!isLocale(locale)) return {}
  const skill = getSkills(locale).find((s) => s.id === id)
  if (!skill) return {}
  const m = getMessages(locale).detail
  const title = fmt(m.titleTpl, { title: skill.title, id: skill.id })
  const description = `${skill.summary}${skill.useWhen[0] ? fmt(m.appliesTo, { item: skill.useWhen[0] }) : ""}${m.descTail}`
  const path = `/skills/${skill.id}`
  return {
    title,
    description,
    keywords: [skill.id, `${skill.id} 用法`, skill.title, "asc cli", "asc skills", "App Store Connect CLI"],
    alternates: localeAlternates(locale, path),
    openGraph: {
      type: "article",
      locale: LOCALE_META[locale].ogLocale,
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => LOCALE_META[l].ogLocale),
      url: absolute(locale, path),
      title,
      description,
      images: ["/og-image.png"],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og-image.png"] },
  }
}

export default async function SkillPage({ params }: { params: Promise<Params> }) {
  const { locale, id } = await params
  if (!isLocale(locale)) notFound()
  const skills = getSkills(locale)
  const skill = skills.find((s) => s.id === id)
  if (!skill) notFound()

  const m = getMessages(locale).detail
  const category = getCategories(locale).find((c) => c.key === skill.category)!
  const index = skills.findIndex((s) => s.id === skill.id)
  const prev = skills[index - 1]
  const next = skills[index + 1]
  const related = skills.filter((s) => s.category === skill.category && s.id !== skill.id)
  const url = absolute(locale, `/skills/${skill.id}`)
  const home = absolute(locale, "/")
  const to = (path: string) => localePath(locale, path)

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: m.home, item: home },
          { "@type": "ListItem", position: 2, name: category.label, item: `${home}#cat-${category.key}` },
          { "@type": "ListItem", position: 3, name: skill.title, item: url },
        ],
      },
      {
        "@type": "TechArticle",
        headline: `${skill.title}（${skill.id}）`,
        description: skill.description,
        inLanguage: LOCALE_META[locale].htmlLang,
        url,
        mainEntityOfPage: url,
        about: "App Store Connect CLI (asc)",
        proficiencyLevel: "Beginner",
        author: { "@type": "Organization", name: getMessages(locale).site.name, url: home },
        publisher: { "@type": "Organization", name: getMessages(locale).site.name, url: home },
        articleBody: [skill.description, ...skill.useWhen, ...getCommands(skill)].join("\n"),
      },
    ],
  }

  return (
    <>
      <SiteHeader locale={locale} />
      <main id="main" className="mx-auto max-w-3xl px-4 pb-20 pt-8 sm:px-6">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        <nav aria-label={m.breadcrumb} className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-muted-foreground">
          <Link href={to("/")} className="hover:text-primary">{m.home}</Link>
          <ChevronRight className="size-3" aria-hidden="true" />
          <Link href={`${to("/")}#cat-${category.key}`} className="hover:text-primary">{category.label}</Link>
          <ChevronRight className="size-3" aria-hidden="true" />
          <span className="text-foreground" aria-current="page">{skill.id}</span>
        </nav>

        <article className="mt-6">
          <p className="font-mono text-xs text-primary">{skill.id}</p>
          <h1 className="mt-2 text-balance text-3xl font-semibold text-foreground sm:text-4xl">
            {skill.title}
            {skill.tag === "experimental" && (
              <span className="ml-3 align-middle rounded-full border border-secondary/40 bg-secondary/10 px-2.5 py-1 font-mono text-xs font-normal text-secondary">
                {getMessages(locale).card.experimental}
              </span>
            )}
          </h1>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-foreground/90">{skill.summary}</p>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{skill.description}</p>

          <section className="mt-8" aria-labelledby="use-when">
            <h2 id="use-when" className="text-xl font-semibold text-foreground">{m.useWhen}</h2>
            <ul className="mt-3 space-y-2">
              {skill.useWhen.map((item, i) => (
                <li key={i} className="flex items-start gap-2 leading-relaxed text-foreground/90">
                  <ChevronRight className="mt-1 size-4 shrink-0 text-primary" aria-hidden="true" />
                  <span className="text-pretty">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-8" aria-labelledby="example">
            <h2 id="example" className="text-xl font-semibold text-foreground">{m.example}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {m.exampleNote}
            </p>
            <TerminalBlock lines={skill.example} className="mt-3" />
          </section>

          <section className="mt-8 rounded-lg border border-border bg-card p-4" aria-labelledby="install-hint">
            <h2 id="install-hint" className="font-mono text-sm font-semibold text-foreground">{m.installTitle}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {fmt(m.installNote, { id: skill.id })}
            </p>
            <TerminalBlock lines={["asc install-skills"]} className="mt-3" />
          </section>
        </article>

        {related.length > 0 && (
          <section className="mt-10" aria-labelledby="related">
            <h2 id="related" className="text-xl font-semibold text-foreground">{fmt(m.related, { category: category.label })}</h2>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {related.map((r) => (
                <li key={r.id}>
                  <Link href={to(`/skills/${r.id}`)} className="block rounded-lg border border-border bg-card p-3 transition-colors hover:border-primary/50">
                    <span className="font-medium text-foreground">{r.title}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">{r.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <nav aria-label={m.pager} className="mt-10 flex justify-between gap-4 border-t border-border pt-6 text-sm">
          {prev ? (
            <Link href={to(`/skills/${prev.id}`)} className="flex items-center gap-1.5 text-muted-foreground hover:text-primary">
              <ArrowLeft className="size-4" aria-hidden="true" />
              {prev.title}
            </Link>
          ) : <span />}
          {next ? (
            <Link href={to(`/skills/${next.id}`)} className="flex items-center gap-1.5 text-right text-muted-foreground hover:text-primary">
              {next.title}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          ) : <span />}
        </nav>
      </main>
      <SiteFooter locale={locale} />
    </>
  )
}
