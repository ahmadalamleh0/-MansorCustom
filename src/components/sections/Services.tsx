import { useRef, useState } from 'react'
import { servicesReveal } from '@/animations/servicesReveal'
import { ComingSoonModal } from '@/components/ui/ComingSoonModal'
import { ServiceCard } from '@/components/ui/ServiceCard'
import { services, type Service } from '@/data/services'
import { useGSAP } from '@/lib/gsap'

export function Services() {
  const scope = useRef<HTMLElement>(null)
  // Demo: every service opens the Coming Soon dialog. Once service pages exist,
  // route to /services/:slug here instead.
  const [active, setActive] = useState<Service | null>(null)

  useGSAP(() => servicesReveal(), { scope })

  return (
    <section
      id="services"
      ref={scope}
      aria-labelledby="services-title"
      className="py-(--section-y)"
    >
      <div className="container-site">
        <header className="flex items-end justify-between gap-6 border-b border-line pb-8 sm:pb-10">
          <h2 id="services-title" className="text-headline font-medium text-paper">
            Services
          </h2>
          <p className="font-mono text-xs text-faint">
            {String(services.length).padStart(2, '0')} services
          </p>
        </header>

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {services.map((service, i) => (
            <li key={service.slug}>
              <ServiceCard service={service} index={i} onExplore={setActive} />
            </li>
          ))}
        </ul>
      </div>

      <ComingSoonModal
        content={
          active && {
            label: active.title,
            message: 'The full service experience is being developed. Check back soon to explore it in detail.',
            dismissLabel: 'Back to services',
          }
        }
        onClose={() => setActive(null)}
      />
    </section>
  )
}
