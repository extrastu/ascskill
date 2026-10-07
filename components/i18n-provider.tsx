"use client"

import { createContext, useContext } from "react"
import type { Locale } from "@/lib/i18n"
import type { Messages } from "@/lib/messages"

const I18nContext = createContext<{ locale: Locale; m: Messages } | null>(null)

export function I18nProvider({
  locale,
  messages,
  children,
}: {
  locale: Locale
  messages: Messages
  children: React.ReactNode
}) {
  return <I18nContext.Provider value={{ locale, m: messages }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>")
  return ctx
}
