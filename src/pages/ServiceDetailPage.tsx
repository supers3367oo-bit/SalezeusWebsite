import { useEffect } from 'react'

import { useParams } from 'react-router-dom'

import Button from '../components/ui/Button'

import ServiceDetailHero from '../components/services/detail/ServiceDetailHero'

import ServiceAbout from '../components/services/detail/ServiceAbout'

import ServiceRelatedProjects from '../components/services/detail/ServiceRelatedProjects'

import ServiceIncluded from '../components/services/detail/ServiceIncluded'

import ServiceReviews from '../components/services/detail/ServiceReviews'

import ServiceFAQ from '../components/services/detail/ServiceFAQ'

import ServiceOtherServices from '../components/services/detail/ServiceOtherServices'

import ClosingFuture from '../components/sections/ClosingFuture'

import { getReviewsForService } from '../data/serviceReviews'
import { refreshLocomotiveScroll } from '../lib/locomotive'
import { useLocale } from '../providers/LocaleProvider'
import { useAllProjects, useOtherServices, useServiceDetail } from '../i18n/useLocalizedData'
import { useMemo } from 'react'
import type { ProjectServiceSlug } from '../types/projectDetail'

const SERVICE_MATCH: Record<string, ProjectServiceSlug> = {
  branding: 'branding',
  marketing: 'marketing',
  'social-media': 'social-media',
  'business-consulting': 'business-consulting',
  'web-development': 'web-development',
  'mobile-apps': 'mobile-apps',
}

export default function ServiceDetailPage() {
  const { locale, t } = useLocale()
  const { slug } = useParams<{ slug: string }>()
  const service = useServiceDetail(slug)
  const allProjects = useAllProjects()
  const projects = useMemo(() => {
    if (!slug) return []
    const matched = SERVICE_MATCH[slug]
    if (!matched) return allProjects.slice(0, 4)
    return allProjects.filter((project) => project.service === matched)
  }, [slug, allProjects])
  const industries = service?.industries.map((item) => item.industry) ?? []
  const reviews = slug ? getReviewsForService(slug, locale) : []
  const otherServices = useOtherServices(slug)



  useEffect(() => {

    requestAnimationFrame(() => refreshLocomotiveScroll())

  }, [slug])



  if (!service) {

    return (

      <section className="section-surface min-h-[60vh] flex items-center pt-28">

        <div className="section-container text-center w-full">

          <h1

            className="text-sz-dark mb-4"

            style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 600 }}

          >

            {t('errors.serviceNotFound')}

          </h1>

          <Button to="/services" size="sm">

            {t('errors.backToServices')}

          </Button>

        </div>

      </section>

    )

  }



  return (

    <>

      <ServiceDetailHero service={service} />

      <ServiceAbout service={service} />

      <ServiceRelatedProjects

        projects={projects}

        serviceTitle={service.title}

        industries={industries}

      />

      <ServiceIncluded service={service} />

      <ServiceReviews serviceTitle={service.title} reviews={reviews} />

      <ServiceFAQ faqs={service.faqs} serviceTitle={service.title} />

      <ServiceOtherServices services={otherServices} currentTitle={service.title} />

      <ClosingFuture sectionId="service-cta" />

    </>

  )

}

