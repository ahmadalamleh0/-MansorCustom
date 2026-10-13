import { useRef, useState, type FormEvent } from 'react'
import { buildDeskReveal, stepIn } from '@/animations/buildDeskReveal'
import { ArrowIcon } from '@/components/ui/icons'
import { services } from '@/data/services'
import { submitBuildRequest, FORM_NAME, type BuildRequest } from '@/lib/buildRequest'
import { useGSAP } from '@/lib/gsap'

const STEPS = ['Your Vehicle', 'Your Build', 'Your Details'] as const
const CONTACT = ['Email', 'Phone call', 'Text message'] as const
const THIS_YEAR = new Date().getFullYear()

const EMPTY: BuildRequest = {
  make: '',
  model: '',
  year: '',
  service: 'Wraps',
  details: '',
  name: '',
  email: '',
  phone: '',
  contact: 'Email',
  'bot-field': '',
}

type Errors = Partial<Record<keyof BuildRequest, string>>

function validate(step: number, d: BuildRequest): Errors {
  const e: Errors = {}
  if (step === 0) {
    if (!d.make.trim()) e.make = 'Enter the make.'
    if (!d.model.trim()) e.model = 'Enter the model.'
    const y = Number(d.year)
    if (!d.year.trim()) e.year = 'Enter the year.'
    else if (!/^\d{4}$/.test(d.year) || y < 1900 || y > THIS_YEAR + 1) e.year = `Enter a year from 1900 to ${THIS_YEAR + 1}.`
  }
  if (step === 1 && !d.service) e.service = 'Choose a service.'
  if (step === 2) {
    if (!d.name.trim()) e.name = 'Enter your name.'
    if (!d.email.trim()) e.email = 'Enter your email.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim())) e.email = 'Enter a valid email address.'
    const digits = d.phone.replace(/\D/g, '')
    if (d.contact !== 'Email' && !digits) e.phone = 'Add a phone number so we can call or text you.'
    else if (digits && (digits.length < 10 || digits.length > 15)) e.phone = 'Enter a valid phone number.'
  }
  return e
}

/**
 * "Let's talk about your build." Request-a-quote desk (Wraptors quote-form
 * reference for the graphite glass, in Mansor's black). Editorial heading
 * left, a three-step form right (single column on phones). Submits to
 * Netlify Forms (lib/buildRequest.ts). Animation hooks: [data-bd-reveal],
 * [data-bd-step].
 */
export function BuildDesk() {
  const scope = useRef<HTMLElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(0)
  const [data, setData] = useState<BuildRequest>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  useGSAP(() => buildDeskReveal(), { scope })

  const set = <K extends keyof BuildRequest>(k: K, v: BuildRequest[K]) => {
    setData((d) => ({ ...d, [k]: v }))
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }))
  }

  const go = (to: number) => {
    setStep(to)
    requestAnimationFrame(() => {
      stepIn(panel.current)
      panel.current?.querySelector<HTMLElement>('[data-bd-first]')?.focus({ preventScroll: true })
    })
  }

  const focusFirstError = (e: Errors) => {
    const first = Object.keys(e)[0]
    if (first) panel.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
  }

  const next = () => {
    const e = validate(step, data)
    setErrors(e)
    if (Object.keys(e).length) return focusFirstError(e)
    go(step + 1)
  }

  const submit = async (ev: FormEvent) => {
    ev.preventDefault()
    if (step < 2) return next()
    const e = validate(2, data)
    setErrors(e)
    if (Object.keys(e).length) return focusFirstError(e)
    setStatus('sending')
    try {
      await submitBuildRequest(data)
      setStatus('sent')
      requestAnimationFrame(() => stepIn(panel.current))
    } catch {
      setStatus('error')
    }
  }

  const field = (k: keyof BuildRequest) => ({
    id: `bd-${k}`,
    name: k,
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': errors[k] ? `bd-${k}-error` : undefined,
  })
  const err = (k: keyof BuildRequest) =>
    errors[k] ? (
      <p id={`bd-${k}-error`} className="bd-error">
        {errors[k]}
      </p>
    ) : null

  return (
    <section ref={scope} id="build" aria-labelledby="build-title" className="build-desk">
      <div className="container-site build-desk__grid">
        <div className="build-desk__intro">
          <h2 id="build-title" data-bd-reveal className="brand-headline build-desk__title">
            Let’s talk about your build.
          </h2>
          <p data-bd-reveal className="build-desk__lede">
            Tell us what you drive and what you have in mind.
          </p>
        </div>

        <div data-bd-reveal ref={panel} className="build-desk__panel">
          {status === 'sent' ? (
            <div data-bd-step className="bd-done" role="status">
              <p className="bd-step-label">Request received</p>
              <p className="bd-done__title">Thank you, {data.name.trim().split(/\s+/)[0]}.</p>
              <p className="bd-done__text">
                We have your {data.year} {data.make} {data.model} and will be in touch by {data.contact.toLowerCase()}.
              </p>
            </div>
          ) : (
            <form name={FORM_NAME} noValidate onSubmit={submit} aria-label="Request a quote">
              <div className="bd-progress" aria-hidden="true">
                {STEPS.map((_, i) => (
                  <span key={i} className={`bd-progress__seg${i <= step ? ' is-on' : ''}`} />
                ))}
              </div>
              <p className="bd-step-label" aria-live="polite">
                <span className="bd-step-label__num">0{step + 1}</span> / {STEPS[step]}
              </p>

              {/* Honeypot (Netlify): hidden from people and assistive tech */}
              <p className="sr-only" aria-hidden="true">
                <label>
                  Leave this empty <input name="bot-field" tabIndex={-1} autoComplete="off" value={data['bot-field']} onChange={(e) => set('bot-field', e.target.value)} />
                </label>
              </p>

              <div data-bd-step className="bd-step">
                {step === 0 && (
                  <fieldset className="bd-fields">
                    <legend className="sr-only">Your vehicle</legend>
                    <div className="bd-field">
                      <label htmlFor="bd-make">Make</label>
                      <input data-bd-first {...field('make')} autoComplete="off" placeholder="e.g. Lamborghini" value={data.make} onChange={(e) => set('make', e.target.value)} />
                      {err('make')}
                    </div>
                    <div className="bd-field">
                      <label htmlFor="bd-model">Model</label>
                      <input {...field('model')} autoComplete="off" placeholder="e.g. Aventador S" value={data.model} onChange={(e) => set('model', e.target.value)} />
                      {err('model')}
                    </div>
                    <div className="bd-field bd-field--short">
                      <label htmlFor="bd-year">Year</label>
                      <input {...field('year')} inputMode="numeric" maxLength={4} placeholder={String(THIS_YEAR)} value={data.year} onChange={(e) => set('year', e.target.value.replace(/\D/g, ''))} />
                      {err('year')}
                    </div>
                  </fieldset>
                )}

                {step === 1 && (
                  <>
                    <fieldset className="bd-fields">
                      <legend className="bd-legend">What are you building?</legend>
                      <div className="bd-options" role="radiogroup">
                        {services.map((s, i) => (
                          <label key={s.slug} className="bd-option">
                            <input
                              type="radio"
                              name="service"
                              value={s.title}
                              data-bd-first={i === 0 || undefined}
                              checked={data.service === s.title}
                              onChange={() => set('service', s.title)}
                            />
                            <span className="bd-option__text">{s.title}</span>
                            <span aria-hidden="true" className="bd-option__dot" />
                          </label>
                        ))}
                      </div>
                      {err('service')}
                    </fieldset>
                    <div className="bd-field">
                      <label htmlFor="bd-details">
                        Tell us more <span className="bd-optional">Optional</span>
                      </label>
                      <textarea {...field('details')} rows={4} placeholder="Colours, finishes, references, timing…" value={data.details} onChange={(e) => set('details', e.target.value)} />
                    </div>
                  </>
                )}

                {step === 2 && (
                  <fieldset className="bd-fields">
                    <legend className="sr-only">Your details</legend>
                    <div className="bd-field">
                      <label htmlFor="bd-name">Name</label>
                      <input data-bd-first {...field('name')} autoComplete="name" value={data.name} onChange={(e) => set('name', e.target.value)} />
                      {err('name')}
                    </div>
                    <div className="bd-field">
                      <label htmlFor="bd-email">Email</label>
                      <input {...field('email')} type="email" autoComplete="email" inputMode="email" value={data.email} onChange={(e) => set('email', e.target.value)} />
                      {err('email')}
                    </div>
                    <div className="bd-field">
                      <label htmlFor="bd-phone">
                        Phone {data.contact === 'Email' && <span className="bd-optional">Optional</span>}
                      </label>
                      <input {...field('phone')} type="tel" autoComplete="tel" inputMode="tel" value={data.phone} onChange={(e) => set('phone', e.target.value)} />
                      {err('phone')}
                    </div>
                    <div className="bd-field">
                      <span className="bd-label" id="bd-contact-label">Preferred contact</span>
                      <div className="bd-segment" role="radiogroup" aria-labelledby="bd-contact-label">
                        {CONTACT.map((c) => (
                          <label key={c} className="bd-segment__item">
                            <input type="radio" name="contact" value={c} checked={data.contact === c} onChange={() => set('contact', c)} />
                            <span>{c}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </fieldset>
                )}
              </div>

              {status === 'error' && (
                <p className="bd-alert" role="alert">
                  Your request didn’t send. Please try again, or message us on Instagram.
                </p>
              )}

              <div className="bd-actions">
                {step > 0 ? (
                  <button type="button" className="bd-back" onClick={() => go(step - 1)} disabled={status === 'sending'}>
                    <ArrowIcon className="bd-back__icon" />
                    Back
                  </button>
                ) : (
                  <span />
                )}
                <button type="submit" className="bd-next" disabled={status === 'sending'} aria-busy={status === 'sending' || undefined}>
                  {step < 2 ? 'Continue' : status === 'sending' ? 'Sending…' : 'Submit Request'}
                  {status !== 'sending' && <ArrowIcon className="bd-next__icon" />}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
