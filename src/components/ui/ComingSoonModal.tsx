import { useEffect, useId, useRef } from 'react'
import { useScrollLock } from '@/hooks/useScrollLock'
import { CloseIcon } from './icons'

export type ComingSoonContent = {
  /** Small label above the title, e.g. the service name */
  label: string
  message: string
  dismissLabel: string
}

type ComingSoonModalProps = {
  content: ComingSoonContent | null
  onClose: () => void
}

/**
 * Demo stand-in for features that aren't live yet (service pages, booking).
 * Built on the native <dialog>, which provides the focus trap, Escape-to-close,
 * top-layer stacking and an inert background. Focus returns to the trigger
 * on close.
 */
export function ComingSoonModal({ content, onClose }: ComingSoonModalProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const id = useId()
  const open = content !== null
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
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-desc`}
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

        <p className="eyebrow">{content?.label}</p>
        <h2 id={`${id}-title`} className="mt-6 text-headline font-medium">
          Coming Soon
        </h2>
        <p id={`${id}-desc`} className="mt-5 max-w-[40ch] text-base leading-relaxed text-muted">
          {content?.message}
        </p>

        <button
          type="button"
          onClick={() => ref.current?.close()}
          className="mt-10 inline-flex h-12 items-center border border-line-strong px-6 text-sm font-medium transition-colors hover:bg-paper hover:text-ink"
        >
          {content?.dismissLabel}
        </button>
      </div>
    </dialog>
  )
}
