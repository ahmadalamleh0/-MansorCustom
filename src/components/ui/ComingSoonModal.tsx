import { useEffect, useRef } from 'react'
import type { Service } from '@/data/services'
import { useScrollLock } from '@/hooks/useScrollLock'
import { CloseIcon } from './icons'

type ComingSoonModalProps = {
  service: Service | null
  onClose: () => void
}

/**
 * Demo stand-in for the dedicated service pages. Built on the native <dialog>,
 * which provides the focus trap, Escape-to-close, top-layer stacking and an
 * inert background. Focus goes back to the triggering card on close.
 */
export function ComingSoonModal({ service, onClose }: ComingSoonModalProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const open = service !== null
  useScrollLock(open)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-labelledby="coming-soon-title"
      aria-describedby="coming-soon-desc"
      onClose={onClose}
      // Clicks on the backdrop land on the <dialog> itself; the panel absorbs the rest
      onClick={(e) => e.target === e.currentTarget && ref.current?.close()}
      className="coming-soon m-auto w-[calc(100%-2*var(--gutter))] max-w-xl bg-transparent p-0 text-paper"
    >
      <div className="relative border border-line-strong bg-surface p-8 sm:p-12">
        <button
          type="button"
          onClick={() => ref.current?.close()}
          aria-label="Close"
          className="absolute top-3 right-3 grid size-11 place-items-center text-muted transition-colors hover:text-paper"
        >
          <CloseIcon className="size-4" />
        </button>

        <p className="eyebrow">{service?.title}</p>
        <h2 id="coming-soon-title" className="mt-6 text-headline font-medium">
          Coming Soon
        </h2>
        <p id="coming-soon-desc" className="mt-5 max-w-[40ch] text-base leading-relaxed text-muted">
          The full service experience is being developed. Check back soon to explore it in detail.
        </p>

        <button
          type="button"
          onClick={() => ref.current?.close()}
          className="mt-10 inline-flex h-12 items-center border border-line-strong px-6 text-sm font-medium transition-colors hover:bg-paper hover:text-ink"
        >
          Back to services
        </button>
      </div>
    </dialog>
  )
}
