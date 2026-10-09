import { getMessages } from "@/lib/i18n-server"
import type { Locale } from "@/lib/i18n"

export function SiteFooter({ locale }: { locale: Locale }) {
  const m = getMessages(locale).footer
  const a = "text-primary hover:underline"
  const [madeBefore, madeAfter] = m.madeBy.split("{name}")
  return (
    <footer className="mt-20 border-t border-border">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <p className="font-mono text-xs leading-relaxed text-muted-foreground text-pretty">
          {m.a}
          <a href="https://github.com/rorkai/App-Store-Connect-CLI" target="_blank" rel="noreferrer" className={a}>
            rorkai/App-Store-Connect-CLI
          </a>
          {m.b}
          <a href="https://github.com/rorkai/app-store-connect-cli-skills" target="_blank" rel="noreferrer" className={a}>
            app-store-connect-cli-skills
          </a>
          {m.c}
        </p>
        <p className="mt-3 font-mono text-xs text-muted-foreground">
          {madeBefore}
          <a href="https://extrastu.cn" target="_blank" rel="noreferrer" className={a}>
            extrastu
          </a>
          {madeAfter}
        </p>
      </div>
    </footer>
  )
}
