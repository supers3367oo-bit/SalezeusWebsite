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

import { getOtherServices, getServiceBySlug } from '../data/services'

import { getProjectsForService } from '../data/projects'

import { getReviewsForService } from '../data/serviceReviews'

import { refreshLocomotiveScroll } from '../lib/locomotive'



export default function ServiceDetailPage() {

  const { slug } = useParams<{ slug: string }>()

  const service = getServiceBySlug(slug)

  const projects = slug ? getProjectsForService(slug) : []

  const industries = service?.industries.map((item) => item.industry) ?? []

  const reviews = slug ? getReviewsForService(slug) : []

  const otherServices = slug ? getOtherServices(slug) : []



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

            Service not found

          </h1>

          <Button to="/services" size="sm">

            Back to services

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

