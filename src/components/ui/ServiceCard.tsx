import type { Service } from '@/data/services'
import { Media } from './Media'
import { ArrowIcon } from './icons'

type ServiceCardProps = {
  service: Service
  index: number
  onExplore: (service: Service) => void
}

/**
 * One service tile. The whole card is clickable through the "Explore Service"
 * button, which is stretched over the card, so there's one accessible control
 * per card. Data attributes are the hooks for future GSAP work:
 *   [data-service-card]  card root (reveal / hover timelines)
 *   [data-card-media]    media frame (parallax / video scrubbing)
 */
export function ServiceCard({ service, index, onExplore }: ServiceCardProps) {
  const number = String(index + 1).padStart(2, '0')

  return (
    <article
      data-service-card
      className="group relative flex h-full flex-col border border-line bg-surface transition-colors duration-500 hover:border-line-strong has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-paper"
    >
      <div data-card-media className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/6]">
        <div className="absolute inset-0 transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.035]">
          <Media
            media={service.media}
            fallback={
              <span
                aria-hidden="true"
                className="absolute bottom-4 left-5 font-display text-[clamp(4rem,10vw,7rem)] leading-none font-semibold tracking-tighter text-white/[0.06]"
              >
                {number}
              </span>
            }
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <span className="font-mono text-xs text-faint">{number}</span>
        <h3 className="text-xl font-medium tracking-tight text-paper sm:text-2xl">{service.title}</h3>
        {service.description && (
          <p className="max-w-[38ch] text-sm leading-relaxed text-muted">{service.description}</p>
        )}

        <button
          type="button"
          onClick={() => onExplore(service)}
          aria-haspopup="dialog"
          className="mt-auto inline-flex items-center gap-2 self-start pt-4 text-sm font-medium text-paper outline-none after:absolute after:inset-0 after:content-['']"
        >
          Explore Service
          <ArrowIcon className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
          <span className="sr-only">: {service.title}</span>
        </button>
      </div>
    </article>
  )
}
