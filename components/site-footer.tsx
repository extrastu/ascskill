export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <p className="font-mono text-xs leading-relaxed text-muted-foreground text-pretty">
          本页内容整理自{" "}
          <a
            href="https://github.com/rorkai/App-Store-Connect-CLI"
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline"
          >
            rorkai/App-Store-Connect-CLI
          </a>{" "}
          与{" "}
          <a
            href="https://github.com/rorkai/app-store-connect-cli-skills"
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline"
          >
            app-store-connect-cli-skills
          </a>{" "}
          公开文档，非官方维护，仅作中文使用示例参考，与 Apple 无关联。
        </p>
      </div>
    </footer>
  )
}
