import { useMemo } from 'react'
import { useCmsContentOptional } from '../cms/CmsContentProvider'
import { CONTACT_EMAIL, CONTACT_OFFICES, WHATSAPP_URL, getOfficePhone } from '../data/contact'
import { useLocale } from '../providers/LocaleProvider'

export function useCmsContact() {
  const cms = useCmsContentOptional()
  const { locale } = useLocale()

  return useMemo(() => {
    const contact = cms?.content?.contact
    if (!contact) {
      return {
        email: CONTACT_EMAIL,
        whatsappPhone: CONTACT_OFFICES[0].phoneE164,
        whatsappUrl: WHATSAPP_URL,
        offices: CONTACT_OFFICES.map((office) => ({
          id: office.id,
          label: office.label,
          phoneE164: office.phoneE164,
          phoneDisplay: office.phoneDisplay,
        })),
        getOfficePhone,
      }
    }

    const offices = contact.offices.map((office) => ({
      id: office.id,
      label: locale === 'ar' ? office.label.ar || office.label.en : office.label.en,
      phoneE164: office.phoneE164,
      phoneDisplay: office.phoneDisplay,
    }))

    const primary = offices[0]
    return {
      email: contact.email,
      whatsappPhone: contact.whatsappPhone,
      whatsappUrl: `https://wa.me/${contact.whatsappPhone.replace(/\D/g, '')}`,
      offices,
      getOfficePhone: (regionId: string) => {
        const map: Record<string, string> = { turkey: 'istanbul', syria: 'syria' }
        const id = map[regionId] ?? regionId
        return offices.find((o) => o.id === id) ?? primary
      },
    }
  }, [cms?.content?.contact, locale])
}
