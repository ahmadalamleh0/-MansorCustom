import { useRef } from 'react'
import { instagramReveal } from '@/animations/instagramReveal'
import { Wordmark } from '@/components/brand/Wordmark'
import { ReelsIcon } from '@/components/ui/icons'
import { ReelCard } from '@/components/ui/ReelCard'
import { site } from '@/data/site'
import { useInstagramReels } from '@/hooks/useInstagramReels'
import { useGSAP } from '@/lib/gsap'

const SLOTS = [0, 1, 2]

/**
 * Instagram showcase (Venuum reference): a left-aligned profile (gradient
 * ring avatar, handle, two buttons), then three tall 9:16 Reels that keep
 * their three-column composition on phones.
 *
 * Reels come live from the official Instagram API via /api/instagram-reels
 * (synced hourly; docs/INSTAGRAM.md). Until the account is connected, the
 * slots honestly point to the Reels tab instead of showing placeholders.
 * Animation hooks: [data-ig-profile], [data-ig-panel] (the stable slots, so
 * the reveal survives the loading → Reels swap).
 */
export function InstagramShowcase() {
  const scope = useRef<HTMLElement>(null)
  const ig = site.instagram
  const feed = useInstagramReels()

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

      <ul className="instagram__gallery" aria-label="Latest Reels" aria-busy={feed.status === 'loading'} data-feed={feed.status}>
        {SLOTS.map((slot) => {
          const reel = feed.reels[slot]
          return (
            <li key={slot} data-ig-panel className="instagram__panel">
              {reel ? (
                <ReelCard key={reel.id} reel={reel} index={slot} total={feed.reels.length} />
              ) : feed.status === 'unavailable' ? (
                <a href={ig.reelsUrl} target="_blank" rel="noopener noreferrer" className="instagram__pending">
                  <ReelsIcon className="instagram__pending-icon" />
                  {slot === 1 && <span className="instagram__pending-label">Watch Reels</span>}
                  <span className="sr-only">{slot === 1 ? ' on Instagram (opens in a new tab)' : 'Watch Reels on Instagram (opens in a new tab)'}</span>
                </a>
              ) : null}
            </li>
          )
        })}
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
