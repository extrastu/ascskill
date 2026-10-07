import { TerminalBlock } from "@/components/terminal-block"
import { fmt, type Locale } from "@/lib/i18n"
import { getCategories, getMessages, getSkills } from "@/lib/i18n-server"

export function Hero({ locale }: { locale: Locale }) {
  const m = getMessages(locale).hero
  const n = getSkills(locale).length
  const categories = getCategories(locale)

  return (
    <section id="top" className="mx-auto max-w-5xl px-4 pb-14 pt-14 sm:px-6 sm:pt-20">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
        ASC CLI Skills · App Store Connect CLI Agent Skills
      </p>
      <h1 className="mt-4 text-balance text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
        {m.h1a}
        <br className="hidden sm:block" />
        {m.h1b}
        <span className="text-primary">asc</span>
        {fmt(m.h1c, { n })}
      </h1>
      <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
        {m.intro}
      </p>

      <div className="mt-8">
        <TerminalBlock title={m.installTitle} lines={[fmt(m.installComment, { n }), "asc install-skills"]} />
      </div>

      <div className="mt-5 flex items-center gap-3 font-mono text-xs text-muted-foreground">
        <span>{fmt(m.categories, { n: categories.length })}</span>
        <span aria-hidden="true" className="text-border">
          ·
        </span>
        <span>{fmt(m.skills, { n })}</span>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {categories.map((c) => (
          <a
            key={c.key}
            href={`#cat-${c.key}`}
            className="rounded-full border border-border bg-card px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            {c.label}
          </a>
        ))}
      </div>
    </section>
  )
}
