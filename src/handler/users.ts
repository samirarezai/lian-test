import type { CreateUserInput, DashboardUser, UserSource } from '@/services/types/user.ts'

export const userSortOptions = [
  { value: 'name-asc', label: 'Name (A–Z)' },
  { value: 'name-desc', label: 'Name (Z–A)' },
  { value: 'email-asc', label: 'Email (A–Z)' },
  { value: 'email-desc', label: 'Email (Z–A)' },
  { value: 'company-asc', label: 'Company (A–Z)' },
  { value: 'company-desc', label: 'Company (Z–A)' },
] as const

export const sourceFilterOptions = [
  { value: 'all', label: 'All users' },
  { value: 'api', label: 'From API' },
  { value: 'local', label: 'Added locally' },
] as const

export type UserSort = (typeof userSortOptions)[number]['value']
export type SourceFilter = (typeof sourceFilterOptions)[number]['value']

export type UserListQuery = {
  search: string
  company: string
  source: SourceFilter
  sort: UserSort
}

const sortFields = {
  name: 'name',
  email: 'email',
  company: 'companyName',
} as const

export function isDashboardUser(value: unknown): value is DashboardUser {
  if (!value || typeof value !== 'object') return false

  const user = value as Partial<DashboardUser>
  return (
    typeof user.id === 'string' &&
    typeof user.name === 'string' &&
    typeof user.email === 'string' &&
    typeof user.companyName === 'string' &&
    (user.source === 'api' || user.source === 'local')
  )
}

export function parseLocalUsers(value: unknown): DashboardUser[] {
  if (!Array.isArray(value)) return []
  return value.filter((user): user is DashboardUser => isDashboardUser(user) && user.source === 'local')
}

export function parseDeletedIds(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value.filter((id): id is string => typeof id === 'string' && id.length > 0)
}

export function createLocalUser(input: CreateUserInput): DashboardUser {
  return {
    id: `local-${crypto.randomUUID()}`,
    name: input.name.trim(),
    email: input.email.trim(),
    companyName: input.companyName.trim(),
    source: 'local',
  }
}

export function mergeUsers(remoteUsers: readonly DashboardUser[], localUsers: readonly DashboardUser[], deletedIds: readonly string[]): DashboardUser[] {
  const hidden = new Set(deletedIds)
  return [...remoteUsers.filter((user) => !hidden.has(user.id)), ...localUsers]
}

export function collectCompanies(users: readonly DashboardUser[]): string[] {
  return [...new Set(users.map((user) => user.companyName))].sort((left, right) =>
    left.localeCompare(right, undefined, { sensitivity: 'base' }),
  )
}

export function hasActiveUserQuery(query: UserListQuery): boolean {
  return query.search.trim() !== '' || query.company !== '' || query.source !== 'all'
}

export function applyUserQuery(users: readonly DashboardUser[], query: UserListQuery): DashboardUser[] {
  const search = query.search.trim().toLowerCase()
  const filtered = users.filter((user) => {
    const matchesSearch =
      search.length === 0 ||
      user.name.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search)
    const matchesCompany = query.company === '' || user.companyName === query.company
    const matchesSource = query.source === 'all' || user.source === query.source
    return matchesSearch && matchesCompany && matchesSource
  })

  const [field, direction] = query.sort.split('-') as [keyof typeof sortFields, 'asc' | 'desc']
  const sortField = sortFields[field]

  filtered.sort((left, right) => {
    const result = left[sortField].localeCompare(right[sortField], undefined, { sensitivity: 'base' })
    return direction === 'asc' ? result : -result
  })

  return filtered
}

export function userInitials(name: string): string {
  const letters = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')

  return letters || '?'
}

export function sourceLabel(source: UserSource): string {
  return source === 'local' ? 'Local' : 'API'
}
