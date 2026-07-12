import BilingualField from '../components/BilingualField'
import { useAdminContent } from '../content/AdminContentContext'

export default function ContactEditor() {
  const { content, setContent, uiLocale } = useAdminContent()
  const isAr = uiLocale === 'ar'
  if (!content) return null

  const { contact } = content
  const inputClass =
    'w-full rounded-xl border border-sz-border bg-white px-3.5 py-2.5 text-sm outline-none focus:border-sz-interaction focus:ring-2 focus:ring-sz-interaction/20'

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <p className="text-sm text-sz-primary/65">
        {isAr
          ? 'البريد والمكاتب وأرقام التواصل.'
          : 'Email, offices, and contact phone numbers.'}
      </p>

      <div className="space-y-5 rounded-2xl border border-sz-border bg-white p-5">
        <label className="block space-y-1.5">
          <span className="text-sm font-medium">{isAr ? 'البريد الإلكتروني' : 'Contact email'}</span>
          <input
            type="email"
            className={inputClass}
            value={contact.email}
            onChange={(e) =>
              setContent((prev) => ({
                ...prev,
                contact: { ...prev.contact, email: e.target.value },
              }))
            }
            dir="ltr"
          />
        </label>

        <label className="block space-y-1.5">
          <span className="text-sm font-medium">
            {isAr ? 'هاتف واتساب (E.164)' : 'WhatsApp phone (E.164)'}
          </span>
          <input
            className={inputClass}
            value={contact.whatsappPhone}
            onChange={(e) =>
              setContent((prev) => ({
                ...prev,
                contact: { ...prev.contact, whatsappPhone: e.target.value },
              }))
            }
            dir="ltr"
          />
        </label>
      </div>

      <div className="space-y-4">
        <h3 className="font-heading text-base font-semibold">{isAr ? 'المكاتب' : 'Offices'}</h3>
        {contact.offices.map((office, index) => (
          <div key={office.id} className="space-y-4 rounded-2xl border border-sz-border bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-sz-interaction">
              {office.id}
            </p>
            <BilingualField
              label={isAr ? 'الاسم' : 'Label'}
              value={office.label}
              onChange={(label) =>
                setContent((prev) => ({
                  ...prev,
                  contact: {
                    ...prev.contact,
                    offices: prev.contact.offices.map((o, i) =>
                      i === index ? { ...o, label } : o,
                    ),
                  },
                }))
              }
            />
            <label className="block space-y-1.5">
              <span className="text-sm font-medium">E.164</span>
              <input
                className={inputClass}
                value={office.phoneE164}
                onChange={(e) =>
                  setContent((prev) => ({
                    ...prev,
                    contact: {
                      ...prev.contact,
                      offices: prev.contact.offices.map((o, i) =>
                        i === index ? { ...o, phoneE164: e.target.value } : o,
                      ),
                    },
                  }))
                }
                dir="ltr"
              />
            </label>
            <label className="block space-y-1.5">
              <span className="text-sm font-medium">{isAr ? 'العرض' : 'Display'}</span>
              <input
                className={inputClass}
                value={office.phoneDisplay}
                onChange={(e) =>
                  setContent((prev) => ({
                    ...prev,
                    contact: {
                      ...prev.contact,
                      offices: prev.contact.offices.map((o, i) =>
                        i === index ? { ...o, phoneDisplay: e.target.value } : o,
                      ),
                    },
                  }))
                }
                dir="ltr"
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}
