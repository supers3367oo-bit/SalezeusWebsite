import { useEffect, useId, useRef, useState } from 'react'
import clsx from 'clsx'
import { ChevronDown, Search } from 'lucide-react'
import {
  filterCountries,
  getCountryByIso,
  getDefaultCountry,
  type CountryDial,
} from '../../data/countries'
import { detectCountryIso2 } from '../../lib/detectCountry'

type Props = {
  countryIso: string
  nationalNumber: string
  onCountryChange: (iso2: string) => void
  onNationalNumberChange: (value: string) => void
  required?: boolean
  inputId?: string
}

const fieldClass =
  'w-full rounded-[10px] bg-white/[0.04] px-4 py-3 text-white placeholder:text-white/35 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#3258A4]/30'

export default function PhoneCountryInput({
  countryIso,
  nationalNumber,
  onCountryChange,
  onNationalNumberChange,
  required = false,
  inputId,
}: Props) {
  const listId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const userPickedRef = useRef(false)
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const selected = getDefaultCountry(countryIso)
  const filtered = filterCountries(search)

  useEffect(() => {
    let active = true

    detectCountryIso2().then((iso) => {
      if (!active || userPickedRef.current) return
      if (getCountryByIso(iso)) onCountryChange(iso)
    })

    return () => {
      active = false
    }
  }, [onCountryChange])

  useEffect(() => {
    if (!open) return

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
        setSearch('')
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        setSearch('')
      }
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    requestAnimationFrame(() => searchRef.current?.focus())

    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const pickCountry = (country: CountryDial) => {
    userPickedRef.current = true
    onCountryChange(country.iso2)
    setOpen(false)
    setSearch('')
  }

  return (
    <div ref={rootRef} className="relative">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className={clsx(
            'inline-flex min-h-[48px] shrink-0 items-center gap-2 rounded-[10px] border border-white/10 bg-white/[0.04] px-3.5 text-white transition-colors duration-200 hover:border-white/25 hover:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-[#3258A4]/30',
            open && 'border-white/25 bg-white/[0.07]'
          )}
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls={listId}
          aria-label={`Country code ${selected.iso2}`}
        >
          <span
            className="font-medium tracking-wide"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}
          >
            {selected.iso2}
          </span>
          <ChevronDown
            size={15}
            className={clsx('text-white/45 transition-transform duration-200', open && 'rotate-180')}
          />
        </button>

        <input
          id={inputId}
          type="tel"
          required={required}
          autoComplete="tel-national"
          inputMode="tel"
          value={nationalNumber}
          onChange={(event) => onNationalNumberChange(event.target.value)}
          className={fieldClass}
          style={{ fontFamily: 'var(--font-body)', fontSize: 15 }}
          placeholder="555 000 0000"
          pattern="[\d\s\-()]{6,}"
          title="Enter a valid phone number"
        />
      </div>

      {open && (
        <div
          className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-card border border-white/10 bg-[#12141a] shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
          role="listbox"
          id={listId}
          aria-label="Select country"
        >
          <div className="border-b border-white/10 p-3">
            <div className="relative">
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/35"
              />
              <input
                ref={searchRef}
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search country"
                className="w-full rounded-[8px] border border-white/10 bg-white/[0.04] py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-[#3258A4]/30"
                style={{ fontFamily: 'var(--font-body)' }}
                aria-label="Search country"
              />
            </div>
          </div>

          <ul className="max-h-64 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <li className="px-4 py-3 text-sm text-white/45" style={{ fontFamily: 'var(--font-body)' }}>
                No countries found
              </li>
            ) : (
              filtered.map((country) => {
                const active = country.iso2 === selected.iso2
                return (
                  <li key={country.iso2}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={active}
                      onClick={() => pickCountry(country)}
                      className={clsx(
                        'flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors duration-150',
                        active ? 'bg-white/[0.08] text-white' : 'text-white/70 hover:bg-white/[0.05] hover:text-white'
                      )}
                    >
                      <span
                        className="w-8 shrink-0 font-medium text-white/85"
                        style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}
                      >
                        {country.iso2}
                      </span>
                      <span
                        className="min-w-0 flex-1 truncate text-sm"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {country.name}
                      </span>
                      <span
                        className="shrink-0 text-xs text-white/35"
                        style={{ fontFamily: 'var(--font-mono)' }}
                      >
                        {country.dialCode}
                      </span>
                    </button>
                  </li>
                )
              })
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
