import { useEffect } from 'react'
import { scrollPageToSection } from '../../lib/locomotive'

export default function ScrollAnchorHandler() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>('[data-scroll-to]')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href?.startsWith('#')) return

      event.preventDefault()
      scrollPageToSection(href, { offset: -88, retries: 2 })
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return null
}
