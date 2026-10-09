import { useEffect, useRef, useState } from 'react'
import { site } from '@/data/site'

type Status = 'idle' | 'loading' | 'ready' | 'fallback'

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

/**
 * Compact, full-bleed dark 3D map between the page content and the footer
 * (the "Contact" nav target). MapLibre is loaded only when the section
 * approaches the viewport (lib/locationMap.ts). Without WebGL, or if the
 * map fails to load, a dark panel with the address and directions link
 * is shown instead.
 */
export function LocationMap() {
  const location = site.location
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  // Detected once on first render: without WebGL the fallback shows immediately
  const [webgl] = useState(supportsWebGL)
  const [status, setStatus] = useState<Status>(webgl ? 'idle' : 'fallback')

  useEffect(() => {
    const section = sectionRef.current
    const container = canvasRef.current
    if (!location || !section || !container || !webgl) return

    let instance: { destroy: () => void } | null = null
    let cancelled = false

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        setStatus('loading')
        import('@/lib/locationMap')
          .then(({ createLocationMap }) => {
            if (cancelled) return
            instance = createLocationMap({
              container,
              lng: location.lng,
              lat: location.lat,
              label: location.name,
              touch: window.matchMedia('(pointer: coarse)').matches,
              onReady: () => !cancelled && setStatus('ready'),
              onError: () => !cancelled && setStatus('fallback'),
            })
          })
          .catch(() => !cancelled && setStatus('fallback'))
      },
      { rootMargin: '600px 0px' }, // start a little before it scrolls into view
    )
    observer.observe(section)

    return () => {
      cancelled = true
      observer.disconnect()
      instance?.destroy()
    }
  }, [location, webgl])

  const directions = location
    ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location.address)}`
    : null

  return (
    <section ref={sectionRef} id="contact" aria-label="Location" className="location-map" data-status={status}>
      <div ref={canvasRef} className="location-map__canvas" aria-hidden="true" />

      {location && (
        <div className="location-map__info">
          <p className="location-map__address">{location.address}</p>
          <a href={directions!} target="_blank" rel="noopener noreferrer" className="location-map__directions">
            Get Directions
            <span className="sr-only"> to {location.name} (opens Google Maps)</span>
          </a>
        </div>
      )}
    </section>
  )
}
