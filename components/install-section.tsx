"use client"

import { useState } from "react"
import { TerminalBlock } from "@/components/terminal-block"
import { cn } from "@/lib/utils"

type Tab = "brew" | "curl" | "winget"

const tabs: { id: Tab; label: string }[] = [
  { id: "brew", label: "Homebrew" },
  { id: "curl", label: "安装脚本" },
  { id: "winget", label: "Windows" },
]

const installLines: Record<Tab, string[]> = {
  brew: ["# 推荐方式（macOS / Linux）", "brew install asc"],
  curl: ["# macOS / Linux 一键安装脚本", "curl -fsSL https://asccli.sh/install | bash"],
  winget: [
    "# Windows（WinGet 包审核通过后可用；未上架前请从 GitHub Releases 下载已签名的二进制）",
    "winget install asc",
    "",
    "# 包名冲突时使用精确 ID",
    "winget install --id Rorkai.ASC --exact",
  ],
}

const steps = [
  {
    index: "01",
    title: "安装 asc-cli",
    desc: "通过 Homebrew、安装脚本或 WinGet 获取二进制文件，发布版本自带运行环境，无需额外安装 Go。",
  },
  {
    index: "02",
    title: "验证可执行",
    desc: "在配置鉴权前，先确认命令可以正常运行。",
    lines: ["asc version", "asc --help"],
  },
  {
    index: "03",
    title: "登录鉴权",
    desc: "在 App Store Connect 生成 API 密钥后，使用密钥登录；CI 或无密钥串环境可加 --bypass-keychain。",
    lines: [
      "asc auth login \\",
      '  --name "MyApp" \\',
      '  --key-id "ABC123" \\',
      '  --issuer-id "DEF456" \\',
      "  --private-key /path/to/AuthKey.p8 \\",
      "  --network",
    ],
  },
  {
    index: "04",
    title: "校验与首个命令",
    desc: "确认鉴权状态健康，然后拉取一次应用列表确认一切就绪。",
    lines: ["asc auth status --validate", "asc auth doctor", "asc apps list --output table"],
  },
]

export function InstallSection() {
  const [tab, setTab] = useState<Tab>("brew")

  return (
    <section id="install" className="border-y border-border bg-card/40 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex flex-col gap-3 sm:mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Getting Started</span>
          <h2 className="font-mono text-2xl font-bold tracking-tight text-foreground sm:text-3xl">安装 asc-cli</h2>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            四步完成从安装到首个 API 调用。发布的二进制文件自带运行环境，安装后即可在终端、IDE 或 CI/CD 流水线中使用。
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div className="flex flex-col gap-6">
            {steps.map((step) => (
              <div key={step.index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 font-mono text-xs font-bold text-primary">
                    {step.index}
                  </span>
                  {step.index !== "04" && <span className="mt-1 h-full w-px flex-1 bg-border" aria-hidden="true" />}
                </div>
                <div className="flex-1 pb-2">
                  <h3 className="font-mono text-sm font-semibold text-foreground sm:text-base">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                  {step.lines && <TerminalBlock lines={step.lines} className="mt-3" />}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-1 rounded-lg border border-border bg-background p-1" role="tablist" aria-label="安装方式">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  role="tab"
                  type="button"
                  aria-selected={tab === t.id}
                  onClick={() => setTab(t.id)}
                  className={cn(
                    "flex-1 rounded-md px-3 py-2 font-mono text-xs font-medium transition-colors sm:text-sm",
                    tab === t.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <TerminalBlock lines={installLines[tab]} />

            <div className="rounded-lg border border-border bg-background p-4">
              <h4 className="font-mono text-sm font-semibold text-foreground">安装全部 Agent Skills</h4>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                将 25 个官方技能一次性安装到全局 agent-skills 目录，跨项目可用，且锁定到已审核的提交版本。
              </p>
              <TerminalBlock lines={["git --version", "asc install-skills"]} className="mt-3" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
