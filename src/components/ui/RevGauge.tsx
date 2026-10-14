import { GAUGE } from '@/lib/revGauge'

const angle = (rpm: number) => GAUGE.start + (rpm / GAUGE.max) * GAUGE.sweep
const point = (deg: number, radius: number) => {
  const a = (deg * Math.PI) / 180
  return [GAUGE.cx + radius * Math.cos(a), GAUGE.cy + radius * Math.sin(a)] as const
}
const arc = (from: number, to: number, radius: number) => {
  const [x1, y1] = point(angle(from), radius)
  const [x2, y2] = point(angle(to), radius)
  const large = ((to - from) / GAUGE.max) * GAUGE.sweep > 180 ? 1 : 0
  return `M${x1.toFixed(2)} ${y1.toFixed(2)}A${radius} ${radius} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`
}

const TICKS = Array.from({ length: GAUGE.max * 4 + 1 }, (_, i) => i / 4)
/** The warm band starts a little before the redline and runs amber into red */
const BAND_FROM = 6

/**
 * Rev gauge (0–8 ×1000 rpm over a 240° arc, redline 7–8): white markings, a
 * warm amber-to-red band outside the scale, a bright needle with a red tip.
 * Static markup only: the needle, the lit arc and its glow, the band's glow
 * and the readout are driven by animations/tuningReveal.ts through the
 * data-rg-* hooks. Decorative, so it is hidden from assistive tech.
 */
export function RevGauge({ className = '' }: { className?: string }) {
  const { cx, cy, r, max, redline } = GAUGE
  const [bx1, by1] = point(angle(BAND_FROM), r + 18)
  const [bx2, by2] = point(angle(max), r + 18)
  return (
    <svg aria-hidden="true" viewBox="0 0 200 150" className={`rev-gauge ${className}`} data-rg>
      <defs>
        <filter id="rg-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.4" />
        </filter>
        <linearGradient id="rg-band" gradientUnits="userSpaceOnUse" x1={bx1} y1={by1} x2={bx2} y2={by2}>
          <stop offset="0" stopColor="rgb(244 192 128)" stopOpacity="0" />
          <stop offset="0.45" stopColor="rgb(244 160 96)" stopOpacity="0.85" />
          <stop offset="1" stopColor="rgb(232 64 56)" />
        </linearGradient>
      </defs>

      {/* Warm band outside the scale; its glow rises with the revs */}
      <path d={arc(BAND_FROM, max, r + 18)} className="rev-gauge__band-glow" filter="url(#rg-glow)" data-rg-redglow />
      <path d={arc(BAND_FROM, max, r + 18)} className="rev-gauge__band" />

      {/* Scale: quarter ticks, majors at each 1000 */}
      {TICKS.map((rpm) => {
        const major = Number.isInteger(rpm)
        const half = !major && rpm % 0.5 === 0
        const [x1, y1] = point(angle(rpm), r + 4)
        const [x2, y2] = point(angle(rpm), r + (major ? 14 : half ? 10 : 8))
        return (
          <line
            key={rpm}
            x1={x1.toFixed(2)}
            y1={y1.toFixed(2)}
            x2={x2.toFixed(2)}
            y2={y2.toFixed(2)}
            className={`rev-gauge__tick${major ? ' is-major' : ''}${rpm >= redline ? ' is-red' : ''}`}
          />
        )
      })}

      {Array.from({ length: max + 1 }, (_, n) => {
        const [x, y] = point(angle(n), r - 14)
        return (
          <text key={n} x={x.toFixed(2)} y={y.toFixed(2)} className={`rev-gauge__num${n >= redline ? ' is-red' : ''}`}>
            {n}
          </text>
        )
      })}

      {/* Track, then the lit arc (with a soft blurred copy as its glow) */}
      <path d={arc(0, max, r)} className="rev-gauge__track" />
      <path d={arc(0, max, r)} pathLength={1000} className="rev-gauge__glow" filter="url(#rg-glow)" data-rg-glow />
      <path d={arc(0, max, r)} pathLength={1000} className="rev-gauge__lit" data-rg-lit />

      {/* Needle: a bright shaft with a red tip and a short tail behind the hub */}
      <g data-rg-needle>
        <line x1={cx - 12} y1={cy} x2={cx + r - 20} y2={cy} className="rev-gauge__needle" />
        <line x1={cx + r - 20} y1={cy} x2={cx + r - 2} y2={cy} className="rev-gauge__needle-tip" />
      </g>
      <circle cx={cx} cy={cy} r="4.5" className="rev-gauge__hub" />
      <circle cx={cx} cy={cy} r="1.25" className="rev-gauge__hub-dot" />

      <text x={cx} y={cy + 31} className="rev-gauge__readout" data-rg-readout>
        900
      </text>
      <text x={cx} y={cy + 43} className="rev-gauge__unit">
        rpm
      </text>
    </svg>
  )
}
