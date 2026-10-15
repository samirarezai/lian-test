import { api } from '@/services/api.ts'
import { apiUrls } from '@/constants/apiUrls.ts'
import type { ApiUser, DashboardUser } from '@/services/types/user.ts'

function isApiUser(value: unknown): value is ApiUser {
  if (!value || typeof value !== 'object') return false

  const user = value as Partial<ApiUser>
  return (
    typeof user.id === 'number' &&
    typeof user.name === 'string' &&
    typeof user.email === 'string' &&
    typeof user.company?.name === 'string'
  )
}

function toDashboardUser(user: ApiUser): DashboardUser {
  return {
    id: String(user.id),
    name: user.name,
    email: user.email,
    companyName: user.company.name,
    source: 'api',
  }
}

export const userAPI = {
  getUsers: async (): Promise<DashboardUser[]> => {
    const response = await api.get<unknown>(apiUrls.users)
    if (!Array.isArray(response.data)) {
      throw new Error('Unexpected users response')
    }

    return response.data.filter(isApiUser).map(toDashboardUser)
  },
} as const
