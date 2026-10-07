"use client"

import { useEffect, useState } from "react"
import { Monitor, Moon, Sun } from "lucide-react"
import { useI18n } from "@/components/i18n-provider"
import { fmt } from "@/lib/i18n"

type Mode = "system" | "light" | "dark"
const ORDER: Mode[] = ["system", "light", "dark"]
const ICONS = { system: Monitor, light: Sun, dark: Moon }

function readStored(): Mode {
  try {
    const v = localStorage.getItem("theme")
    return v === "light" || v === "dark" ? v : "system"
  } catch {
    return "system"
  }
}

/** Cycles system → light → dark. "system" removes data-theme so CSS follows prefers-color-scheme. */
export function ThemeToggle() {
  const { m } = useI18n()
  const [mode, setMode] = useState<Mode | null>(null)

  // Read after mount so server and first client render match.
  useEffect(() => setMode(readStored()), [])

  function cycle() {
    const next = ORDER[(ORDER.indexOf(mode ?? "system") + 1) % ORDER.length]
    setMode(next)
    try {
      if (next === "system") {
        localStorage.removeItem("theme")
        delete document.documentElement.dataset.theme
      } else {
        localStorage.setItem("theme", next)
        document.documentElement.dataset.theme = next
      }
    } catch {
      // Storage blocked: still apply for this page view.
      if (next === "system") delete document.documentElement.dataset.theme
      else document.documentElement.dataset.theme = next
    }
  }

  const labels: Record<Mode, string> = {
    system: m.header.themeSystem,
    light: m.header.themeLight,
    dark: m.header.themeDark,
  }
  const current = mode ?? "system"
  const Icon = ICONS[current]
  const label = fmt(m.header.themeSwitch, { mode: labels[current] })

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={label}
      title={label}
      className="flex size-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <Icon className="size-4" aria-hidden="true" />
    </button>
  )
}
