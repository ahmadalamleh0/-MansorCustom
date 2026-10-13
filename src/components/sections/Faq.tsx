import { useId, useRef, useState } from 'react'
import { quietReveal } from '@/animations/quietReveal'
import { faq } from '@/data/faq'
import { useGSAP } from '@/lib/gsap'

/**
 * Frequently Asked Questions: a minimal accordion between thin rules. Each
 * question is a button (aria-expanded/-controls); the answer opens with a
 * short height + fade transition (CSS grid rows, interruptible). Several can
 * be open. Content: data/faq.ts (draft answers are tagged).
 */
export function Faq() {
  const scope = useRef<HTMLElement>(null)
  const base = useId()
  const [open, setOpen] = useState<Set<string>>(() => new Set())
  useGSAP(() => quietReveal('[data-faq-reveal]', '.faq__list'), { scope })

  const toggle = (id: string) =>
    setOpen((s) => {
      const next = new Set(s)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <section ref={scope} id="faq" aria-labelledby="faq-title" className="faq">
      <div className="container-site faq__grid">
        <h2 id="faq-title" data-faq-reveal className="brand-headline quiet-title faq__title">
          Frequently Asked Questions
        </h2>

        <ul className="faq__list">
          {faq.map((item) => {
            const isOpen = open.has(item.id)
            const panel = `${base}-${item.id}`
            return (
              <li key={item.id} data-faq-reveal className="faq__item" data-open={isOpen || undefined}>
                <h3 className="faq__q">
                  <button type="button" className="faq__button" aria-expanded={isOpen} aria-controls={panel} onClick={() => toggle(item.id)}>
                    <span>{item.q}</span>
                    <span aria-hidden="true" className="faq__icon" />
                  </button>
                </h3>
                <div id={panel} role="region" aria-label={item.q} className="faq__panel" inert={!isOpen || undefined}>
                  <div className="faq__panel-inner">
                    <p className="faq__a">
                      {item.draft && <span className="faq__draft">Draft</span>}
                      {item.a}
                    </p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
