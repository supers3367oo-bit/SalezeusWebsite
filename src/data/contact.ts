export const CONTACT_EMAIL = 'info@salezeus.com'

export const CONTACT_OFFICES = [
  {
    id: 'istanbul',
    label: 'Istanbul',
    phoneE164: '+905518548129',
    phoneDisplay: '+90 551 854 81 29',
  },
  {
    id: 'syria',
    label: 'Syria',
    phoneE164: '+963996154965',
    phoneDisplay: '+963 996 154 965',
  },
] as const

const OFFICE_BY_REGION: Record<string, (typeof CONTACT_OFFICES)[number]['id']> = {
  turkey: 'istanbul',
  syria: 'syria',
}

export const WHATSAPP_URL = `https://wa.me/${CONTACT_OFFICES[0].phoneE164.replace(/\D/g, '')}`

export function getOfficePhone(regionId: string) {
  const officeId = OFFICE_BY_REGION[regionId] ?? regionId
  return CONTACT_OFFICES.find((office) => office.id === officeId)
}
