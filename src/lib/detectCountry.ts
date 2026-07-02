import { DEFAULT_COUNTRY_ISO } from '../data/countries'

export async function detectCountryIso2(): Promise<string> {
  try {
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 5000)

    const response = await fetch('https://ipapi.co/country_code/', {
      signal: controller.signal,
      headers: { Accept: 'text/plain' },
    })

    window.clearTimeout(timeout)

    if (!response.ok) throw new Error('Primary geo lookup failed')

    const code = (await response.text()).trim().toUpperCase()
    if (/^[A-Z]{2}$/.test(code)) return code
  } catch {
    // fall through to backup
  }

  try {
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 5000)

    const response = await fetch('https://ipwho.is/', { signal: controller.signal })
    window.clearTimeout(timeout)

    if (!response.ok) throw new Error('Backup geo lookup failed')

    const data = (await response.json()) as { success?: boolean; country_code?: string }
    if (data.success && data.country_code && /^[A-Z]{2}$/i.test(data.country_code)) {
      return data.country_code.toUpperCase()
    }
  } catch {
    // ignore
  }

  return DEFAULT_COUNTRY_ISO
}
