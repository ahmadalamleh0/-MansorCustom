import { useState } from 'react'
import { Intro } from '@/components/intro/Intro'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'

export default function App() {
  const [introDone, setIntroDone] = useState(false)

  return (
    <>
      {!introDone && <Intro onComplete={() => setIntroDone(true)} />}
      <a
        href="#main"
        className="sr-only z-[60] bg-paper px-4 py-3 text-sm text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Header />
      {/* #page goes inert while the mobile menu is open */}
      <div id="page">
        <main id="main">
          <Hero />
          <Services />
        </main>
        <Footer />
      </div>
    </>
  )
}
