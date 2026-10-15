import { useEffect, useId, useRef, type ReactNode } from 'react'

type ModalProps = {
  open: boolean
  title: string
  description?: string
  onClose: () => void
  children: ReactNode
}

export function Modal({ open, title, description, onClose, children }: ModalProps) {
  const titleId = useId()
  const descriptionId = useId()
  const dialogRef = useRef<HTMLDivElement>(null)
  const onCloseRef = useRef(onClose)
  const previouslyFocused = useRef<HTMLElement | null>(null)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    if (!open) return

    previouslyFocused.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCloseRef.current()
    }

    window.addEventListener('keydown', onKeyDown)
    dialogRef.current?.querySelector<HTMLElement>('input, button, select, textarea')?.focus()

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', onKeyDown)
      previouslyFocused.current?.focus()
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 grid place-items-end p-0 sm:place-items-center sm:p-4">
      <button type="button" aria-label="Close dialog" className="absolute inset-0 bg-slate-950/50" onClick={onClose} />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        className="relative z-10 max-h-[92svh] w-full overflow-auto rounded-t-2xl border border-slate-200 bg-white p-5 shadow-xl sm:max-w-md sm:rounded-2xl dark:border-zinc-700 dark:bg-zinc-900"
      >
        <h2 id={titleId} className="text-lg font-semibold text-slate-950 dark:text-white">
          {title}
        </h2>
        {description && (
          <p id={descriptionId} className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
            {description}
          </p>
        )}
        <div className="mt-5">{children}</div>
      </div>
    </div>
  )
}
