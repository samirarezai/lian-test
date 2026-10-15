import { isRouteErrorResponse, useRevalidator, useRouteError } from 'react-router-dom'
import axios from 'axios'
import { AsyncPage } from '@/components/AsyncPage.tsx'
import { ErrorState } from '@/components/ErrorState/index.tsx'
import { getErrorMessage } from '@/handler/error.ts'
import type { UserLoaderData } from '@/loader/user.loader.ts'
import { BackToUsers } from '@/pages/Users/components/BackToUsers.tsx'
import { UserView } from '@/pages/Users/View.tsx'
import type { UserProfile } from '@/services/types/user.ts'

export default function UserDetailsPage() {
  return (
    <section className="grid gap-5">
      <BackToUsers />
      <AsyncPage<UserLoaderData, UserProfile> resolve={(data) => data.user}>
        {(user) => <UserView user={user} />}
      </AsyncPage>
    </section>
  )
}

function detailsErrorMessage(error: unknown) {
  if (isRouteErrorResponse(error)) return error.statusText || 'This user could not be found.'
  if (axios.isAxiosError(error) && error.response?.status === 404) return 'This user could not be found.'
  return getErrorMessage(error)
}

export function UserDetailsError() {
  const error = useRouteError()
  const { revalidate } = useRevalidator()

  return (
    <section className="grid gap-5" data-testid="user-details-error">
      <BackToUsers />
      <ErrorState title="Could not load user" message={detailsErrorMessage(error)} onRetry={() => revalidate()} />
    </section>
  )
}
