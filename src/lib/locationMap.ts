/**
 * 3D location map (MapLibre GL + OpenFreeMap), adapted from the Framer
 * "OpenFreeMap 3D" component: Framer-only code removed, and the camera,
 * interaction toggles, marker and cleanup kept.
 *
 * Style: OpenFreeMap **Liberty**, loaded unmodified, exactly as in the Framer
 * component. Its natural colours, labels and native `building-3d`
 * extrusions are the visual authority (creative director, 2026-10-09). The
 * black site frames a light, detailed map on purpose. Don't restyle it.
 *
 * Loaded lazily (dynamic import) by LocationMap, so MapLibre and its CSS
 * ship as a separate chunk that is fetched only near the map section.
 */
import { AttributionControl, Map as MapLibreMap, Marker, setWorkerUrl } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
// MapLibre v6 starts a module worker from a file next to its own module,
// which doesn't exist once it's bundled. Point it at the worker Vite actually
// serves (dev) or emits as a hashed asset (build). The worker is self-contained.
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?url'

setWorkerUrl(workerUrl)

const STYLE_URL = 'https://tiles.openfreemap.org/styles/liberty'

export type LocationMapOptions = {
  container: HTMLElement
  lng: number
  lat: number
  label: string
  /** Coarse pointers (touch): one-finger drag scrolls the page, two move the map */
  touch: boolean
  onReady: () => void
  onError: (reason: string) => void
}

/**
 * Camera, chosen from Playwright contact sheets of zoom × pitch × bearing
 * against the Framer reference. The wide desktop band and the narrow phone
 * band need different framing: each keeps the shop centred, the Saddle River
 * as a leading line and the surrounding buildings readable in 3D.
 */
function camera() {
  return window.matchMedia('(max-width: 767px)').matches
    ? { zoom: 15.5, pitch: 68, bearing: 24 }
    : { zoom: 16, pitch: 62, bearing: 14 }
}

export function createLocationMap(o: LocationMapOptions) {
  let settled = false
  const fail = (reason: string) => {
    if (settled) return
    settled = true
    o.onError(reason)
  }
  // A style or tiles that never arrive (network, blocked) fall back cleanly
  const timeout = window.setTimeout(() => fail('timeout'), 15000)

  const map = new MapLibreMap({
    container: o.container,
    style: STYLE_URL,
    center: [o.lng, o.lat],
    ...camera(),
    maxPitch: 70,
    attributionControl: false,
    scrollZoom: false, // never hijack page scrolling
    dragPan: !o.touch, // touch: one finger scrolls the page
    touchPitch: false,
    keyboard: false,
  })
  // Known upstream warnings: Liberty's three highway-shield layers
  // (highway-shield-non-us, highway-shield-us-interstate, road_shield_us)
  // log "Expected value to be of type number, but found null" for features
  // without a route number. Harmless, and the style stays unmodified.
  const attribution = new AttributionControl({ compact: true })
  map.addControl(attribution, 'bottom-right')

  // Liberty references a few POI icons (swimming_pool, gate, bollard, ...)
  // that OpenFreeMap's sprite doesn't contain. MapLibre already skips them;
  // registering a transparent 1px stand-in keeps the console clean without
  // changing the style or anything rendered.
  map.setMissingStyleImageResolver((id) => {
    if (!map.hasImage(id)) map.addImage(id, { width: 1, height: 1, data: new Uint8Array(4) })
  })

  map.on('error', (e) => {
    if (!map.isStyleLoaded()) fail(e.error?.message ?? 'style error')
  })
  map.on('load', () => {
    window.clearTimeout(timeout)
    addMarker(map, o)
    // Start the compact attribution in MapLibre's own minimised state (the
    // same state it switches to after the first drag): just the (i) button,
    // which expands the full credits. Nothing is hidden with CSS.
    o.container.querySelector('.maplibregl-ctrl-attrib.maplibregl-compact')?.classList.remove('maplibregl-compact-show')
    if (import.meta.env.DEV) (window as unknown as { __locationMap?: MapLibreMap }).__locationMap = map // camera tuning in dev only
    if (!settled) {
      settled = true
      o.onReady()
    }
  })

  return {
    destroy() {
      settled = true
      window.clearTimeout(timeout)
      map.remove() // releases the WebGL context, workers, listeners and markers
    },
  }
}

function addMarker(map: MapLibreMap, o: LocationMapOptions) {
  const el = document.createElement('div')
  el.className = 'map-marker'
  el.innerHTML = '<span class="map-marker__dot"></span><span class="map-marker__label"></span>'
  el.querySelector('.map-marker__label')!.textContent = o.label
  el.setAttribute('aria-hidden', 'true') // the address + directions link carry this for assistive tech
  new Marker({ element: el, anchor: 'center' }).setLngLat([o.lng, o.lat]).addTo(map)
}
