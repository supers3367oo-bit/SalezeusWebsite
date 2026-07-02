import { SERVICE_DETAILS } from './serviceDetails'
import type { Service, ServiceDetail } from '../types/services'

export type { MockupVariant, Service, ServiceDetail, ServiceReview } from '../types/services'

export const SERVICES: Service[] = SERVICE_DETAILS.map(
  ({ slug, title, desc, image, variant, float }) => ({
    slug,
    title,
    desc,
    image,
    variant,
    float,
  })
)

export { SERVICE_DETAILS, getServiceBySlug, getOtherServices } from './serviceDetails'
