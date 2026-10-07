import Link from "next/link"
import { ArrowUpRight, ChevronRight } from "lucide-react"
import type { Skill } from "@/lib/skills-data"
import { TerminalBlock } from "@/components/terminal-block"

export function SkillCard({ skill }: { skill: Skill }) {
  return (
    <article
      id={skill.id}
      className="scroll-mt-28 rounded-xl border border-border bg-card p-5 sm:p-6"
    >
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-mono text-xs text-primary">{skill.id}</p>
          <h3 className="mt-1 text-balance text-lg font-semibold text-foreground sm:text-xl">
            <Link
              href={`/skills/${skill.id}`}
              className="hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {skill.title}
            </Link>
          </h3>
        </div>
        {skill.tag === "experimental" && (
          <span className="rounded-full border border-secondary/40 bg-secondary/10 px-2.5 py-1 font-mono text-[11px] text-secondary">
            实验性
          </span>
        )}
      </header>

      <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{skill.description}</p>

      <div className="mt-4">
        <h4 className="mb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
          适用场景
        </h4>
        <ul className="space-y-1.5">
          {skill.useWhen.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-foreground/90">
              <ChevronRight className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
              <span className="text-pretty">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h4 className="mb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
          使用示例
        </h4>
        <TerminalBlock lines={skill.example} />
      </div>

      <Link
        href={`/skills/${skill.id}`}
        aria-label={`查看${skill.title}详情`}
        className="mt-4 inline-flex items-center gap-1 font-mono text-xs text-primary hover:underline"
      >
        查看详情
        <ArrowUpRight className="size-3.5" aria-hidden="true" />
      </Link>
    </article>
  )
}
