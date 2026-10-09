import { site } from '@/data/site'

/**
 * Compact, full-bleed dark map band between the page content and the footer
 * (after the Black Star Studio reference). It is also the "Contact" nav target.
 *
 * NOT YET LIVE. To activate the real Google Map:
 *   1. Set `site.location` to the verified shop location (label, lat, lng).
 *   2. Create a Google Maps API key restricted to this site's domains
 *      (Maps JavaScript API) and put it in `.env.local` as
 *      VITE_GOOGLE_MAPS_API_KEY (never committed).
 *   3. Create a Map ID with a dark style in Google Cloud (Map Styles), or use
 *      the JS API's dark colour scheme, and set VITE_GOOGLE_MAPS_MAP_ID.
 *   The map then renders with a single discreet marker at `site.location`.
 * Until then this renders an abstract dark placeholder: no address, no
 * marker, and no real geography.
 */
export function LocationMap() {
  return (
    <section id="contact" aria-label="Location" className="location-map">
      {site.location ? null : <MapPlaceholder />}
    </section>
  )
}

/** Abstract street-grid texture: atmosphere only, not a real place */
function MapPlaceholder() {
  return (
    <>
      <svg aria-hidden="true" className="location-map__texture" viewBox="0 0 1600 400" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="map-grid" width="46" height="46" patternUnits="userSpaceOnUse" patternTransform="rotate(-14)">
            <path d="M46 0H0V46" fill="none" stroke="rgb(255 255 255 / 0.035)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="1600" height="400" fill="url(#map-grid)" />
        <g fill="none" stroke="rgb(255 255 255 / 0.07)" strokeLinecap="round">
          <path d="M-40 318 C 380 262, 760 250, 1640 96" strokeWidth="5" />
          <path d="M520 -20 L 640 430" strokeWidth="3" />
          <path d="M1130 -20 C 1090 140, 1150 260, 1210 430" strokeWidth="3" />
          <path d="M-40 120 L 1640 210" strokeWidth="2" />
        </g>
      </svg>
      <p className="location-map__note">Location to be confirmed</p>
    </>
  )
}
