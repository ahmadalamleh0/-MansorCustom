import { useRef, useState, type FormEvent, type ReactNode } from 'react'
import { buildDeskReveal } from '@/animations/buildDeskReveal'
import { ArrowIcon } from '@/components/ui/icons'
import { services } from '@/data/services'
import { submitBuildRequest, FORM_NAME, type BuildRequest } from '@/lib/buildRequest'
import { useGSAP } from '@/lib/gsap'

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

function validate(d: BuildRequest): Errors {
  const e: Errors = {}
  if (!d.make.trim()) e.make = 'Enter the make.'
  if (!d.model.trim()) e.model = 'Enter the model.'
  const y = Number(d.year)
  if (!d.year.trim()) e.year = 'Enter the year.'
  else if (!/^\d{4}$/.test(d.year) || y < 1900 || y > THIS_YEAR + 1) e.year = `Enter a year from 1900 to ${THIS_YEAR + 1}.`
  if (!d.service) e.service = 'Choose a service.'
  if (!d.name.trim()) e.name = 'Enter your name.'
  if (!d.email.trim()) e.email = 'Enter your email.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim())) e.email = 'Enter a valid email address.'
  const digits = d.phone.replace(/\D/g, '')
  if (d.contact !== 'Email' && !digits) e.phone = 'Add a phone number so we can call or text you.'
  else if (digits && (digits.length < 10 || digits.length > 15)) e.phone = 'Enter a valid phone number.'
  return e
}

/**
 * The Build Brief: "Let's talk about your build." as a bespoke order sheet
 * rather than a booking wizard. No container or cards: the heading sits in
 * its own column (sticky on lg) beside one continuous form in three
 * numbered parts (01 / Vehicle, 02 / Customization, 03 / Contact) set off
 * by hairlines. Underlined fields, services as thin selectable rows, an
 * outlined Submit Your Build. Validates the whole sheet on submit (inline
 * errors, focus on the first), then posts to Netlify Forms
 * (lib/buildRequest.ts). Animation hooks: [data-bd-reveal].
 */
export function BuildDesk() {
  const scope = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [data, setData] = useState<BuildRequest>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  useGSAP(() => buildDeskReveal(), { scope })

  const set = <K extends keyof BuildRequest>(k: K, v: BuildRequest[K]) => {
    setData((d) => ({ ...d, [k]: v }))
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }))
  }

  const submit = async (ev: FormEvent) => {
    ev.preventDefault()
    const e = validate(data)
    setErrors(e)
    const first = Object.keys(e)[0]
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    setStatus('sending')
    try {
      await submitBuildRequest(data)
      setStatus('sent')
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
    <section ref={scope} id="build" aria-labelledby="build-title" className="build-brief">
      <div className="container-site build-brief__grid">
        <header className="build-brief__intro">
          <p data-bd-reveal className="bd-kicker">
            The Build Brief
          </p>
          <h2 id="build-title" data-bd-reveal className="brand-headline build-brief__title">
            Let’s talk about your build.
          </h2>
          <p data-bd-reveal className="build-brief__lede">
            Tell us what you drive and what you have in mind.
          </p>
        </header>

        <div data-bd-reveal className="build-brief__sheet">
          {status === 'sent' ? (
            <div className="bd-done" role="status">
              <p className="bd-part__num">Brief received</p>
              <p className="bd-done__title">Thank you, {data.name.trim().split(/\s+/)[0]}.</p>
              <p className="bd-done__text">
                We have your {data.year} {data.make} {data.model} and will be in touch by {data.contact.toLowerCase()}.
              </p>
            </div>
          ) : (
            <form ref={formRef} name={FORM_NAME} noValidate onSubmit={submit} aria-label="Request a quote">
              {/* Honeypot (Netlify): hidden from people and assistive tech */}
              <p className="sr-only" aria-hidden="true">
                <label>
                  Leave this empty <input name="bot-field" tabIndex={-1} autoComplete="off" value={data['bot-field']} onChange={(e) => set('bot-field', e.target.value)} />
                </label>
              </p>

              <Part num="01" title="Vehicle">
                <div className="bd-row bd-row--vehicle">
                  <div className="bd-line">
                    <label htmlFor="bd-make">Make</label>
                    <input {...field('make')} autoComplete="off" placeholder="Lamborghini" value={data.make} onChange={(e) => set('make', e.target.value)} />
                    {err('make')}
                  </div>
                  <div className="bd-line">
                    <label htmlFor="bd-model">Model</label>
                    <input {...field('model')} autoComplete="off" placeholder="Aventador S" value={data.model} onChange={(e) => set('model', e.target.value)} />
                    {err('model')}
                  </div>
                  <div className="bd-line bd-line--year">
                    <label htmlFor="bd-year">Year</label>
                    <input {...field('year')} inputMode="numeric" maxLength={4} placeholder={String(THIS_YEAR)} value={data.year} onChange={(e) => set('year', e.target.value.replace(/\D/g, ''))} />
                    {err('year')}
                  </div>
                </div>
              </Part>

              <Part num="02" title="Customization">
                <fieldset className="bd-services">
                  <legend className="bd-sublabel">What are you building?</legend>
                  <ul className="bd-service-list" role="radiogroup" aria-label="Service">
                    {services.map((s, i) => (
                      <li key={s.slug}>
                        <label className="bd-service">
                          <input type="radio" name="service" value={s.title} checked={data.service === s.title} onChange={() => set('service', s.title)} />
                          <span className="bd-service__index">{String(i + 1).padStart(2, '0')}</span>
                          <span className="bd-service__name">{s.title}</span>
                          <span aria-hidden="true" className="bd-service__mark" />
                        </label>
                      </li>
                    ))}
                  </ul>
                  {err('service')}
                </fieldset>
                <div className="bd-line bd-line--area">
                  <label htmlFor="bd-details">
                    Notes <span className="bd-optional">Optional</span>
                  </label>
                  <textarea {...field('details')} rows={3} placeholder="Colours, finishes, references, timing" value={data.details} onChange={(e) => set('details', e.target.value)} />
                </div>
              </Part>

              <Part num="03" title="Contact">
                <div className="bd-row bd-row--contact">
                  <div className="bd-line">
                    <label htmlFor="bd-name">Name</label>
                    <input {...field('name')} autoComplete="name" value={data.name} onChange={(e) => set('name', e.target.value)} />
                    {err('name')}
                  </div>
                  <div className="bd-line">
                    <label htmlFor="bd-email">Email</label>
                    <input {...field('email')} type="email" autoComplete="email" inputMode="email" value={data.email} onChange={(e) => set('email', e.target.value)} />
                    {err('email')}
                  </div>
                  <div className="bd-line">
                    <label htmlFor="bd-phone">
                      Phone {data.contact === 'Email' && <span className="bd-optional">Optional</span>}
                    </label>
                    <input {...field('phone')} type="tel" autoComplete="tel" inputMode="tel" value={data.phone} onChange={(e) => set('phone', e.target.value)} />
                    {err('phone')}
                  </div>
                </div>
                <div className="bd-contact">
                  <span className="bd-sublabel" id="bd-contact-label">
                    Preferred contact
                  </span>
                  <div className="bd-contact__options" role="radiogroup" aria-labelledby="bd-contact-label">
                    {CONTACT.map((c) => (
                      <label key={c} className="bd-contact__option">
                        <input type="radio" name="contact" value={c} checked={data.contact === c} onChange={() => set('contact', c)} />
                        <span>{c}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </Part>

              {status === 'error' && (
                <p className="bd-alert" role="alert">
                  Your brief didn’t send. Please try again, or message us on Instagram.
                </p>
              )}

              <div className="bd-submit-row">
                <button type="submit" className="bd-submit" disabled={status === 'sending'} aria-busy={status === 'sending' || undefined}>
                  <span>{status === 'sending' ? 'Sending…' : 'Submit Your Build'}</span>
                  {status !== 'sending' && <ArrowIcon className="bd-submit__icon" />}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function Part({ num, title, children }: { num: string; title: string; children: ReactNode }) {
  return (
    <div className="bd-part">
      <h3 className="bd-part__head">
        <span className="bd-part__num">{num}</span>{' '}
        <span className="bd-part__slash">/</span>{' '}
        <span className="bd-part__title">{title}</span>
      </h3>
      <div className="bd-part__body">{children}</div>
    </div>
  )
}
