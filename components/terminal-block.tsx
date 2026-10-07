"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { useI18n } from "@/components/i18n-provider"
import { cn } from "@/lib/utils"

interface TerminalBlockProps {
  lines: string[]
  title?: string
  className?: string
}

const isComment = (line: string) => line.trimStart().startsWith("#")
/** "> " lines are natural-language prompts for an AI agent, not shell commands. */
const isPrompt = (line: string) => line.startsWith("> ")

export function TerminalBlock({ lines, title = "zsh", className }: TerminalBlockProps) {
  const { m } = useI18n()
  const t = m.terminal
  const [copied, setCopied] = useState(false)

  const copyText = lines
    .filter((line) => !isComment(line) && !isPrompt(line) && line.trim() !== "")
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
        "group relative overflow-hidden rounded-lg border border-white/10 bg-[oklch(0.12_0.012_258)] text-[oklch(0.94_0.012_85)]",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-[oklch(0.145_0.012_258)] px-3 py-2">
        <span className="size-2.5 rounded-full bg-[oklch(0.65_0.2_25)]" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-[oklch(0.78_0.15_73)]" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-[oklch(0.7_0.12_150)]" aria-hidden="true" />
        <span className="ml-2 font-mono text-[11px] tracking-wide text-[oklch(0.65_0.02_90)]">{title}</span>
        {copyText && <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? t.copiedAria : t.copyAria}
          className={cn(
            "ml-auto flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[11px] transition-colors",
            copied
              ? "text-[oklch(0.7_0.12_150)]"
              : "text-[oklch(0.65_0.02_90)] hover:bg-white/10 hover:text-[oklch(0.94_0.012_85)]",
          )}
        >
          {copied ? (
            <>
              <Check className="size-3.5" aria-hidden="true" />
              {t.copied}
            </>
          ) : (
            <>
              <Copy className="size-3.5" aria-hidden="true" />
              {t.copy}
            </>
          )}
        </button>}
      </div>
      <pre className="overflow-x-auto px-4 py-3 font-mono text-[13px] leading-relaxed">
        <code>
          {lines.map((line, i) => {
            const comment = isComment(line)
            const prompt = isPrompt(line)
            const blank = line.trim() === ""
            return (
              <div
                key={i}
                className={cn(
                  comment && "text-[oklch(0.65_0.02_90)]",
                  blank && "h-3",
                  prompt && "text-[oklch(0.7_0.09_195)]",
                  !comment && !prompt && !blank && "text-[oklch(0.94_0.012_85)]",
                )}
              >
                {prompt ? (
                  <>
                    <span className="mr-2 select-none rounded border border-[oklch(0.7_0.09_195/0.4)] px-1 text-[10px]">
                      {t.promptTag}
                    </span>
                    {line.slice(2)}
                  </>
                ) : (
                  <>
                    {!comment && !blank && <span className="mr-2 select-none text-[oklch(0.78_0.15_73)]">$</span>}
                    {line}
                  </>
                )}
              </div>
            )
          })}
        </code>
      </pre>
    </div>
  )
}
