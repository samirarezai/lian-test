import { api } from '@/services/api.ts'
import { apiUrls } from '@/constants/apiUrls.ts'
import { storageKeys } from '@/constants/storage.ts'
import { readStorage } from '@/helpers/storage.ts'
import { parseDeletedIds, parseLocalUsers } from '@/handler/users.ts'
import type { ApiUser, DashboardUser, UserProfile } from '@/services/types/user.ts'

const emptyUsers: DashboardUser[] = []
const emptyIds: string[] = []

export class UserNotFoundError extends Error {
  constructor() {
    super('This user could not be found.')
    this.name = 'UserNotFoundError'
  }
}

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

function formatAddress(address: ApiUser['address']): string {
  if (!address) return ''
  return [address.street, address.suite, address.city, address.zipcode].filter(Boolean).join(', ')
}

function toProfile(user: ApiUser): UserProfile {
  return {
    id: String(user.id),
    name: user.name,
    username: user.username ?? '',
    email: user.email,
    phone: user.phone ?? '',
    address: formatAddress(user.address),
    companyName: user.company.name,
    source: 'api',
  }
}

function assertVisible(id: string) {
  const deletedIds = readStorage(storageKeys.deletedUserIds, emptyIds, parseDeletedIds)
  if (deletedIds.includes(id)) throw new UserNotFoundError()
}

function readLocalProfile(id: string): UserProfile {
  assertVisible(id)
  const users = readStorage(storageKeys.localUsers, emptyUsers, parseLocalUsers)
  const user = users.find((item) => item.id === id)
  if (!user) throw new UserNotFoundError()

  return {
    id: user.id,
    name: user.name,
    username: '',
    email: user.email,
    phone: '',
    address: '',
    companyName: user.companyName,
    source: 'local',
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
  getUser: async (userId: string): Promise<UserProfile> => {
    if (userId.startsWith('local-')) return readLocalProfile(userId)

    assertVisible(userId)
    const response = await api.get<unknown>(apiUrls.user(userId))
    if (!isApiUser(response.data)) throw new Error('Unexpected user response')
    return toProfile(response.data)
  },
} as const
