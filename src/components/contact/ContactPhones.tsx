import { useCmsContact } from '../../cms/useCmsContact'
import { useLocale } from '../../providers/LocaleProvider'

type Props = {
  className?: string
  labelClassName?: string
  phoneClassName?: string
}

export default function ContactPhones({
  className = 'space-y-4',
  labelClassName = 'text-white/30 text-xs mb-1',
  phoneClassName = 'text-white/60 hover:text-white transition-colors duration-200',
}: Props) {
  const { t } = useLocale()
  const { offices } = useCmsContact()

  return (
    <div className={className}>
      {offices.map((office) => (
        <div key={office.id}>
          <p className={labelClassName} style={{ fontFamily: 'var(--font-body)' }}>
            {t(`contact.offices.${office.id}`) || office.label}
          </p>
          <a
            href={`tel:${office.phoneE164}`}
            className={phoneClassName}
            style={{ fontFamily: 'var(--font-body)', fontSize: 14 }}
          >
            {office.phoneDisplay}
          </a>
        </div>
      ))}
    </div>
  )
}
