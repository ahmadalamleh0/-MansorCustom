import { useRef } from 'react'
import { projectsReveal } from '@/animations/projectsReveal'
import { CollectionStrip } from '@/components/ui/Collection'
import { projects } from '@/data/projects'
import { useGSAP } from '@/lib/gsap'

/** Headline words: stacked on phones/tablets, one line from 1280px (as "Beyond Factory.") */
const TITLE = ['Recent', 'Work']

/**
 * Selected Projects (VOIR PPF reference): Mansor builds in the shared
 * collection strip (components/ui/Collection.tsx) with its default video
 * playback. Animation hooks: [data-project] (entrance stagger).
 */
export function Projects() {
  const scope = useRef<HTMLElement>(null)

  useGSAP(() => projectsReveal(), { scope })

  return (
    <section ref={scope} id="projects" aria-labelledby="projects-title" className="projects">
      <div className="container-site">
        <h2 id="projects-title" data-projects-title className="brand-headline projects__title">
          {TITLE.map((word, i) => (
            <span key={word} className="brand-headline__word">
              {word}
              {i < TITLE.length - 1 && ' '}
            </span>
          ))}
        </h2>
      </div>

      <CollectionStrip id="projects-track" label="Recent work, scroll horizontally" noun="project" items={projects} />
    </section>
  )
}
