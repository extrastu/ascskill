import { LOCALES, localePath, type Locale } from "@/lib/i18n"
import { getCategories, getMessages, getSkills, tr as convert } from "@/lib/i18n-server"
import { SITE_URL } from "@/lib/skills-data"

const abs = (locale: Locale, path: string) => `${SITE_URL}${localePath(locale, path)}`

const COPY = {
  "zh-CN": {
    note: "本站是 App Store Connect CLI（asc-cli）Agent Skills 的非官方中文使用手册。内容整理自上游公开文档，以上游仓库为准；与 Apple 无关联。",
    about: "关于",
    aboutItems: [
      "上游工具：[rorkai/App-Store-Connect-CLI](https://github.com/rorkai/App-Store-Connect-CLI)",
      "上游技能包：[rorkai/app-store-connect-cli-skills](https://github.com/rorkai/app-store-connect-cli-skills)",
      "安装全部技能：安装 asc 后运行 `asc install-skills`",
    ],
    home: "首页（安装指南与全部技能）",
    other: "其他语言",
    otherItems: { "zh-CN": "简体中文", "zh-TW": "繁体中文" } as Record<Locale, string>,
    full: "完整内容（含全部命令示例，适合一次性读入）",
    optional: "可选",
    promptNote: "以 `> ` 开头的示例行是给 AI 智能体的自然语言提示词，不是 shell 命令；大写占位符（如 APP_ID）需替换为实际值。",
    useWhen: "适用场景",
    example: "命令示例",
    experimental: "实验性",
  },
} as const

// Copy is written in Simplified Chinese; Traditional is derived with tr() at build time.
const copyFor = (_locale: Locale) => COPY["zh-CN"]

export function buildLlmsTxt(locale: Locale): string {
  const tr = (s: string) => convert(locale, s)
  const m = getMessages(locale)
  const c = copyFor(locale)
  const skills = getSkills(locale)
  const categories = getCategories(locale)

  const lines: string[] = [
    `# ${m.site.name}（ASC CLI Skills）`,
    "",
    `> ${m.site.description}`,
    "",
    tr(c.note),
    "",
    `## ${tr(c.about)}`,
    "",
    ...c.aboutItems.map((i) => `- ${tr(i)}`),
    "",
    `## ${tr(c.home)}`,
    "",
    `- [${m.site.name}](${abs(locale, "/")}): ${m.hero.intro}`,
    "",
  ]

  for (const cat of categories) {
    lines.push(`## ${cat.label}`, "", `${cat.description}`, "")
    for (const s of skills.filter((x) => x.category === cat.key)) {
      lines.push(`- [${s.title}（${s.id}）](${abs(locale, `/skills/${s.id}`)}): ${s.summary}`)
    }
    lines.push("")
  }

  lines.push(`## ${tr(c.optional)}`, "")
  lines.push(`- [${tr(c.full)}](${abs(locale, "/llms-full.txt")})`)
  for (const l of LOCALES.filter((x) => x !== locale)) {
    lines.push(`- [${tr(c.other)}：${tr(c.otherItems[l])}](${abs(l, "/")})`)
  }
  lines.push("")
  return lines.join("\n")
}

export function buildLlmsFullTxt(locale: Locale): string {
  const tr = (s: string) => convert(locale, s)
  const m = getMessages(locale)
  const c = copyFor(locale)
  const skills = getSkills(locale)
  const categories = getCategories(locale)

  const lines: string[] = [
    `# ${m.site.name}（ASC CLI Skills）— ${tr("完整内容")}`,
    "",
    `> ${m.site.description}`,
    "",
    tr(c.note),
    "",
    tr(c.promptNote),
    "",
  ]

  for (const cat of categories) {
    lines.push(`## ${cat.label}`, "", cat.description, "")
    for (const s of skills.filter((x) => x.category === cat.key)) {
      lines.push(`### ${s.title}（${s.id}）${s.tag === "experimental" ? `［${tr(c.experimental)}］` : ""}`, "")
      lines.push(`${abs(locale, `/skills/${s.id}`)}`, "", s.summary, "", s.description, "")
      lines.push(`**${tr(c.useWhen)}**`, "", ...s.useWhen.map((u) => `- ${u}`), "")
      lines.push(`**${tr(c.example)}**`, "", "```bash", ...s.example, "```", "")
    }
  }
  return lines.join("\n")
}
