import { useMemo } from 'react'
import { getServices } from '../data/services'
import type { Service } from '../types/services'
import { useLocale } from '../providers/LocaleProvider'
import { useCmsContentOptional } from '../cms/CmsContentProvider'
import { servicesFromCms } from '../cms/adapters'

/** @deprecated Prefer useLocalizedServices from useLocalizedData.ts */
export function useLocalizedServices(): Service[] {
  const { locale } = useLocale()
  const cms = useCmsContentOptional()
  return useMemo(() => {
    if (cms?.content?.services?.length) return servicesFromCms(cms.content.services, locale)
    return getServices(locale)
  }, [locale, cms?.content?.services])
}
