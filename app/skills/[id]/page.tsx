import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { TerminalBlock } from "@/components/terminal-block"
import { SKILLS, SITE_URL, getCategory, getCommands, getSkill } from "@/lib/skills-data"

type Params = { id: string }

export function generateStaticParams(): Params[] {
  return SKILLS.map((s) => ({ id: s.id }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { id } = await params
  const skill = getSkill(id)
  if (!skill) return {}
  const title = `${skill.title}（${skill.id}）用法与命令示例`
  const description = `${skill.summary}${skill.useWhen[0] ? `适用于：${skill.useWhen[0]}。` : ""}含可直接复制的 asc 命令示例。`
  return {
    title,
    description,
    keywords: [skill.id, `${skill.id} 用法`, skill.title, "asc cli", "asc skills", "App Store Connect CLI"],
    alternates: { canonical: `/skills/${skill.id}` },
    openGraph: { type: "article", locale: "zh_CN", url: `${SITE_URL}/skills/${skill.id}`, title, description, images: ["/og-image.png"] },
    twitter: { card: "summary_large_image", title, description, images: ["/og-image.png"] },
  }
}

export default async function SkillPage({ params }: { params: Promise<Params> }) {
  const { id } = await params
  const skill = getSkill(id)
  if (!skill) notFound()

  const category = getCategory(skill.category)
  const index = SKILLS.findIndex((s) => s.id === skill.id)
  const prev = SKILLS[index - 1]
  const next = SKILLS[index + 1]
  const related = SKILLS.filter((s) => s.category === skill.category && s.id !== skill.id)
  const url = `${SITE_URL}/skills/${skill.id}`

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "首页", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: category.label, item: `${SITE_URL}/#cat-${category.key}` },
          { "@type": "ListItem", position: 3, name: skill.title, item: url },
        ],
      },
      {
        "@type": "TechArticle",
        headline: `${skill.title}（${skill.id}）`,
        description: skill.description,
        inLanguage: "zh-CN",
        url,
        mainEntityOfPage: url,
        about: "App Store Connect CLI (asc)",
        proficiencyLevel: "Beginner",
        author: { "@type": "Organization", name: "ASC Skills 手册", url: SITE_URL },
        publisher: { "@type": "Organization", name: "ASC Skills 手册", url: SITE_URL },
        articleBody: [skill.description, ...skill.useWhen, ...getCommands(skill)].join("\n"),
      },
    ],
  }

  return (
    <>
      <SiteHeader />
      <main id="main" className="mx-auto max-w-3xl px-4 pb-20 pt-8 sm:px-6">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        <nav aria-label="面包屑" className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-muted-foreground">
          <Link href="/" className="hover:text-primary">首页</Link>
          <ChevronRight className="size-3" aria-hidden="true" />
          <Link href={`/#cat-${category.key}`} className="hover:text-primary">{category.label}</Link>
          <ChevronRight className="size-3" aria-hidden="true" />
          <span className="text-foreground" aria-current="page">{skill.id}</span>
        </nav>

        <article className="mt-6">
          <p className="font-mono text-xs text-primary">{skill.id}</p>
          <h1 className="mt-2 text-balance text-3xl font-semibold text-foreground sm:text-4xl">
            {skill.title}
            {skill.tag === "experimental" && (
              <span className="ml-3 align-middle rounded-full border border-secondary/40 bg-secondary/10 px-2.5 py-1 font-mono text-xs font-normal text-secondary">
                实验性
              </span>
            )}
          </h1>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-foreground/90">{skill.summary}</p>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{skill.description}</p>

          <section className="mt-8" aria-labelledby="use-when">
            <h2 id="use-when" className="text-xl font-semibold text-foreground">适用场景</h2>
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
            <h2 id="example" className="text-xl font-semibold text-foreground">命令示例</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              大写占位符（如 APP_ID、BUILD_ID）请替换为你自己的值；标有「对智能体说」的行是给 AI 智能体的提示词，不会被复制。
            </p>
            <TerminalBlock lines={skill.example} className="mt-3" />
          </section>

          <section className="mt-8 rounded-lg border border-border bg-card p-4" aria-labelledby="install-hint">
            <h2 id="install-hint" className="font-mono text-sm font-semibold text-foreground">安装此技能</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              安装 asc 后运行下面的命令即可一次性安装全部技能，其中包含 {skill.id}。
            </p>
            <TerminalBlock lines={["asc install-skills"]} className="mt-3" />
          </section>
        </article>

        {related.length > 0 && (
          <section className="mt-10" aria-labelledby="related">
            <h2 id="related" className="text-xl font-semibold text-foreground">同类技能：{category.label}</h2>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {related.map((r) => (
                <li key={r.id}>
                  <Link href={`/skills/${r.id}`} className="block rounded-lg border border-border bg-card p-3 transition-colors hover:border-primary/50">
                    <span className="font-medium text-foreground">{r.title}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">{r.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <nav aria-label="上一个与下一个技能" className="mt-10 flex justify-between gap-4 border-t border-border pt-6 text-sm">
          {prev ? (
            <Link href={`/skills/${prev.id}`} className="flex items-center gap-1.5 text-muted-foreground hover:text-primary">
              <ArrowLeft className="size-4" aria-hidden="true" />
              {prev.title}
            </Link>
          ) : <span />}
          {next ? (
            <Link href={`/skills/${next.id}`} className="flex items-center gap-1.5 text-right text-muted-foreground hover:text-primary">
              {next.title}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          ) : <span />}
        </nav>
      </main>
      <SiteFooter />
    </>
  )
}
