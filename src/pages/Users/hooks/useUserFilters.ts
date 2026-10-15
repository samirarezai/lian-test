import { useMemo, useState } from 'react'
import {
  applyUserQuery,
  collectCompanies,
  hasActiveUserQuery,
  type SourceFilter,
  type UserSort,
} from '@/handler/users.ts'
import type { DashboardUser } from '@/services/types/user.ts'

export function useUserFilters(users: readonly DashboardUser[]) {
  const [search, setSearch] = useState('')
  const [company, setCompany] = useState('')
  const [source, setSource] = useState<SourceFilter>('all')
  const [sort, setSort] = useState<UserSort>('name-asc')

  const companies = useMemo(() => collectCompanies(users), [users])
  const activeCompany = companies.includes(company) ? company : ''
  const query = { search, company: activeCompany, source, sort }
  const visibleUsers = useMemo(
    () => applyUserQuery(users, { search, company: activeCompany, source, sort }),
    [users, search, activeCompany, source, sort],
  )

  const clearFilters = () => {
    setSearch('')
    setCompany('')
    setSource('all')
  }

  return {
    search,
    setSearch,
    company: activeCompany,
    setCompany,
    source,
    setSource,
    sort,
    setSort,
    companies,
    visibleUsers,
    hasActiveQuery: hasActiveUserQuery(query),
    clearFilters,
  }
}
