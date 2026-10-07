import { buildLlmsTxt } from "@/lib/llms"
export const dynamic = "force-static"
const headers = { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=0, s-maxage=3600" }

export function GET() {
  return new Response(buildLlmsTxt("zh-CN"), { headers })
}
