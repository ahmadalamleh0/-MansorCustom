import { useRef } from 'react'
import { instagramReveal } from '@/animations/instagramReveal'
import { Wordmark } from '@/components/brand/Wordmark'
import { Media } from '@/components/ui/Media'
import { site } from '@/data/site'
import { useGSAP } from '@/lib/gsap'

/**
 * Instagram showcase (Venuum reference): a left-aligned profile (gradient
 * ring avatar, handle, two buttons), then three tall photo panels that keep
 * their three-column composition on phones. A curated gallery linking to
 * Instagram, not a live embed, for a consistent layout and performance.
 * Animation hooks: [data-ig-profile], [data-ig-panel].
 */
export function InstagramShowcase() {
  const scope = useRef<HTMLElement>(null)
  const ig = site.instagram

  useGSAP(() => instagramReveal(), { scope })

  return (
    <section ref={scope} id="instagram" aria-labelledby="instagram-title" className="instagram">
      <div className="container-site">
        <div data-ig-profile className="instagram__profile">
          <a href={ig.profileUrl} target="_blank" rel="noopener noreferrer" className="instagram__avatar" aria-label={`@${ig.handle} on Instagram`}>
            <span className="instagram__avatar-inner">
              <Wordmark className="wordmark--avatar" />
            </span>
          </a>

          <h2 id="instagram-title" className="instagram__handle">
            @{ig.handle}
            {ig.verified && <VerifiedBadge />}
          </h2>

          <p className="instagram__meta">
            {ig.followers ? `${ig.followers} followers` : 'Our latest builds on Instagram'}
          </p>

          <div className="instagram__actions">
            <a href={ig.profileUrl} target="_blank" rel="noopener noreferrer" className="ig-btn ig-btn--primary">
              View Instagram
            </a>
            <a href={ig.messageUrl} target="_blank" rel="noopener noreferrer" className="ig-btn ig-btn--secondary">
              Send Message
            </a>
          </div>
        </div>
      </div>

      <ul className="instagram__gallery" aria-label="Recent work on Instagram">
        {ig.posts.map((post) => (
          <li key={post.id}>
            <a data-ig-panel href={post.url ?? ig.profileUrl} target="_blank" rel="noopener noreferrer" className="instagram__panel">
              <span className="instagram__panel-media">
                <Media media={post.media} />
              </span>
              <span className="sr-only">View on Instagram (opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

function VerifiedBadge() {
  return (
    <svg viewBox="0 0 24 24" aria-label="Verified" role="img" className="instagram__badge">
      <circle cx="12" cy="12" r="11" fill="#3b82f6" />
      <path d="M7.5 12.3l3 3 6-6.3" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
