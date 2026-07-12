import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { ar } from '../i18n/ar'
import { en } from '../i18n/en'
import { getTranslation } from '../i18n/getTranslation'
import type { Locale, TranslationTree } from '../i18n/types'
import { refreshLocomotiveScroll } from '../lib/locomotive'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useCmsContentOptional } from '../cms/CmsContentProvider'
import { deepMergeMessages } from '../cms/adapters'

gsap.registerPlugin(ScrollTrigger)

const STORAGE_KEY = 'salezeus-locale'

const MESSAGES: Record<Locale, TranslationTree> = { en, ar }

type LocaleContextValue = {
  locale: Locale
  dir: 'ltr' | 'rtl'
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
  t: (key: string) => string
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

function readStoredLocale(): Locale {
  if (typeof window === 'undefined') return 'en'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  return stored === 'ar' ? 'ar' : 'en'
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const cms = useCmsContentOptional()
  const [locale, setLocaleState] = useState<Locale>(() => {
    const stored = readStoredLocale()
    if (typeof document !== 'undefined') {
      document.documentElement.lang = stored
      document.documentElement.dir = stored === 'ar' ? 'rtl' : 'ltr'
    }
    return stored
  })

  const dir: 'ltr' | 'rtl' = locale === 'ar' ? 'rtl' : 'ltr'

  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = dir
    window.localStorage.setItem(STORAGE_KEY, locale)

    const frame = requestAnimationFrame(() => {
      ScrollTrigger.refresh(true)
      refreshLocomotiveScroll()
    })

    return () => cancelAnimationFrame(frame)
  }, [locale, dir])

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
  }, [])

  const toggleLocale = useCallback(() => {
    setLocaleState((current) => (current === 'en' ? 'ar' : 'en'))
  }, [])

  const messages = useMemo(() => {
    const base = MESSAGES[locale]
    const overlay = cms?.messagesOverlay(locale) ?? {}
    return deepMergeMessages(base, overlay)
  }, [locale, cms])

  const t = useCallback((key: string) => getTranslation(messages, key), [messages])

  const value = useMemo(
    () => ({ locale, dir, setLocale, toggleLocale, t }),
    [locale, dir, setLocale, toggleLocale, t],
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider')
  }
  return context
}
