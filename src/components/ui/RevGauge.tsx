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

/**
 * Thin-line rev gauge (0–8 ×1000 rpm over a 240° arc, redline 7–8). Static
 * markup only: the needle, the lit arc, its glow and the readout are driven
 * by animations/tuningReveal.ts through the data-rg-* hooks. Decorative, so
 * it is hidden from assistive tech.
 */
export function RevGauge({ className = '' }: { className?: string }) {
  const { cx, cy, r, max, redline } = GAUGE
  return (
    <svg aria-hidden="true" viewBox="0 0 200 150" className={`rev-gauge ${className}`} data-rg>
      <defs>
        <filter id="rg-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.4" />
        </filter>
      </defs>

      {/* Scale: quarter ticks, majors at each 1000, the redline band outside */}
      {TICKS.map((rpm) => {
        const major = Number.isInteger(rpm)
        const half = !major && rpm % 0.5 === 0
        const [x1, y1] = point(angle(rpm), r + 5)
        const [x2, y2] = point(angle(rpm), r + (major ? 13 : half ? 10 : 8))
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
      <path d={arc(redline, max, r + 16)} className="rev-gauge__redline" />

      {Array.from({ length: max + 1 }, (_, n) => {
        const [x, y] = point(angle(n), r - 13)
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

      <g data-rg-needle>
        <line x1={cx - 10} y1={cy} x2={cx + r - 4} y2={cy} className="rev-gauge__needle" />
      </g>
      <circle cx={cx} cy={cy} r="3.25" className="rev-gauge__hub" />

      <text x={cx} y={cy + 30} className="rev-gauge__readout" data-rg-readout>
        900
      </text>
      <text x={cx} y={cy + 41} className="rev-gauge__unit">
        rpm
      </text>
    </svg>
  )
}
