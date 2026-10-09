import { useEffect, useRef, type ReactNode } from 'react'
import type { MediaAsset } from '@/data/media'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

type MediaProps = {
  media?: MediaAsset
  /** Above-the-fold media: load eagerly with high priority */
  priority?: boolean
  className?: string
  /** Rendered when no media has been supplied yet */
  fallback?: ReactNode
}

/**
 * Image/video slot that fills its parent (the parent sets the size and aspect
 * ratio). Videos are muted and inline, only play while on screen, and never
 * autoplay when the user prefers reduced motion.
 */
export function Media({ media, priority = false, className = '', fallback }: MediaProps) {
  const fill = `absolute inset-0 h-full w-full object-cover ${className}`

  if (!media) {
    return (
      <div className={`absolute inset-0 bg-surface-raised ${className}`} data-media-pending>
        {fallback}
      </div>
    )
  }

  if (media.type === 'image') {
    return (
      <img
        src={media.src}
        alt={media.alt}
        width={media.width}
        height={media.height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className={fill}
      />
    )
  }

  return <InViewVideo media={media} priority={priority} className={fill} />
}

function InViewVideo({
  media,
  priority,
  className,
}: {
  media: Extract<MediaAsset, { type: 'video' }>
  priority: boolean
  className: string
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const reduceMotion = usePrefersReducedMotion()

  useEffect(() => {
    const video = ref.current
    if (!video || reduceMotion) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.15 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [reduceMotion])

  return (
    <video
      ref={ref}
      className={className}
      poster={media.poster}
      muted
      loop
      playsInline
      preload={priority ? 'auto' : 'metadata'}
      aria-hidden="true"
    >
      {media.mobileSrc && <source src={media.mobileSrc} media="(max-width: 767px)" />}
      <source src={media.src} />
    </video>
  )
}
