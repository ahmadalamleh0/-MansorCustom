import { useEffect, useId, useMemo, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from 'react'
import { buildDeskReveal, stepIn } from '@/animations/buildDeskReveal'
import { ArrowIcon } from '@/components/ui/icons'
import { MAKES, OTHER_MAKE } from '@/data/makes'
import { services } from '@/data/services'
import { submitBuildRequest, FORM_NAME, type BuildRequest } from '@/lib/buildRequest'
import { useGSAP } from '@/lib/gsap'

const STEPS = ['Your Vehicle', 'Your Build', 'Your Details'] as const
type Step = 0 | 1 | 2
const CONTACT = ['Email', 'Phone call', 'Text message'] as const
const THIS_YEAR = new Date().getFullYear()
const OLDEST_YEAR = 1950
/** Newest first, including next model year */
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

function validateStep(step: Step, d: BuildRequest, m: MakeState): Errors {
  const e: Errors = {}
  if (step === 0) {
    if (!m.picked) e.make = m.query.trim() ? 'Choose a make from the list, or pick Other.' : 'Choose the make.'
    else if (m.picked === OTHER_MAKE && !m.other.trim()) e.makeOther = 'Enter the make.'
    if (!d.model.trim()) e.model = 'Enter the model.'
    if (!d.year) e.year = 'Choose the year.'
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
 * The Build Brief: "Let's talk builds." A three-step order sheet in the black
 * editorial style (no container, hairlines, underlined fields). Only the
 * active step renders: 01 Your Vehicle (searchable make, model, custom year
 * list), 02 Your Build (service rows, notes), 03 Your Details (contact).
 * Continue validates the step; Back keeps everything. A 01/02/03 indicator,
 * steps settle in with a short fade. Posts to Netlify Forms
 * (lib/buildRequest.ts). Animation hooks: [data-bd-reveal], [data-bd-step].
 */
export function BuildDesk() {
  const scope = useRef<HTMLElement>(null)
  const sheet = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState<Step>(0)
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

  const goTo = (to: Step) => {
    setStep(to)
    requestAnimationFrame(() => {
      const el = sheet.current
      if (!el) return
      // Focus before the fade: a hidden element can't take focus
      el.querySelector<HTMLElement>('[data-step-focus]')?.focus({ preventScroll: true })
      // Keep the sheet in view on phones when a step is shorter than the last
      if (el.getBoundingClientRect().top < 0) el.scrollIntoView({ block: 'start', behavior: 'auto' })
      stepIn(el)
    })
  }

  const advance = () => {
    const e = validateStep(step, data, make)
    setErrors(e)
    if (Object.keys(e).length) return focusFirst(e)
    if (step === 0) setData((d) => ({ ...d, make: finalMake(make) }))
    goTo((step + 1) as Step)
  }

  const submit = async (ev: FormEvent) => {
    ev.preventDefault()
    if (step < 2) return advance()
    // Earlier steps are re-checked (e.g. after Back) before sending
    for (const s of [0, 1] as const) {
      const e = validateStep(s, data, make)
      if (Object.keys(e).length) {
        setErrors(e)
        return goTo(s)
      }
    }
    const e = validateStep(2, data, make)
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

  const vehicle = [data.year, finalMake(make), data.model].filter(Boolean).join(' ')

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
                We have your {vehicle} and will be in touch by {data.contact.toLowerCase()}.
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

              <ol className="bd-steps" aria-label="Progress">
                {STEPS.map((_, i) => (
                  <li key={i} className={`bd-steps__item${i === step ? ' is-on' : i < step ? ' is-done' : ''}`} aria-current={i === step ? 'step' : undefined}>
                    <span className="bd-steps__num">0{i + 1}</span>
                  </li>
                ))}
              </ol>

              <div data-bd-step className="bd-step">
                {step === 0 && (
                  <StepHead num="01" title={STEPS[0]}>
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
                      <YearSelect value={data.year} error={errors.year} onChange={(y) => set('year', y)} />
                    </div>
                  </StepHead>
                )}

                {step === 1 && (
                  <StepHead num="02" title={STEPS[1]}>
                    <fieldset className="bd-services">
                      <legend className="bd-sublabel">Services · {vehicle}</legend>
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
                  </StepHead>
                )}

                {step === 2 && (
                  <StepHead num="03" title={STEPS[2]}>
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
                {step > 0 && (
                  <button type="button" className="bd-back" onClick={() => goTo((step - 1) as Step)} disabled={status === 'sending'}>
                    <ArrowIcon className="bd-back__icon" />
                    Back
                  </button>
                )}
                <button type="submit" className="bd-submit" disabled={status === 'sending'} aria-busy={status === 'sending' || undefined}>
                  <span>{step < 2 ? 'Continue' : status === 'sending' ? 'Sending…' : 'Submit Your Build'}</span>
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
              onMouseMove={() => setActive(i)}
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

/**
 * Year: a custom select-only combobox (ARIA APG pattern) in the sheet's
 * style. A compact scrollable list (newest first) that fades open; arrows,
 * Home/End, Page Up/Down and typed digits move, Enter/Space choose,
 * Escape/Tab close. Touch: tap to open, tap a year.
 */
function YearSelect({ value, error, onChange }: { value: string; error?: string; onChange: (y: string) => void }) {
  const id = useId()
  const btn = useRef<HTMLDivElement>(null)
  const list = useRef<HTMLUListElement>(null)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(() => Math.max(0, YEARS.indexOf(value)))
  const typed = useRef({ text: '', at: 0 })

  // Keep the active year in view while the list is open
  useEffect(() => {
    if (!open) return
    list.current?.querySelector<HTMLElement>(`[data-i="${active}"]`)?.scrollIntoView({ block: 'nearest' })
  }, [open, active])

  const openList = () => {
    setActive(value ? YEARS.indexOf(value) : 0)
    setOpen(true)
  }
  const choose = (i: number) => {
    onChange(YEARS[i])
    setOpen(false)
  }

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const move = (to: number) => {
      e.preventDefault()
      if (!open) return openList()
      setActive(Math.max(0, Math.min(YEARS.length - 1, to)))
    }
    if (e.key === 'ArrowDown') move(active + 1)
    else if (e.key === 'ArrowUp') move(active - 1)
    else if (e.key === 'PageDown') move(active + 6)
    else if (e.key === 'PageUp') move(active - 6)
    else if (e.key === 'Home') move(0)
    else if (e.key === 'End') move(YEARS.length - 1)
    else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (open) choose(active)
      else openList()
    } else if (e.key === 'Escape') setOpen(false)
    else if (e.key === 'Tab' && open) choose(active)
    else if (/^\d$/.test(e.key)) {
      // Type-ahead: "2", "20", "201", "2018" jump to the first match
      const now = Date.now()
      const text = (now - typed.current.at < 900 ? typed.current.text : '') + e.key
      typed.current = { text, at: now }
      const i = YEARS.findIndex((y) => y.startsWith(text))
      if (i >= 0) {
        if (!open) setOpen(true)
        setActive(i)
      }
    }
  }

  return (
    <div className="bd-line bd-line--year bd-yearsel">
      <span className="bd-label" id={`${id}-label`}>
        Year
      </span>
      <div
        ref={btn}
        id="bd-year"
        role="combobox"
        tabIndex={0}
        data-field="year"
        aria-labelledby={`${id}-label ${id}-value`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-activedescendant={open ? `${id}-y-${active}` : undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? 'bd-year-error' : undefined}
        className="bd-yearsel__button"
        data-empty={!value || undefined}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKey}
        onBlur={(e) => {
          if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) setOpen(false)
        }}
      >
        <span id={`${id}-value`}>{value || 'Select'}</span>
        <span aria-hidden="true" className="bd-yearsel__chevron" />
      </div>
      <ul ref={list} id={`${id}-list`} role="listbox" aria-labelledby={`${id}-label`} className="bd-yearsel__list" data-open={open || undefined}>
        {YEARS.map((y, i) => (
          <li
            key={y}
            id={`${id}-y-${i}`}
            data-i={i}
            role="option"
            aria-selected={y === value}
            className={`bd-yearsel__opt${i === active ? ' is-active' : ''}`}
            onMouseDown={(e) => {
              e.preventDefault()
              choose(i)
              btn.current?.focus()
            }}
            onMouseMove={() => setActive(i)}
          >
            {y}
          </li>
        ))}
      </ul>
      {error && (
        <p id="bd-year-error" className="bd-error">
          {error}
        </p>
      )}
    </div>
  )
}
