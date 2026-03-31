'use client'

import { Globe } from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'
import type { Locale } from '@/lib/i18n/translations'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const languages: { value: Locale; label: string; flag: string }[] = [
  { value: 'en', label: 'English', flag: '🇺🇸' },
  { value: 'zh', label: '中文', flag: '🇨🇳' },
  { value: 'ja', label: '日本語', flag: '🇯🇵' },
]

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n()

  return (
    <div className="flex items-center gap-2">
      <Globe className="size-4 text-muted-foreground" />
      <Select value={locale} onValueChange={(value) => setLocale(value as Locale)}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder={t('language')} />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.value} value={lang.value}>
              <span className="flex items-center gap-2">
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
