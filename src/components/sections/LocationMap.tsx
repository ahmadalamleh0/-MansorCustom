import { useState } from 'react'
import aerial from '@/assets/images/location-aerial.jpg'
import { site } from '@/data/site'

/** Satellite zoom: matches the aerial preview's wide composition */
const ZOOM = 17

/**
 * Google Maps satellite embed URL. With VITE_GOOGLE_MAPS_EMBED_KEY set (in
 * .env.local, never committed) it uses the official Maps Embed API
 * (place mode: a marker plus Google's place card). Without a key it falls back
 * to Google's keyless "Share → Embed a map" iframe, which shows the same
 * satellite imagery and marker. Restrict the key to this site's domains and
 * to the Maps Embed API in Google Cloud.
 */
function embedUrl(query: string) {
  const key = import.meta.env.VITE_GOOGLE_MAPS_EMBED_KEY as string | undefined
  const q = encodeURIComponent(query)
  return key
    ? `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(key)}&q=${q}&maptype=satellite&zoom=${ZOOM}`
    : `https://maps.google.com/maps?q=${q}&t=k&z=${ZOOM}&output=embed`
}

/**
 * "Visit Us": heading, address and directions on the black page, then a
 * compact, full-bleed aerial preview (the creative director's supplied
 * image, pin at the shop) with an "Explore Location" control. Activating it
 * loads the live, interactive Google Maps satellite view in its place.
 * Google's iframe is only fetched on demand, which keeps the page light.
 * It is the "Contact" nav target.
 */
export function LocationMap() {
  const [live, setLive] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const location = site.location
  if (!location) return null

  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location.address)}`

  return (
    <section id="contact" aria-labelledby="location-title" className="location">
      <h2 id="location-title" className="location__title">
        Visit Us
      </h2>

      <div className="location__info">
        <p className="location__address">{location.address}</p>
        <a href={directions} target="_blank" rel="noopener noreferrer" className="location__directions">
          Get Directions
          <span className="sr-only"> to {location.name} (opens Google Maps)</span>
        </a>
      </div>

      <div className="location-map" data-live={live || undefined} data-loaded={loaded || undefined}>
        <img
          src={aerial}
          alt={`Aerial view of the area around ${location.name}`}
          width={1536}
          height={1024}
          loading="lazy"
          decoding="async"
          className="location-map__preview"
        />

        {!live && (
          <button type="button" onClick={() => setLive(true)} className="location-map__explore">
            Explore Location
            <span className="sr-only"> on an interactive Google map</span>
          </button>
        )}

        {live && (
          <iframe
            title={`Satellite map: ${location.name}, ${location.address}`}
            // Query the exact address only: adding the business name made Google
            // fuzzy-match a different "Customs" shop nearby. The address alone
            // resolves to the Mansor Customs listing (verified 2026-10-09).
            src={embedUrl(location.address)}
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            onLoad={() => setLoaded(true)}
            className="location-map__frame"
          />
        )}
      </div>
    </section>
  )
}
