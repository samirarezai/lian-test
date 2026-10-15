import { Suspense, type ReactNode } from 'react'
import { Await, useLoaderData } from 'react-router-dom'
import { Loading } from '@/components/Loading/index.tsx'

type AsyncPageProps<TData, TResolved> = {
  resolve: (data: TData) => Promise<TResolved>
  children: (value: TResolved) => ReactNode
}

export function AsyncPage<TData, TResolved>({ resolve, children }: AsyncPageProps<TData, TResolved>) {
  const data = useLoaderData() as TData

  return (
    <Suspense fallback={<Loading label="Loading user" />}>
      <Await resolve={resolve(data)}>{children}</Await>
    </Suspense>
  )
}
