import { useEffect, useRef, useState } from 'react'
import { Mic, Pause, Play } from 'lucide-react'
import clsx from 'clsx'

type Props = {
  src: string
  durationLabel?: string
  className?: string
}

export default function VoiceNotePlayer({ src, durationLabel, className }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onTimeUpdate = () => {
      if (!audio.duration) return
      setProgress(audio.currentTime / audio.duration)
    }
    const onEnded = () => {
      setPlaying(false)
      setProgress(0)
    }
    const onPause = () => setPlaying(false)
    const onPlay = () => setPlaying(true)

    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('play', onPlay)

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('play', onPlay)
    }
  }, [])

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (playing) {
      audio.pause()
      return
    }

    try {
      await audio.play()
    } catch {
      setPlaying(false)
    }
  }

  const bars = [0.35, 0.65, 0.45, 0.85, 0.55, 0.75, 0.4, 0.9, 0.5, 0.7, 0.6, 0.8]

  return (
    <div
      className={clsx(
        'flex items-center gap-3 rounded-card border border-sz-border bg-white px-4 py-3',
        className
      )}
    >
      <audio ref={audioRef} src={src} preload="metadata" />

      <button
        type="button"
        onClick={toggle}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sz-interaction text-white transition-colors hover:bg-sz-interaction-hover"
        aria-label={playing ? 'Pause voice note' : 'Play voice note'}
      >
        {playing ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
      </button>

      <div className="flex min-w-0 flex-1 items-center gap-2">
        <Mic size={14} className="shrink-0 text-sz-interaction" aria-hidden />
        <div className="flex h-8 flex-1 items-center gap-[3px]" aria-hidden>
          {bars.map((height, i) => {
            const filled = progress > i / bars.length
            return (
              <span
                key={i}
                className={clsx(
                  'w-[3px] rounded-full transition-all duration-150',
                  filled ? 'bg-sz-interaction' : 'bg-sz-border',
                  playing && filled && 'animate-pulse'
                )}
                style={{ height: `${height * 100}%` }}
              />
            )
          })}
        </div>
        {durationLabel && (
          <span
            className="shrink-0 text-sz-secondary tabular-nums"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}
          >
            {durationLabel}
          </span>
        )}
      </div>
    </div>
  )
}
