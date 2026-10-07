import Link from "next/link"
import { Terminal } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { localePath, type Locale } from "@/lib/i18n"
import { getMessages } from "@/lib/i18n-server"

export function SiteHeader({ locale }: { locale: Locale }) {
  const m = getMessages(locale).header
  const link =
    "font-mono text-xs text-muted-foreground transition-colors hover:text-primary"

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <Link
          href={localePath(locale)}
          className="flex items-center gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <span className="flex size-8 items-center justify-center rounded-md border border-primary/40 bg-primary/10 text-primary">
            <Terminal className="size-4" aria-hidden="true" />
          </span>
          <span className="font-mono text-sm font-medium text-foreground">{m.brand}</span>
        </Link>
        <nav aria-label={m.nav} className="flex items-center gap-4 sm:gap-5">
          <Link href={`${localePath(locale)}#install`} className={link}>
            {m.install}
          </Link>
          <Link href={`${localePath(locale)}#skills`} className={link}>
            {m.skills}
          </Link>
          <a href="https://github.com/extrastu/ascskill" target="_blank" rel="noreferrer" className={link}>
            GitHub ↗
          </a>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  )
}
