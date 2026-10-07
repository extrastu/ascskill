import { cn } from "@/lib/utils"

interface TerminalBlockProps {
  lines: string[]
  title?: string
  className?: string
}

export function TerminalBlock({ lines, title = "zsh", className }: TerminalBlockProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-border bg-[oklch(0.12_0.012_258)]",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-border bg-[oklch(0.145_0.012_258)] px-3 py-2">
        <span className="size-2.5 rounded-full bg-[oklch(0.65_0.2_25)]" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-[oklch(0.78_0.15_73)]" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-[oklch(0.7_0.12_150)]" aria-hidden="true" />
        <span className="ml-2 font-mono text-[11px] tracking-wide text-muted-foreground">{title}</span>
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
