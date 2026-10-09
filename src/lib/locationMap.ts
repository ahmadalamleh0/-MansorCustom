/**
 * Dark 3D location map (MapLibre GL + OpenFreeMap). Adapted from the Framer
 * "OpenFreeMap 3D" component: Framer-only code removed, and the camera,
 * interaction toggles, marker and cleanup kept.
 *
 * Loaded lazily (dynamic import) by LocationMap, so MapLibre and its CSS
 * ship as a separate chunk that is fetched only near the map section.
 *
 * 3D: OpenFreeMap's Dark style has no building extrusions, so a
 * `fill-extrusion` layer is added from the same `openmaptiles` vector source
 * (`building` source layer, `render_height` / `render_min_height`, the
 * fields OpenFreeMap's Liberty style uses for its own 3D buildings).
 */
import { AttributionControl, Map as MapLibreMap, Marker, setWorkerUrl, type LayerSpecification, type StyleSpecification } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
// MapLibre v6 starts a module worker from a file next to its own module,
// which doesn't exist once it's bundled. Point it at the worker Vite actually
// serves (dev) or emits as a hashed asset (build). The worker is self-contained.
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?url'

setWorkerUrl(workerUrl)

const STYLE_URL = 'https://tiles.openfreemap.org/styles/dark'

// Palette: near-black ground, charcoal roads, architectural greys
const PALETTE = {
  ground: '#0b0b0c',
  minorRoad: '#1d1d20',
  wood: '#161618',
  buildingLow: '#141416',
  buildingMid: '#1c1c1f',
  buildingTall: '#26262a',
}

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

export function createLocationMap(o: LocationMapOptions) {
  let settled = false
  let destroyed = false
  let map: MapLibreMap | null = null
  const fail = (reason: string) => {
    if (settled || destroyed) return
    settled = true
    o.onError(reason)
  }
  // A style or tiles that never arrive (network, blocked) fall back cleanly
  const timeout = window.setTimeout(() => fail('timeout'), 15000)

  // Fetch the Dark style and apply every change before the first frame:
  // no flash of the untuned style, and no reference to the missing sprite.
  fetch(STYLE_URL)
    .then((res) => {
      if (!res.ok) throw new Error(`style ${res.status}`)
      return res.json() as Promise<StyleSpecification>
    })
    .then((style) => {
      if (destroyed) return
      map = new MapLibreMap({
        container: o.container,
        style: tuneStyle(style),
        center: [o.lng, o.lat],
        zoom: 16.4,
        pitch: 60,
        bearing: -28,
        attributionControl: false,
        scrollZoom: false, // never hijack page scrolling
        dragPan: !o.touch, // touch: one finger scrolls the page
        touchPitch: false,
        keyboard: false,
        fadeDuration: 0,
      })
      map.addControl(new AttributionControl({ compact: true }), 'bottom-right')
      map.on('error', (e) => {
        if (map && !map.isStyleLoaded()) fail(e.error?.message ?? 'style error')
      })
      map.on('load', () => {
        window.clearTimeout(timeout)
        if (map) addMarker(map, o)
        if (!settled && !destroyed) {
          settled = true
          o.onReady()
        }
      })
    })
    .catch((err: Error) => fail(err.message))

  return {
    destroy() {
      destroyed = true
      window.clearTimeout(timeout)
      map?.remove() // releases the WebGL context, workers, listeners and markers
      map = null
    },
  }
}

/** Dark palette, quieter details, a soft light and 3D buildings, applied to the style JSON */
function tuneStyle(style: StyleSpecification): StyleSpecification {
  const layers = style.layers.flatMap((layer): LayerSpecification[] => {
    // One-way arrows are visual noise at this scale
    if (layer.id === 'road_oneway' || layer.id === 'road_oneway_opposite') return []
    if (layer.type === 'background') {
      return [{ ...layer, paint: { ...layer.paint, 'background-color': PALETTE.ground } }]
    }
    if (layer.type === 'fill' && layer.paint && 'fill-pattern' in layer.paint) {
      // Upstream bug: OpenFreeMap's Dark style references a "wood-pattern"
      // image its sprite doesn't contain. Use a solid dark fill instead.
      const { 'fill-pattern': _pattern, ...paint } = layer.paint
      return [{ ...layer, paint: { ...paint, 'fill-color': PALETTE.wood } }]
    }
    if (layer.id === 'highway_minor' && layer.type === 'line') {
      return [{ ...layer, paint: { ...layer.paint, 'line-color': PALETTE.minorRoad } }]
    }
    return [layer]
  })

  // 3D buildings, drawn under the labels so names stay legible
  const at = layers.findIndex((l) => l.id === 'highway_name_other')
  layers.splice(at === -1 ? layers.length : at, 0, BUILDINGS_3D)

  // Soft directional light so extruded facades read as architecture
  return { ...style, layers, light: { anchor: 'viewport', color: '#ffffff', intensity: 0.42, position: [1.15, 210, 30] } }
}

const BUILDINGS_3D: LayerSpecification = {
  id: 'building-3d',
  type: 'fill-extrusion',
  source: 'openmaptiles',
  'source-layer': 'building',
  minzoom: 14,
  paint: {
    'fill-extrusion-color': [
      'interpolate', ['linear'], ['get', 'render_height'],
      0, PALETTE.buildingLow,
      20, PALETTE.buildingMid,
      60, PALETTE.buildingTall,
    ],
    'fill-extrusion-height': ['get', 'render_height'],
    'fill-extrusion-base': ['get', 'render_min_height'],
    'fill-extrusion-opacity': 0.94,
    'fill-extrusion-vertical-gradient': true,
  },
}

function addMarker(map: MapLibreMap, o: LocationMapOptions) {
  const el = document.createElement('div')
  el.className = 'map-marker'
  el.innerHTML = '<span class="map-marker__dot"></span><span class="map-marker__label"></span>'
  el.querySelector('.map-marker__label')!.textContent = o.label
  el.setAttribute('aria-hidden', 'true') // the address + directions link carry this for assistive tech
  new Marker({ element: el, anchor: 'center' }).setLngLat([o.lng, o.lat]).addTo(map)
}
