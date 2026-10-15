import { queryClient } from '@/helpers/query/index.ts'
import { queryClientKeys } from '@/helpers/query/queryClientKeys.ts'
import { userAPI } from '@/services/user.ts'
import type { UserProfile } from '@/services/types/user.ts'

export type UserLoaderData = {
  user: Promise<UserProfile>
}

export function getUserLoader(userId: string | undefined): UserLoaderData {
  if (!userId) throw new Error('This user could not be found.')

  return {
    user: queryClient.fetchQuery({
      queryKey: [queryClientKeys.USER, userId],
      queryFn: () => userAPI.getUser(userId),
      staleTime: 0,
    }),
  }
}
