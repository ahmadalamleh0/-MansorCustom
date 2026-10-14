import { gsap, mq, ScrollTrigger } from '@/lib/gsap'
import { GAUGE } from '@/lib/revGauge'

/** Rev profile (×1000 rpm): idle, the peak just into the redline, and where it settles */
const IDLE = 0.9
const PEAK = 7.6
const SETTLE = 6.4

type RGB = [number, number, number]
const SOFT: RGB = [242, 241, 238]
const AMBER: RGB = [244, 192, 128]
const RED: RGB = [226, 74, 70]
const mix = (a: RGB, b: RGB, t: number) => a.map((v, i) => Math.round(v + (b[i] - v) * t)) as RGB

/** Soft white to 4k, warming to amber by 6.5k; red only past the redline */
function colorAt(rpm: number): RGB {
  if (rpm <= 4) return SOFT
  if (rpm <= 6.5) return mix(SOFT, AMBER, (rpm - 4) / 2.5)
  if (rpm <= GAUGE.redline) return AMBER
  return mix(AMBER, RED, Math.min(1, (rpm - GAUGE.redline) / 0.5))
}

/** Draws the gauge at a given rpm: needle, lit arc and glow, redline glow, readout */
function gaugeRenderer(root: SVGSVGElement) {
  const needle = root.querySelector<SVGGElement>('[data-rg-needle]')!
  const lit = root.querySelector<SVGPathElement>('[data-rg-lit]')!
  const glow = root.querySelector<SVGPathElement>('[data-rg-glow]')!
  const redGlow = root.querySelector<SVGPathElement>('[data-rg-redglow]')!
  const readout = root.querySelector<SVGTextElement>('[data-rg-readout]')!
  const fmt = new Intl.NumberFormat('en-US')
  return (rpm: number) => {
    const deg = GAUGE.start + (rpm / GAUGE.max) * GAUGE.sweep
    gsap.set(needle, { rotation: deg, svgOrigin: `${GAUGE.cx} ${GAUGE.cy}` })
    const offset = String(1000 * (1 - rpm / GAUGE.max))
    const color = `rgb(${colorAt(rpm).join(' ')})`
    lit.style.strokeDashoffset = offset
    lit.style.stroke = color
    glow.style.strokeDashoffset = offset
    glow.style.stroke = color
    // A controlled glow: none at cruise, building only through the top of the range
    glow.style.opacity = String(gsap.utils.clamp(0, 0.5, ((rpm - 5) / (PEAK - 5)) * 0.5))
    // The warm band comes alive as the needle climbs past 6k
    redGlow.style.opacity = String(gsap.utils.clamp(0, 0.9, ((rpm - 6) / (PEAK - 6)) * 0.9))
    readout.textContent = fmt.format(Math.round((rpm * 1000) / 50) * 50)
  }
}

/**
 * Tuning entrance: the media and text rise in once. The rev gauge plays each
 * time the section comes into view: idle, a quick rev to just past the
 * redline, a settle, then a soft live idle (slow sweeps through the upper
 * range with the odd throttle blip) that runs only while the gauge is in
 * view. Reduced motion: the settled reading, no movement.
 */
export function tuningReveal() {
  const mm = gsap.matchMedia()
  const root = document.querySelector<SVGSVGElement>('#tuning [data-rg]')
  const render = root ? gaugeRenderer(root) : null

  mm.add(mq.motionOk, () => {
    gsap.from('[data-tn-reveal]', {
      autoAlpha: 0,
      y: 24,
      duration: 1.1,
      ease: 'expo.out',
      stagger: 0.07,
      scrollTrigger: { trigger: '.tuning__grid', start: 'top 75%', once: true },
    })

    if (!root || !render) return
    const state = { rpm: 0 }
    const draw = () => render(state.rpm)
    draw()
    // Alive: drifts between ~6k and ~7k, a blip into the redline, back to SETTLE
    const alive = gsap
      .timeline({ paused: true, repeat: -1, onUpdate: draw })
      .to(state, { rpm: 6.9, duration: 1.1, ease: 'sine.inOut' })
      .to(state, { rpm: 6.1, duration: 1.3, ease: 'sine.inOut' })
      .to(state, { rpm: 7.35, duration: 0.22, ease: 'power2.out' }, '+=0.5')
      .to(state, { rpm: 6.2, duration: 0.9, ease: 'power3.out' })
      .to(state, { rpm: SETTLE, duration: 0.9, ease: 'sine.inOut' }, '+=0.4')
    const rev = gsap
      .timeline({ paused: true, onUpdate: draw })
      .to(state, { rpm: IDLE, duration: 0.4, ease: 'power2.out' })
      .to(state, { rpm: PEAK, duration: 0.7, ease: 'power2.in' }, '+=0.3')
      .to(state, { rpm: SETTLE, duration: 1.2, ease: 'power3.out' })
      .add(() => alive.restart(), '+=0.6')

    const reset = () => {
      alive.pause()
      rev.pause(0)
      state.rpm = 0
      draw()
    }
    ScrollTrigger.create({
      trigger: root,
      start: 'top 85%',
      end: 'bottom top',
      onEnter: () => rev.restart(),
      onEnterBack: () => rev.restart(),
      onLeave: reset,
      onLeaveBack: reset,
    })
  })

  mm.add(mq.reduceMotion, () => {
    render?.(SETTLE)
  })

  return mm
}
