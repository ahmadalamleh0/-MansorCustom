import { useCallback, useEffect, useRef, useState } from 'react'
import { projectsReveal } from '@/animations/projectsReveal'
import { ChevronIcon } from '@/components/ui/icons'
import { projects, type Photo, type Project } from '@/data/projects'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useGSAP } from '@/lib/gsap'

/** Headline words: stacked on phones/tablets, one line from 1280px (as "Beyond Factory.") */
const TITLE = ['Recent', 'Work']

/**
 * Selected Projects (VOIR PPF reference): a horizontal strip of tall,
 * full-bleed build cards separated by hairline gutters, each with a small
 * monochrome maker mark and the model set vertically along its right edge.
 *
 * Native horizontal scrolling with snap points: swipe on touch, trackpad /
 * shift-wheel / keyboard on desktop, plus discreet previous/next controls.
 * Vertical page scrolling is never intercepted.
 * Animation hooks: [data-project] (entrance stagger).
 */
export function Projects() {
  const scope = useRef<HTMLElement>(null)
  const track = useRef<HTMLUListElement>(null)
  const reduceMotion = usePrefersReducedMotion()
  const [edge, setEdge] = useState({ start: true, end: false, progress: 0 })

  useGSAP(() => projectsReveal(), { scope })

  const measure = useCallback(() => {
    const el = track.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setEdge({ start: el.scrollLeft <= 2, end: el.scrollLeft >= max - 2, progress: max > 0 ? el.scrollLeft / max : 1 })
  }, [])

  useEffect(() => {
    const el = track.current
    if (!el) return
    measure()
    el.addEventListener('scroll', measure, { passive: true })
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', measure)
      ro.disconnect()
    }
  }, [measure])

  const step = (dir: 1 | -1) => {
    const el = track.current
    const card = el?.querySelector<HTMLElement>('[data-project]')
    if (!el || !card) return
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <section ref={scope} id="projects" aria-labelledby="projects-title" className="projects">
      <div className="container-site">
        <h2 id="projects-title" data-projects-title className="brand-headline projects__title">
          {TITLE.map((word, i) => (
            <span key={word} className="brand-headline__word">
              {word}
              {i < TITLE.length - 1 && ' '}
            </span>
          ))}
        </h2>
      </div>

      <ul ref={track} id="projects-track" className="projects__track" tabIndex={0} aria-label="Recent work, scroll horizontally">
        {projects.map((project, i) => (
          <li key={project.id} data-project className="project">
            <ProjectCard project={project} priority={i < 2} />
          </li>
        ))}
      </ul>

      <div className="projects__controls container-site">
        <span aria-hidden="true" className="projects__progress">
          <span className="projects__progress-bar" style={{ transform: `scaleX(${0.12 + edge.progress * 0.88})` }} />
        </span>
        <div className="projects__buttons">
          <button type="button" className="projects__btn" aria-controls="projects-track" aria-label="Previous project" disabled={edge.start} onClick={() => step(-1)}>
            <ChevronIcon className="size-4 rotate-180" />
          </button>
          <button type="button" className="projects__btn" aria-controls="projects-track" aria-label="Next project" disabled={edge.end} onClick={() => step(1)}>
            <ChevronIcon className="size-4" />
          </button>
        </div>
      </div>
    </section>
  )
}

const SIZES = '(min-width: 1024px) 24rem, (min-width: 768px) 40vw, 72vw'
const srcset = (list: { url: string; w: number }[]) => list.map((s) => `${s.url} ${s.w}w`).join(', ')

function ProjectPicture({ photo, priority, className = '' }: { photo: Photo; priority: boolean; className?: string }) {
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

function ProjectCard({ project, priority }: { project: Project; priority: boolean }) {
  const { image, video, gallery, make, model, logo } = project

  return (
    <figure className="project__card" data-placeholder={image ? undefined : ''}>
      {image && gallery?.length ? (
        <ProjectGallery photos={[image, ...gallery]} priority={priority} label={`${make} ${model}`} />
      ) : image ? (
        <ProjectPicture photo={image} priority={priority} />
      ) : (
        <span aria-hidden="true" className="project__media project__media--placeholder" />
      )}

      {video && image && <ProjectVideo src={video} />}

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
function ProjectGallery({ photos, priority, label }: { photos: Photo[]; priority: boolean; label: string }) {
  const [active, setActive] = useState(0)
  const total = photos.length

  return (
    <>
      {photos.map((photo, i) => (
        <ProjectPicture key={photo.alt} photo={photo} priority={priority && i === 0} className={`project__slide${i === active ? ' is-active' : ''}`} />
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
 * card is near the viewport (the strip scrolls sideways too), plays while
 * at least 40% visible and pauses otherwise. Reduced motion: never loads;
 * the poster stays.
 */
function ProjectVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const reduceMotion = usePrefersReducedMotion()
  const [near, setNear] = useState(false)
  const [ready, setReady] = useState(false)
  const visible = useRef(false)

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
      { rootMargin: '300px' },
    )
    const playObs = new IntersectionObserver(
      ([e]) => {
        visible.current = e.isIntersecting
        if (e.isIntersecting && v.currentSrc) v.play().catch(() => {})
        else v.pause()
      },
      { threshold: 0.4 },
    )
    nearObs.observe(v)
    playObs.observe(v)
    return () => {
      nearObs.disconnect()
      playObs.disconnect()
    }
  }, [reduceMotion])

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
