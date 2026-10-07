"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Search, X } from "lucide-react"
import { CATEGORIES, SKILLS, getCommands, type CategoryKey } from "@/lib/skills-data"
import { SkillCard } from "@/components/skill-card"
import { cn } from "@/lib/utils"

export function SkillsExplorer() {
  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<CategoryKey | "all">("all")

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
  }, [query, activeCategory])

  const grouped = useMemo(() => {
    return CATEGORIES.map((category) => ({
      category,
      skills: filtered.filter((s) => s.category === category.key),
    })).filter((group) => group.skills.length > 0)
  }, [filtered])

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
              placeholder="搜索技能或命令，例如“截图”“签名”“notarization”…（按 / 聚焦）"
              aria-label="搜索技能"
              className="w-full rounded-lg border border-border bg-card py-2.5 pl-9 pr-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("")
                  inputRef.current?.focus()
                }}
                aria-label="清除搜索"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            )}
          </div>
          <p className="font-mono text-xs text-muted-foreground" role="status" aria-live="polite">
            {query || activeCategory !== "all" ? `找到 ${filtered.length} / ${SKILLS.length} 个技能` : `共 ${SKILLS.length} 个技能`}
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
              全部 {SKILLS.length}
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
            没有找到匹配 &ldquo;{query}&rdquo; 的技能，换个关键词试试。
            <button
              type="button"
              onClick={() => {
                setQuery("")
                setActiveCategory("all")
              }}
              className="ml-2 text-primary hover:underline"
            >
              重置筛选
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
