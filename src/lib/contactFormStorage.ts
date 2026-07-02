const EMAIL_STORAGE_KEY = 'salezeus.contact.email'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim())
}

export function getStoredContactEmail(): string | null {
  try {
    const value = localStorage.getItem(EMAIL_STORAGE_KEY)?.trim()
    if (value && isValidEmail(value)) return value
  } catch {
    // ignore private mode / blocked storage
  }
  return null
}

export function setStoredContactEmail(email: string): void {
  try {
    const value = email.trim()
    if (!isValidEmail(value)) return
    localStorage.setItem(EMAIL_STORAGE_KEY, value)
  } catch {
    // ignore
  }
}

export function getEmailFromSearchParams(search = window.location.search): string | null {
  const value = new URLSearchParams(search).get('email')?.trim()
  if (value && isValidEmail(value)) return value
  return null
}

export function resolveInitialContactEmail(): string {
  return getEmailFromSearchParams() ?? getStoredContactEmail() ?? ''
}
