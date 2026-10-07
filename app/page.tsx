import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { InstallSection } from "@/components/install-section"
import { SkillsExplorer } from "@/components/skills-explorer"
import { SiteFooter } from "@/components/site-footer"
import { SKILLS, CATEGORIES } from "@/lib/skills-data"

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "ASC CLI Skills",
        alternateName: ["AscSkill", "AscSkills", "ASC CLI Skill", "AscCliSkill", "AscCliSkills"],
        applicationCategory: "DeveloperApplication",
        operatingSystem: "macOS, Linux, Windows",
        description:
          "ASC Skills 是 App Store Connect CLI（asc-cli）提供的 Agent Skills 技能集合，覆盖构建发布、签名分发、TestFlight、元数据本地化与商业化配置。",
        softwareHelp: "https://github.com/rorkai/App-Store-Connect-CLI",
      },
      {
        "@type": "ItemList",
        name: "ASC CLI Skills 技能列表",
        description: "全部 ASC Skills（ASC CLI Skills）及其适用场景",
        numberOfItems: SKILLS.length,
        itemListElement: SKILLS.map((skill, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: `${skill.title}（${skill.id}）`,
          description: skill.summary,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "什么是 ASC Skills / AscSkill？",
            acceptedAnswer: {
              "@type": "Answer",
              text: "ASC Skills（也称 AscSkill、AscSkills）是 App Store Connect CLI（asc-cli）为 AI Agent 提供的技能包，覆盖构建、发布、签名、TestFlight、元数据与商业化等全部工作流。",
            },
          },
          {
            "@type": "Question",
            name: "如何安装全部 ASC CLI Skills？",
            acceptedAnswer: {
              "@type": "Answer",
              text: "安装 asc-cli 后运行 `asc install-skills` 即可一次性安装全部经审查的 ASC CLI Skill（AscCliSkill）。",
            },
          },
          {
            "@type": "Question",
            name: "ASC CLI Skills 一共有多少个？",
            acceptedAnswer: {
              "@type": "Answer",
              text: `目前 ASC CLI Skills 共有 ${SKILLS.length} 个，分布在 ${CATEGORIES.length} 个分类中，包括核心用法、构建发布、签名分发、TestFlight、元数据本地化与商业化配置等。`,
            },
          },
        ],
      },
    ],
  }

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />
      <Hero />
      <InstallSection />
      <div className="px-4 pb-20 sm:px-6">
        <SkillsExplorer />
      </div>
      <SiteFooter />
    </main>
  )
}
