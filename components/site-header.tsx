import { Terminal } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-md border border-primary/40 bg-primary/10 text-primary">
            <Terminal className="size-4" aria-hidden="true" />
          </span>
          <span className="font-mono text-sm font-medium text-foreground">asc-cli 技能手册</span>
        </a>
        <a
          href="https://github.com/rorkai/app-store-connect-cli-skills"
          target="_blank"
          rel="noreferrer"
          className="font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
        >
          GitHub ↗
        </a>
      </div>
    </header>
  )
}
