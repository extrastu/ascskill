"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Search, X } from "lucide-react"
import { getCommands, type Category, type Skill } from "@/lib/skills-data"
import { useI18n } from "@/components/i18n-provider"
import { fmt } from "@/lib/i18n"
import { SkillCard } from "@/components/skill-card"
import { cn } from "@/lib/utils"

export function SkillsExplorer({ skills: SKILLS, categories: CATEGORIES }: { skills: Skill[]; categories: Category[] }) {
  const { m } = useI18n()
  const t = m.explorer
  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string>("all")

  const inputRef = useRef<HTMLInputElement>(null)

  // Press "/" anywhere (outside form fields) to jump to the search box.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement | null
      if (e.key === "/" && !(t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable))) {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return SKILLS.filter((skill) => {
      const matchesCategory = activeCategory === "all" || skill.category === activeCategory
      if (!matchesCategory) return false
      if (!q) return true
      const haystack = `${skill.id} ${skill.title} ${skill.summary} ${skill.description} ${skill.useWhen.join(" ")} ${getCommands(skill).join(" ")}`.toLowerCase()
      return haystack.includes(q)
    })
  }, [SKILLS, query, activeCategory])

  const grouped = useMemo(() => {
    return CATEGORIES.map((category) => ({
      category,
      skills: filtered.filter((s) => s.category === category.key),
    })).filter((group) => group.skills.length > 0)
  }, [filtered, CATEGORIES])

  return (
    <div id="skills" className="scroll-mt-16">
      <div className="sticky top-[65px] z-20 -mx-4 border-b border-border bg-background/90 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6">
        <div className="mx-auto flex max-w-5xl flex-col gap-3">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.placeholder}
              aria-label={t.searchLabel}
              className="w-full rounded-lg border border-border bg-card py-2.5 pl-9 pr-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("")
                  inputRef.current?.focus()
                }}
                aria-label={t.clear}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            )}
          </div>
          <p className="font-mono text-xs text-muted-foreground" role="status" aria-live="polite">
            {query || activeCategory !== "all" ? fmt(t.found, { n: filtered.length, total: SKILLS.length }) : fmt(t.total, { n: SKILLS.length })}
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className={cn(
                "rounded-full border px-3 py-1.5 font-mono text-xs transition-colors",
                activeCategory === "all"
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              {fmt(t.all, { n: SKILLS.length })}
            </button>
            {CATEGORIES.map((category) => {
              const count = SKILLS.filter((s) => s.category === category.key).length
              return (
                <button
                  key={category.key}
                  type="button"
                  onClick={() => setActiveCategory(category.key)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 font-mono text-xs transition-colors",
                    activeCategory === category.key
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-muted-foreground hover:text-foreground",
                  )}
                >
                  {category.label} {count}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-5xl space-y-16">
        {grouped.length === 0 && (
          <p className="py-16 text-center font-mono text-sm text-muted-foreground">
            {fmt(t.empty, { q: query })}
            <button
              type="button"
              onClick={() => {
                setQuery("")
                setActiveCategory("all")
              }}
              className="ml-2 text-primary hover:underline"
            >
              {t.reset}
            </button>
          </p>
        )}
        {grouped.map(({ category, skills }) => (
          <section key={category.key} id={`cat-${category.key}`} className="scroll-mt-24">
            <div className="mb-5 flex items-baseline gap-3 border-b border-border pb-3">
              <h2 className="text-xl font-semibold text-foreground sm:text-2xl">{category.label}</h2>
              <span className="font-mono text-xs text-muted-foreground">{category.description}</span>
            </div>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {skills.map((skill) => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
