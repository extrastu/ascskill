import "server-only"
import * as OpenCC from "opencc-js"
import { messages, type Messages } from "@/lib/messages"
import { CATEGORIES, SKILLS, type Skill } from "@/lib/skills-data"
import type { Locale } from "@/lib/i18n"

const toTraditional = OpenCC.Converter({ from: "cn", to: "twp" })

// OpenCC's Taiwan phrase table picks the wrong word for several App Store / dev terms.
const TW_FIXES: [string, string][] = [
  ["稽核", "審核"],
  ["後設資料", "中繼資料"],
  ["構建", "建置"],
  ["智慧體", "智慧代理"],
  ["鑑權", "驗證"],
  ["會話", "工作階段"],
  ["描述檔案", "描述檔"],
  ["釋出", "發佈"],
  ["引數", "參數"],
  ["例項", "實例"],
  ["全域性", "全域"],
  ["對映", "對應"],
  ["賬戶", "帳號"],
  ["賬號", "帳號"],
  ["歸檔", "封存"],
  ["配置", "設定"],
  ["反饋", "回饋"],
  ["通過", "透過"],
  ["計劃", "計畫"],
]

export function tr(locale: Locale, text: string): string {
  if (locale === "zh-CN") return text
  let out = toTraditional(text)
  for (const [from, to] of TW_FIXES) out = out.replaceAll(from, to)
  return out
}

function convertDeep<T>(locale: Locale, value: T, skipKeys: ReadonlySet<string> = new Set()): T {
  if (typeof value === "string") return tr(locale, value) as T
  if (Array.isArray(value)) return value.map((v) => convertDeep(locale, v, skipKeys)) as T
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, skipKeys.has(k) ? v : convertDeep(locale, v, skipKeys)]),
    ) as T
  }
  return value
}

const cache = new Map<string, unknown>()
function memo<T>(key: string, make: () => T): T {
  if (!cache.has(key)) cache.set(key, make())
  return cache.get(key) as T
}

export function getMessages(locale: Locale): Messages {
  return memo(`m:${locale}`, () => convertDeep(locale, messages))
}

export function getSkills(locale: Locale): Skill[] {
  return memo(`s:${locale}`, () => convertDeep(locale, SKILLS, new Set(["id", "category", "tag"])))
}

export function getCategories(locale: Locale) {
  return memo(`c:${locale}`, () => convertDeep(locale, CATEGORIES, new Set(["key"])))
}
