import { useMemo } from 'react'
import { getTeam } from '../data/localized'
import { getServices, getServiceBySlug, getOtherServices } from '../data/services'
import { getAllProjects, getProjectBySlug, getRelatedProjects } from '../data/projectDetails'
import { getInsightArticles, getArticleBySlug, getFeaturedArticle } from '../data/insights'
import { useLocale } from '../providers/LocaleProvider'
import { useCmsContentOptional } from '../cms/CmsContentProvider'
import {
  insightFromCms,
  projectDetailFromCms,
  projectListFromCms,
  serviceDetailFromCms,
  servicesFromCms,
  teamFromCms,
} from '../cms/adapters'

export function useTeamMembers() {
  const { locale } = useLocale()
  const cms = useCmsContentOptional()
  return useMemo(() => {
    if (cms?.content?.team?.length) return teamFromCms(cms.content.team, locale)
    return getTeam(locale)
  }, [locale, cms?.content?.team])
}

export function useLocalizedServices() {
  const { locale } = useLocale()
  const cms = useCmsContentOptional()
  return useMemo(() => {
    if (cms?.content?.services?.length) return servicesFromCms(cms.content.services, locale)
    return getServices(locale)
  }, [locale, cms?.content?.services])
}

export function useAllProjects() {
  const { locale } = useLocale()
  const cms = useCmsContentOptional()
  return useMemo(() => {
    if (cms?.content?.projects?.length) return projectListFromCms(cms.content.projects, locale)
    return getAllProjects(locale)
  }, [locale, cms?.content?.projects])
}

export function useInsightArticles() {
  const { locale } = useLocale()
  const cms = useCmsContentOptional()
  return useMemo(() => {
    if (cms?.content?.insights?.length) {
      return cms.content.insights.map((article) => insightFromCms(article, locale))
    }
    return getInsightArticles(locale)
  }, [locale, cms?.content?.insights])
}

export function useServiceDetail(slug?: string) {
  const { locale } = useLocale()
  const cms = useCmsContentOptional()
  return useMemo(() => {
    if (!slug) return undefined
    const admin = cms?.content?.services.find((item) => item.slug === slug)
    if (admin) return serviceDetailFromCms(admin, locale)
    return getServiceBySlug(slug, locale)
  }, [slug, locale, cms?.content?.services])
}

export function useOtherServices(slug?: string) {
  const { locale } = useLocale()
  const cms = useCmsContentOptional()
  return useMemo(() => {
    if (!slug) return []
    if (cms?.content?.services?.length) {
      return servicesFromCms(
        cms.content.services.filter((item) => item.slug !== slug),
        locale,
      )
    }
    return getOtherServices(slug, locale)
  }, [slug, locale, cms?.content?.services])
}

export function useProjectDetail(slug?: string) {
  const { locale } = useLocale()
  const cms = useCmsContentOptional()
  return useMemo(() => {
    if (!slug) return undefined
    const admin = cms?.content?.projects.find((item) => item.slug === slug)
    if (admin) return projectDetailFromCms(admin, locale)
    return getProjectBySlug(slug, locale)
  }, [slug, locale, cms?.content?.projects])
}

export function useRelatedProjects(slug?: string) {
  const project = useProjectDetail(slug)
  const { locale } = useLocale()
  const cms = useCmsContentOptional()
  return useMemo(() => {
    if (!project) return []
    if (cms?.content?.projects?.length) {
      return project.relatedSlugs
        .map((relatedSlug) => {
          const admin = cms.content!.projects.find((item) => item.slug === relatedSlug)
          return admin ? projectDetailFromCms(admin, locale) : getProjectBySlug(relatedSlug, locale)
        })
        .filter((item): item is NonNullable<typeof item> => Boolean(item))
    }
    return getRelatedProjects(project, locale)
  }, [project, locale, cms?.content?.projects])
}

export function useArticle(slug?: string) {
  const { locale } = useLocale()
  const cms = useCmsContentOptional()
  return useMemo(() => {
    if (!slug) return undefined
    const admin = cms?.content?.insights.find((item) => item.slug === slug)
    if (admin) return insightFromCms(admin, locale)
    return getArticleBySlug(slug, locale)
  }, [slug, locale, cms?.content?.insights])
}

export function useFeaturedArticle() {
  const articles = useInsightArticles()
  const { locale } = useLocale()
  return useMemo(() => {
    return articles.find((a) => a.featured) ?? articles[0] ?? getFeaturedArticle(locale)
  }, [articles, locale])
}
