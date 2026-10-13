import { useEffect, useState } from 'react'
import { Intro } from '@/components/intro/Intro'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { ServicePage } from '@/components/pages/ServicePage'
import { BuildDesk } from '@/components/sections/BuildDesk'
import { Editorial } from '@/components/sections/Editorial'
import { Faq } from '@/components/sections/Faq'
import { Hero } from '@/components/sections/Hero'
import { InstagramShowcase } from '@/components/sections/InstagramShowcase'
import { Journal } from '@/components/sections/Journal'
import { LocationMap } from '@/components/sections/LocationMap'
import { Philosophy } from '@/components/sections/Philosophy'
import { Projects } from '@/components/sections/Projects'
import { Reviews } from '@/components/sections/Reviews'
import { Showcase } from '@/components/sections/Showcase'
import { findService } from '@/data/services'
import { ScrollTrigger } from '@/lib/gsap'
import { matchRoute, usePathname } from '@/lib/router'

export default function App() {
  const route = matchRoute(usePathname())
  const service = route.name === 'service' ? findService(route.slug) : undefined
  // The cinematic intro belongs to the homepage: a direct service link skips it
  // (main.tsx also drops the html.intro-active class before first paint)
  const [introDone, setIntroDone] = useState(() => matchRoute(location.pathname).name !== 'home')

  // Each navigation lands at the top, or on its #section for homepage links
  useEffect(() => {
    if (!introDone) return
    let raf = requestAnimationFrame(() => {
      raf = requestAnimationFrame(() => {
        // Refresh first: refresh() restores the scroll position it remembered
        // (the previous page's), so scrolling must come after it
        ScrollTrigger.refresh()
        const target = location.hash ? document.querySelector<HTMLElement>(location.hash) : null
        if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' })
        else window.scrollTo({ top: 0, behavior: 'instant' })
        ScrollTrigger.update()
      })
    })
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run per route, not per intro
  }, [route.name, service?.slug])

  return (
    <>
      {!introDone && !service && <Intro onComplete={() => setIntroDone(true)} />}
      <a
        href="#main"
        className="sr-only z-[60] bg-paper px-4 py-3 text-sm text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Header />
      {/* #page goes inert while the mobile menu is open */}
      <div id="page">
        {service ? (
          <ServicePage key={service.slug} service={service} />
        ) : (
          <main id="main">
            <Hero />
            <Showcase />
            <Editorial />
            <BuildDesk />
            <Projects />
            <Philosophy />
            <Reviews />
            <InstagramShowcase />
            <Journal />
            <LocationMap />
            <Faq />
          </main>
        )}
        <Footer />
      </div>
    </>
  )
}
