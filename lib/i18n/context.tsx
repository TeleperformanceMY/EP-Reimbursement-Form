'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { type Locale, translations, type TranslationKey } from './translations'

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: TranslationKey) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en')

  const t = useCallback(
    (key: TranslationKey): string => {
      return translations[locale][key]
    },
    [locale]
  )

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}
