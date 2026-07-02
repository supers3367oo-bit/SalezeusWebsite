import { useEffect, useRef } from 'react'
import {
  createGlobeScene,
  type GlobeSceneController,
  type HoverPayload,
} from './globe/createGlobeScene'

type GlobeCanvasProps = {
  lowPower: boolean
  reduceMotion: boolean
  onReady?: (controller: GlobeSceneController) => void
  onHover?: (payload: HoverPayload) => void
  className?: string
}

export default function GlobeCanvas({
  lowPower,
  reduceMotion,
  onReady,
  onHover,
  className = '',
}: GlobeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const controllerRef = useRef<GlobeSceneController | null>(null)
  const onReadyRef = useRef(onReady)
  const onHoverRef = useRef(onHover)

  onReadyRef.current = onReady
  onHoverRef.current = onHover

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const controller = createGlobeScene(canvas, { lowPower, reduceMotion })
    controllerRef.current = controller
    onReadyRef.current?.(controller)

    const unsubHover = controller.subscribeHover((payload) => {
      onHoverRef.current?.(payload)
    })

    const ro = new ResizeObserver(() => controller.resize())
    if (canvas.parentElement) ro.observe(canvas.parentElement)

    return () => {
      unsubHover()
      ro.disconnect()
      controller.dispose()
      controllerRef.current = null
    }
  }, [lowPower, reduceMotion])

  return (
    <canvas
      ref={canvasRef}
      className={`block w-full h-full touch-none ${className}`}
      aria-hidden
    />
  )
}
