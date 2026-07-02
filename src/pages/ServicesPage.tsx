import ServicesHero from '../components/services/ServicesHero'
import ServicesGrid from '../components/services/ServicesGrid'
import ClosingFuture from '../components/sections/ClosingFuture'

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesGrid />
      <ClosingFuture sectionId="services-cta" />
    </>
  )
}
