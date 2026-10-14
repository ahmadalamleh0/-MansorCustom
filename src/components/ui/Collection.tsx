import { useEffect, useRef, useState } from 'react'
import { ChevronIcon } from '@/components/ui/icons'
import type { Photo, Project } from '@/data/projects'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useScrollStrip } from '@/hooks/useScrollStrip'

/** When a card's loop is attached and when it plays (see CollectionVideo) */
export type VideoPlayback = {
  /** How close to the viewport a card must be before its video file is attached */
  nearMargin: string
  /** Share of the card that must be visible for the loop to play */
  playThreshold: number
}

const DEFAULT_PLAYBACK: VideoPlayback = { nearMargin: '300px', playThreshold: 0.4 }

type CollectionStripProps = {
  /** id of the scrolling list (the controls point at it) */
  id: string
  /** Accessible name of the strip */
  label: string
  /** Singular noun for the controls: "Previous project" */
  noun: string
  items: Project[]
  playback?: VideoPlayback
}

/**
 * The collection strip (VOIR PPF reference), shared by Recent Work and the
 * Tuning gallery: tall full-bleed 3:5 cards separated by hairline gutters,
 * each with a small monochrome maker mark and the model set vertically along
 * its right edge. Cards hold a photo, a photo set (tap to step) or a muted
 * loop over its poster. Content and video playback come from the caller.
 *
 * Native horizontal scrolling with snap points: swipe on touch, trackpad /
 * shift-wheel / keyboard on desktop, plus discreet previous/next controls.
 * Vertical page scrolling is never intercepted.
 * Animation hooks: [data-project] (each card), .projects__track.
 */
export function CollectionStrip({ id, label, noun, items, playback = DEFAULT_PLAYBACK }: CollectionStripProps) {
  const { track, edge, step } = useScrollStrip<HTMLUListElement>('[data-project]')

  return (
    <>
      <ul ref={track} id={id} className="projects__track" tabIndex={0} aria-label={label}>
        {items.map((item, i) => (
          <li key={item.id} data-project className="project">
            <CollectionCard project={item} priority={i < 2} playback={playback} />
          </li>
        ))}
      </ul>

      <div className="projects__controls container-site">
        <span aria-hidden="true" className="projects__progress">
          <span className="projects__progress-bar" style={{ transform: `scaleX(${0.12 + edge.progress * 0.88})` }} />
        </span>
        <div className="projects__buttons">
          <button type="button" className="projects__btn" aria-controls={id} aria-label={`Previous ${noun}`} disabled={edge.start} onClick={() => step(-1)}>
            <ChevronIcon className="size-4 rotate-180" />
          </button>
          <button type="button" className="projects__btn" aria-controls={id} aria-label={`Next ${noun}`} disabled={edge.end} onClick={() => step(1)}>
            <ChevronIcon className="size-4" />
          </button>
        </div>
      </div>
    </>
  )
}

const SIZES = '(min-width: 1024px) 24rem, (min-width: 768px) 40vw, 72vw'
const srcset = (list: { url: string; w: number }[]) => list.map((s) => `${s.url} ${s.w}w`).join(', ')

function CollectionPicture({ photo, priority, className = '' }: { photo: Photo; priority: boolean; className?: string }) {
  return (
    <picture className={`project__media ${className}`}>
      <source type="image/webp" srcSet={srcset(photo.webp)} sizes={SIZES} />
      <img
        src={photo.jpg[photo.jpg.length - 1].url}
        srcSet={srcset(photo.jpg)}
        sizes={SIZES}
        alt={photo.alt}
        width={600}
        height={1000}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        style={photo.position ? { objectPosition: photo.position } : undefined}
      />
    </picture>
  )
}

function CollectionCard({ project, priority, playback }: { project: Project; priority: boolean; playback: VideoPlayback }) {
  const { image, video, gallery, make, model, logo } = project

  return (
    <figure className="project__card" data-placeholder={image ? undefined : ''}>
      {image && gallery?.length ? (
        <CollectionGallery photos={[image, ...gallery]} priority={priority} label={`${make} ${model}`} />
      ) : image ? (
        <CollectionPicture photo={image} priority={priority} />
      ) : (
        <span aria-hidden="true" className="project__media project__media--placeholder" />
      )}

      {video && image && <CollectionVideo src={video} playback={playback} />}

      <span aria-hidden="true" className="project__scrim" />

      {logo ? (
        <span aria-hidden="true" className="project__logo" style={{ maskImage: `url("${logo}")`, WebkitMaskImage: `url("${logo}")` }} />
      ) : (
        <span aria-hidden="true" className="project__wordmark">
          {make}
        </span>
      )}

      <figcaption className="project__model">
        <span className="sr-only">{make} </span>
        {model}
      </figcaption>
    </figure>
  )
}

/**
 * Several photos of one build. Tap or click the card for the next photo
 * (wraps), or a dot to jump; photos crossfade. Small dots at the bottom-left
 * show there's more than one. Tap-based, not swipe, so it never competes
 * with the strip's horizontal scroll.
 */
function CollectionGallery({ photos, priority, label }: { photos: Photo[]; priority: boolean; label: string }) {
  const [active, setActive] = useState(0)
  const total = photos.length

  return (
    <>
      {photos.map((photo, i) => (
        <CollectionPicture key={photo.alt} photo={photo} priority={priority && i === 0} className={`project__slide${i === active ? ' is-active' : ''}`} />
      ))}

      <button type="button" className="project__next" onClick={() => setActive((active + 1) % total)}>
        <span className="sr-only">{`Next photo of the ${label} (${active + 1} of ${total})`}</span>
      </button>

      <div className="project__dots">
        {photos.map((photo, i) => (
          <button
            key={photo.alt}
            type="button"
            className="project__dot"
            aria-label={`${label}, photo ${i + 1} of ${total}`}
            aria-current={i === active || undefined}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </>
  )
}

/**
 * Muted 3:5 loop over the card's poster. The file is only attached once the
 * card is within `nearMargin` of the viewport (the strip scrolls sideways
 * too), plays while `playThreshold` of it is visible and pauses otherwise.
 * Reduced motion: never loads; the poster stays.
 */
function CollectionVideo({ src, playback }: { src: string; playback: VideoPlayback }) {
  const ref = useRef<HTMLVideoElement>(null)
  const reduceMotion = usePrefersReducedMotion()
  const [near, setNear] = useState(false)
  const [ready, setReady] = useState(false)
  const visible = useRef(false)
  const { nearMargin, playThreshold } = playback

  useEffect(() => {
    const v = ref.current
    if (!v || reduceMotion) return
    const nearObs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true)
          nearObs.disconnect()
        }
      },
      { rootMargin: nearMargin },
    )
    const playObs = new IntersectionObserver(
      ([e]) => {
        visible.current = e.isIntersecting
        if (e.isIntersecting && v.currentSrc) v.play().catch(() => {})
        else v.pause()
      },
      { threshold: playThreshold },
    )
    nearObs.observe(v)
    playObs.observe(v)
    return () => {
      nearObs.disconnect()
      playObs.disconnect()
    }
  }, [reduceMotion, nearMargin, playThreshold])

  if (reduceMotion) return null
  return (
    <video
      ref={ref}
      className="project__video"
      data-ready={ready || undefined}
      src={near ? src : undefined}
      muted
      loop
      playsInline
      preload="auto" // src is only attached once the card is near the viewport
      aria-hidden="true"
      tabIndex={-1}
      onLoadedData={(e) => {
        setReady(true)
        if (visible.current) e.currentTarget.play().catch(() => {})
      }}
    />
  )
}
