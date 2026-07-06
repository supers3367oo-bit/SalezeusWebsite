import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getLocomotiveInstance, refreshLocomotiveScroll, scrollPageToSection } from '../../lib/locomotive'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    let cancelScroll: (() => void) | undefined

    const scrollToTarget = () => {
      refreshLocomotiveScroll()

      if (hash) {
        cancelScroll = scrollPageToSection(hash, { offset: -88, retries: 4 })
        return
      }

      const loco = getLocomotiveInstance()
      if (loco) {
        loco.scrollTo(0, { immediate: true })
      } else {
        window.scrollTo(0, 0)
      }
    }

    const t1 = window.setTimeout(scrollToTarget, hash ? 120 : 80)
    const t2 = window.setTimeout(refreshLocomotiveScroll, 500)

    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      cancelScroll?.()
    }
  }, [pathname, hash])

  return null
}
