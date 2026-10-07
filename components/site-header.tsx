import Link from "next/link"
import { Terminal } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
          <span className="flex size-8 items-center justify-center rounded-md border border-primary/40 bg-primary/10 text-primary">
            <Terminal className="size-4" aria-hidden="true" />
          </span>
          <span className="font-mono text-sm font-medium text-foreground">asc-cli 技能手册</span>
        </Link>
        <nav aria-label="主导航" className="flex items-center gap-5">
          <Link
            href="/#install"
            className="font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
          >
            安装
          </Link>
          <Link
            href="/#skills"
            className="font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
          >
            技能
          </Link>
          <a
            href="https://github.com/rorkai/app-store-connect-cli-skills"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
          >
            GitHub ↗
          </a>
        </nav>
      </div>
    </header>
  )
}
