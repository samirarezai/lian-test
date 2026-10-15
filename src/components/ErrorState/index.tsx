import { Button } from '@/components/Button/index.tsx'

type ErrorStateProps = {
  message: string
  onRetry: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div role="alert" className="rounded-2xl border border-rose-200 bg-rose-50 px-6 py-10 text-center dark:border-rose-900/70 dark:bg-rose-950/40">
      <h2 className="text-base font-semibold text-rose-900 dark:text-rose-100">Could not load users</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-rose-700 dark:text-rose-200">{message}</p>
      <div className="mt-5 flex justify-center">
        <Button variant="secondary" onClick={onRetry}>
          Try again
        </Button>
      </div>
    </div>
  )
}
