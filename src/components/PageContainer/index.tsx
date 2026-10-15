import type { ReactNode } from 'react'

type PageContainerProps = {
  title: string
  description: string
  actions?: ReactNode
  children: ReactNode
}

export function PageContainer({ title, description, actions, children }: PageContainerProps) {
  return (
    <section className="grid gap-5">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl dark:text-white">{title}</h1>
          <p className="mt-1 max-w-2xl text-sm text-slate-500 dark:text-zinc-400">{description}</p>
        </div>
        {actions}
      </header>
      {children}
    </section>
  )
}
