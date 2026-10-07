import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { SkillsExplorer } from "@/components/skills-explorer"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <Hero />
      <div className="px-4 pb-20 sm:px-6">
        <SkillsExplorer />
      </div>
      <SiteFooter />
    </main>
  )
}
