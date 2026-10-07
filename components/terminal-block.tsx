"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

interface TerminalBlockProps {
  lines: string[]
  title?: string
  className?: string
}

export function TerminalBlock({ lines, title = "zsh", className }: TerminalBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyText = lines
    .filter((line) => !line.trimStart().startsWith("#") && line.trim() !== "")
    .map((line) => line.replace(/\s*\\$/, ""))
    .join("\n")

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(copyText)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // Clipboard API unavailable (e.g. insecure context); fail silently.
    }
  }

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg border border-border bg-[oklch(0.12_0.012_258)]",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-border bg-[oklch(0.145_0.012_258)] px-3 py-2">
        <span className="size-2.5 rounded-full bg-[oklch(0.65_0.2_25)]" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-[oklch(0.78_0.15_73)]" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-[oklch(0.7_0.12_150)]" aria-hidden="true" />
        <span className="ml-2 font-mono text-[11px] tracking-wide text-muted-foreground">{title}</span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "命令已复制" : "复制命令"}
          className={cn(
            "ml-auto flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[11px] transition-colors",
            copied
              ? "text-[oklch(0.7_0.12_150)]"
              : "text-muted-foreground hover:bg-border/60 hover:text-foreground",
          )}
        >
          {copied ? (
            <>
              <Check className="size-3.5" aria-hidden="true" />
              已复制
            </>
          ) : (
            <>
              <Copy className="size-3.5" aria-hidden="true" />
              复制
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-3 font-mono text-[13px] leading-relaxed">
        <code>
          {lines.map((line, i) => {
            const isComment = line.trimStart().startsWith("#")
            const isBlank = line.trim() === ""
            return (
              <div
                key={i}
                className={cn(
                  isComment && "text-muted-foreground",
                  isBlank && "h-3",
                  !isComment && !isBlank && "text-foreground",
                )}
              >
                {!isComment && !isBlank && <span className="mr-2 select-none text-primary">$</span>}
                {line}
              </div>
            )
          })}
        </code>
      </pre>
    </div>
  )
}
