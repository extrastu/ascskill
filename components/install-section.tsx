"use client"

import { useState } from "react"
import { TerminalBlock } from "@/components/terminal-block"
import { useI18n } from "@/components/i18n-provider"
import { fmt } from "@/lib/i18n"
import { cn } from "@/lib/utils"

type Tab = "brew" | "curl" | "winget"

export function InstallSection({ skillCount }: { skillCount: number }) {
  const { m } = useI18n()
  const t = m.install
  const [tab, setTab] = useState<Tab>("brew")

  const tabs: { id: Tab; label: string }[] = [
    { id: "brew", label: "Homebrew" },
    { id: "curl", label: t.tabCurl },
    { id: "winget", label: "Windows" },
  ]

  return (
    <section id="install" className="scroll-mt-16 border-y border-border bg-card/40 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex flex-col gap-3 sm:mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Getting Started</span>
          <h2 className="font-mono text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{t.title}</h2>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">{t.intro}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div className="flex flex-col gap-6">
            {t.steps.map((step, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 font-mono text-xs font-bold text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {i !== t.steps.length - 1 && <span className="mt-1 h-full w-px flex-1 bg-border" aria-hidden="true" />}
                </div>
                <div className="flex-1 pb-2">
                  <h3 className="font-mono text-sm font-semibold text-foreground sm:text-base">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                  {"lines" in step && step.lines && <TerminalBlock lines={step.lines} className="mt-3" />}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-1 rounded-lg border border-border bg-background p-1" role="tablist" aria-label={t.tabsLabel}>
              {tabs.map((tb) => (
                <button
                  key={tb.id}
                  role="tab"
                  type="button"
                  aria-selected={tab === tb.id}
                  onClick={() => setTab(tb.id)}
                  className={cn(
                    "flex-1 rounded-md px-3 py-2 font-mono text-xs font-medium transition-colors sm:text-sm",
                    tab === tb.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {tb.label}
                </button>
              ))}
            </div>
            <TerminalBlock lines={t[tab]} />

            <div className="rounded-lg border border-border bg-background p-4">
              <h4 className="font-mono text-sm font-semibold text-foreground">{t.skillsTitle}</h4>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{fmt(t.skillsDesc, { n: skillCount })}</p>
              <TerminalBlock lines={["git --version", "asc install-skills"]} className="mt-3" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
