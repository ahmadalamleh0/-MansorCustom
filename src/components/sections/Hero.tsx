import { useRef } from 'react'
import { heroIntro } from '@/animations/heroIntro'
import { Media } from '@/components/ui/Media'
import { ArrowIcon } from '@/components/ui/icons'
import { site } from '@/data/site'
import { useGSAP } from '@/lib/gsap'
import { handleAnchorClick } from '@/lib/scroll'

/**
 * Full-viewport hero. Layer structure, ready for the cinematic treatment:
 *   [data-hero-media]    media layer (image / video / scroll-scrubbed sequence)
 *   [data-hero-overlay]  legibility scrim, tuned once media exists
 *   [data-hero-content]  copy; heading lines are masked for line reveals
 */
export function Hero() {
  const scope = useRef<HTMLElement>(null)
  const { hero } = site
  const [firstWord, ...rest] = hero.heading.split(' ')

  useGSAP(() => heroIntro(), { scope })

  return (
    <section
      id="top"
      ref={scope}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh flex-col overflow-hidden"
    >
      <div data-hero-media className="absolute inset-0 -z-20">
        {/* PLACEHOLDER: hero imagery/video pending creative direction */}
        <Media priority className="bg-ink" />
      </div>
      <div data-hero-overlay aria-hidden="true" className="absolute inset-0 -z-10" />

      <div
        data-hero-content
        className="container-site flex flex-1 flex-col justify-end pt-[calc(var(--header-h)+3rem)] pb-[clamp(3rem,2rem+5vw,7rem)]"
      >
        <p data-hero-fade className="eyebrow">
          {hero.eyebrow}
        </p>

        <h1
          id="hero-title"
          className="mt-6 font-display text-display font-semibold text-paper sm:mt-8"
        >
          {[firstWord, rest.join(' ')].map((line) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <span data-hero-line className="block">
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-10 flex flex-col gap-8 border-t border-line pt-8 sm:mt-14 md:flex-row md:items-end md:justify-between">
          <p data-hero-fade className="max-w-[44ch] text-lede text-muted">
            {hero.lede}
          </p>
          <a
            data-hero-fade
            href={hero.cta.href}
            onClick={handleAnchorClick}
            className="group inline-flex h-14 shrink-0 items-center justify-between gap-6 self-start bg-paper px-7 text-sm font-medium text-ink transition-colors duration-300 hover:bg-white md:self-auto"
          >
            {hero.cta.label}
            <ArrowIcon className="size-4 rotate-90 transition-transform duration-500 ease-out-expo group-hover:translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  )
}
