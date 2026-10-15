export function Loading({ label = 'Loading users' }: { label?: string }) {
  return (
    <div role="status" aria-live="polite" className="grid gap-3" aria-label={label}>
      {Array.from({ length: 6 }, (_, index) => (
        <div key={index} className="h-[4.5rem] animate-pulse rounded-xl bg-slate-200 dark:bg-zinc-800" />
      ))}
    </div>
  )
}
