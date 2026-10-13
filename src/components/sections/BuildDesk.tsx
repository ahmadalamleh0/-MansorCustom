import { useId, useMemo, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from 'react'
import { buildDeskReveal, stepIn } from '@/animations/buildDeskReveal'
import { ArrowIcon } from '@/components/ui/icons'
import { MAKES, OTHER_MAKE } from '@/data/makes'
import { services } from '@/data/services'
import { submitBuildRequest, FORM_NAME, type BuildRequest } from '@/lib/buildRequest'
import { useGSAP } from '@/lib/gsap'

const CONTACT = ['Email', 'Phone call', 'Text message'] as const
const THIS_YEAR = new Date().getFullYear()
const OLDEST_YEAR = 1950
const YEARS = Array.from({ length: THIS_YEAR + 1 - OLDEST_YEAR + 1 }, (_, i) => String(THIS_YEAR + 1 - i))

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

type Errors = Partial<Record<keyof BuildRequest | 'makeOther', string>>
/** What the Make field holds: a listed make, "Other" (+ free text), or nothing chosen yet */
type MakeState = { query: string; picked: string | null; other: string }

function finalMake(m: MakeState) {
  return m.picked === OTHER_MAKE ? m.other.trim() : (m.picked ?? '')
}

function validateVehicle(d: BuildRequest, m: MakeState): Errors {
  const e: Errors = {}
  if (!m.picked) e.make = m.query.trim() ? 'Choose a make from the list, or pick Other.' : 'Choose the make.'
  else if (m.picked === OTHER_MAKE && !m.other.trim()) e.makeOther = 'Enter the make.'
  if (!d.model.trim()) e.model = 'Enter the model.'
  if (!d.year) e.year = 'Choose the year.'
  return e
}

function validateBuild(d: BuildRequest): Errors {
  const e: Errors = {}
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
 * The Build Brief: "Let's talk builds." A two-step order sheet in the black
 * editorial style (no container, hairlines, underlined fields). Step 01:
 * the vehicle (searchable make, model, year). Step 02: the build (service
 * rows, notes, contact). A small 01/02 indicator, Continue and Back keep
 * everything entered; steps validate before moving on and settle in with a
 * short fade. Posts to Netlify Forms (lib/buildRequest.ts).
 * Animation hooks: [data-bd-reveal], [data-bd-step].
 */
export function BuildDesk() {
  const scope = useRef<HTMLElement>(null)
  const sheet = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState<0 | 1>(0)
  const [data, setData] = useState<BuildRequest>(EMPTY)
  const [make, setMake] = useState<MakeState>({ query: '', picked: null, other: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  useGSAP(() => buildDeskReveal(), { scope })

  const set = <K extends keyof BuildRequest>(k: K, v: BuildRequest[K]) => {
    setData((d) => ({ ...d, [k]: v }))
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }))
  }

  const focusFirst = (e: Errors) => {
    const first = Object.keys(e)[0]
    if (first) sheet.current?.querySelector<HTMLElement>(`[data-field="${first}"]`)?.focus()
  }

  const goTo = (to: 0 | 1) => {
    setStep(to)
    requestAnimationFrame(() => {
      const el = sheet.current
      if (!el) return
      // Focus before the fade: a visibility-hidden element can't take focus
      el.querySelector<HTMLElement>('[data-step-focus]')?.focus({ preventScroll: true })
      // Keep the sheet in view on phones, where step 02 starts lower
      if (el.getBoundingClientRect().top < 0) el.scrollIntoView({ block: 'start', behavior: 'auto' })
      stepIn(el)
    })
  }

  const next = () => {
    const e = validateVehicle(data, make)
    setErrors(e)
    if (Object.keys(e).length) return focusFirst(e)
    setData((d) => ({ ...d, make: finalMake(make) }))
    goTo(1)
  }

  const submit = async (ev: FormEvent) => {
    ev.preventDefault()
    if (step === 0) return next()
    const ve = validateVehicle(data, make)
    if (Object.keys(ve).length) {
      setErrors(ve)
      goTo(0)
      return
    }
    const e = validateBuild(data)
    setErrors(e)
    if (Object.keys(e).length) return focusFirst(e)
    setStatus('sending')
    try {
      await submitBuildRequest({ ...data, make: finalMake(make) })
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  const field = (k: keyof BuildRequest) => ({
    id: `bd-${k}`,
    name: k,
    'data-field': k,
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': errors[k] ? `bd-${k}-error` : undefined,
  })
  const err = (k: keyof Errors) =>
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
            Let’s talk builds.
          </h2>
          <p data-bd-reveal className="build-brief__lede">
            Tell us what you drive and what you have in mind.
          </p>
        </header>

        <div data-bd-reveal ref={sheet} className="build-brief__sheet">
          {status === 'sent' ? (
            <div className="bd-done" role="status">
              <p className="bd-part__num">Brief received</p>
              <p className="bd-done__title">Thank you, {data.name.trim().split(/\s+/)[0]}.</p>
              <p className="bd-done__text">
                We have your {data.year} {finalMake(make)} {data.model} and will be in touch by {data.contact.toLowerCase()}.
              </p>
            </div>
          ) : (
            <form name={FORM_NAME} noValidate onSubmit={submit} aria-label="Request a quote">
              {/* Honeypot (Netlify): hidden from people and assistive tech */}
              <p className="sr-only" aria-hidden="true">
                <label>
                  Leave this empty <input name="bot-field" tabIndex={-1} autoComplete="off" value={data['bot-field']} onChange={(e) => set('bot-field', e.target.value)} />
                </label>
              </p>

              <div className="bd-steps" aria-hidden="true">
                <span className={`bd-steps__item${step === 0 ? ' is-on' : ''}`}>
                  <span className="bd-steps__num">01</span> Vehicle
                </span>
                <span className="bd-steps__track">
                  <span className="bd-steps__fill" style={{ transform: `scaleX(${step === 0 ? 0 : 1})` }} />
                </span>
                <span className={`bd-steps__item${step === 1 ? ' is-on' : ''}`}>
                  <span className="bd-steps__num">02</span> Build
                </span>
              </div>

              <div data-bd-step className="bd-step">
                {step === 0 ? (
                  <StepHead num="01" title="Your Vehicle">
                    <div className="bd-row bd-row--vehicle">
                      <MakeCombobox
                        state={make}
                        error={errors.make}
                        onChange={(m) => {
                          setMake(m)
                          if (errors.make || errors.makeOther) setErrors((e) => ({ ...e, make: undefined, makeOther: undefined }))
                        }}
                      />
                      {make.picked === OTHER_MAKE && (
                        <div className="bd-line">
                          <label htmlFor="bd-makeOther">Your make</label>
                          <input
                            id="bd-makeOther"
                            data-field="makeOther"
                            autoComplete="off"
                            aria-invalid={errors.makeOther ? true : undefined}
                            aria-describedby={errors.makeOther ? 'bd-makeOther-error' : undefined}
                            value={make.other}
                            onChange={(e) => {
                              setMake((m) => ({ ...m, other: e.target.value }))
                              if (errors.makeOther) setErrors((x) => ({ ...x, makeOther: undefined }))
                            }}
                          />
                          {err('makeOther')}
                        </div>
                      )}
                      <div className="bd-line">
                        <label htmlFor="bd-model">Model</label>
                        <input {...field('model')} autoComplete="off" placeholder="Aventador S" value={data.model} onChange={(e) => set('model', e.target.value)} />
                        {err('model')}
                      </div>
                      <div className="bd-line bd-line--year">
                        <label htmlFor="bd-year">Year</label>
                        <span className="bd-select">
                          <select {...field('year')} value={data.year} onChange={(e) => set('year', e.target.value)}>
                            <option value="">Select</option>
                            {YEARS.map((y) => (
                              <option key={y} value={y}>
                                {y}
                              </option>
                            ))}
                          </select>
                        </span>
                        {err('year')}
                      </div>
                    </div>
                  </StepHead>
                ) : (
                  <StepHead num="02" title="Your Build">
                    <fieldset className="bd-services">
                      <legend className="bd-sublabel">
                        Services · {data.year} {data.make} {data.model}
                      </legend>
                      <ul className="bd-service-list" role="radiogroup" aria-label="Service">
                        {services.map((s, i) => (
                          <li key={s.slug}>
                            <label className="bd-service">
                              <input type="radio" name="service" value={s.title} data-field={i === 0 ? 'service' : undefined} checked={data.service === s.title} onChange={() => set('service', s.title)} />
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
                      <textarea {...field('details')} rows={2} placeholder="Colours, finishes, references, timing" value={data.details} onChange={(e) => set('details', e.target.value)} />
                    </div>

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
                  </StepHead>
                )}
              </div>

              {status === 'error' && (
                <p className="bd-alert" role="alert">
                  Your brief didn’t send. Please try again, or message us on Instagram.
                </p>
              )}

              <div className="bd-submit-row">
                {step === 1 && (
                  <button type="button" className="bd-back" onClick={() => goTo(0)} disabled={status === 'sending'}>
                    <ArrowIcon className="bd-back__icon" />
                    Back
                  </button>
                )}
                <button type="submit" className="bd-submit" disabled={status === 'sending'} aria-busy={status === 'sending' || undefined}>
                  <span>{step === 0 ? 'Continue to your build' : status === 'sending' ? 'Sending…' : 'Submit Your Build'}</span>
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

function StepHead({ num, title, children }: { num: string; title: string; children: ReactNode }) {
  return (
    <div className="bd-part">
      <h3 className="bd-part__head" tabIndex={-1} data-step-focus>
        <span className="bd-part__num">{num}</span> <span className="bd-part__slash">/</span> <span className="bd-part__title">{title}</span>
      </h3>
      <div className="bd-part__body">{children}</div>
    </div>
  )
}

/**
 * Searchable make (ARIA 1.2 combobox): type to filter, arrows to move,
 * Enter to choose, Escape to close. "Other" is always offered last.
 */
function MakeCombobox({ state, error, onChange }: { state: MakeState; error?: string; onChange: (m: MakeState) => void }) {
  const id = useId()
  const listId = `${id}-list`
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const options = useMemo(() => {
    const q = state.query.trim().toLowerCase()
    const hits = q ? MAKES.filter((m) => m.toLowerCase().includes(q)).sort((a, b) => Number(!a.toLowerCase().startsWith(q)) - Number(!b.toLowerCase().startsWith(q))) : [...MAKES]
    return [...hits, OTHER_MAKE]
  }, [state.query])

  const choose = (value: string) => {
    onChange({ ...state, picked: value, query: value })
    setOpen(false)
  }

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (!open) setOpen(true)
      setActive((a) => Math.min(a + 1, options.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter' && open) {
      e.preventDefault()
      choose(options[active])
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <div className="bd-line bd-combo">
      <label htmlFor={`${id}-input`}>Make</label>
      <input
        id={`${id}-input`}
        name="make"
        data-field="make"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={open ? `${id}-opt-${active}` : undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? 'bd-make-error' : undefined}
        autoComplete="off"
        placeholder="Search makes"
        value={state.query}
        onChange={(e) => {
          const q = e.target.value
          const exact = MAKES.find((m) => m.toLowerCase() === q.trim().toLowerCase()) ?? null
          onChange({ ...state, query: q, picked: exact })
          setOpen(true)
          setActive(0)
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => {
          setOpen(false)
          // Tidy a typed match to its proper name ("lamborghini" → "Lamborghini")
          if (state.picked && state.picked !== OTHER_MAKE && state.query !== state.picked) onChange({ ...state, query: state.picked })
        }}
        onKeyDown={onKey}
      />
      <span aria-hidden="true" className="bd-combo__chevron" />
      {open && (
        <ul id={listId} role="listbox" className="bd-combo__list" aria-label="Makes">
          {options.map((m, i) => (
            <li
              key={m}
              id={`${id}-opt-${i}`}
              role="option"
              aria-selected={i === active}
              className={`bd-combo__opt${m === OTHER_MAKE ? ' bd-combo__opt--other' : ''}`}
              // mousedown, not click: fires before the input's blur closes the list
              onMouseDown={(e) => {
                e.preventDefault()
                choose(m)
              }}
              onMouseEnter={() => setActive(i)}
            >
              {m}
            </li>
          ))}
        </ul>
      )}
      {error && (
        <p id="bd-make-error" className="bd-error">
          {error}
        </p>
      )}
    </div>
  )
}
