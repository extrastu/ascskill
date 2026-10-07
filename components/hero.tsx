import { TerminalBlock } from "@/components/terminal-block"
import { SKILLS, CATEGORIES } from "@/lib/skills-data"

export function Hero() {
  return (
    <section id="top" className="mx-auto max-w-5xl px-4 pb-14 pt-14 sm:px-6 sm:pt-20">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
        ASC CLI Skills · App Store Connect CLI Agent Skills
      </p>
      <h1 className="mt-4 text-balance text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
        把 App Store 发布工作，
        <br className="hidden sm:block" />
        交给 <span className="text-primary">asc</span> 和它的 {SKILLS.length} 个 ASC Skills
      </h1>
      <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
        rorkai/App-Store-Connect-CLI 为 AI 智能体提供了一整套 ASC CLI Skills（又称 AscSkill /
        AscCliSkill），覆盖构建打包、签名分发、TestFlight、元数据本地化、订阅定价和广告投放。
        本页收录全部 ASC Skills 的中文说明与可直接使用的命令示例。
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-start">
        <TerminalBlock
          title="安装技能包"
          lines={["# 全局安装 23 个经审查的 asc 技能", "asc install-skills"]}
        />
        <div className="flex flex-col gap-0.5 self-center text-right sm:items-end">
          <span className="font-mono text-xs text-muted-foreground">{CATEGORIES.length} 个分类</span>
          <span className="font-mono text-xs text-muted-foreground">{SKILLS.length} 个技能</span>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
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
