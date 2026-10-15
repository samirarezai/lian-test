import { useMemo, useState } from 'react'
import { PageContainer } from '@/components/PageContainer/index.tsx'
import { Button } from '@/components/Button/index.tsx'
import { Icon } from '@/components/Icon/index.tsx'
import { Loading } from '@/components/Loading/index.tsx'
import { EmptyState } from '@/components/EmptyState/index.tsx'
import { ErrorState } from '@/components/ErrorState/index.tsx'
import { getErrorMessage } from '@/handler/error.ts'
import { useUsersDashboard } from '@/pages/Users/hooks/useUsersDashboard.ts'
import { useUserFilters } from '@/pages/Users/hooks/useUserFilters.ts'
import { UserToolbar } from '@/pages/Users/components/UserToolbar.tsx'
import { UserList } from '@/pages/Users/components/UserList.tsx'
import { AddUserModal } from '@/pages/Users/components/AddUserModal.tsx'
import { DeleteUserModal } from '@/pages/Users/components/DeleteUserModal.tsx'
import type { DashboardUser } from '@/services/types/user.ts'

export default function UsersPage() {
  const { users, isPending, isError, error, refetch, addUser, deleteUser } = useUsersDashboard()
  const filters = useUserFilters(users)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<DashboardUser | null>(null)

  const emails = useMemo(() => new Set(users.map((user) => user.email.toLowerCase())), [users])
  const showFullLoading = isPending && users.length === 0
  const showFullError = isError && users.length === 0

  return (
    <PageContainer
      title="Users"
      description="Manage users"
      actions={
        <Button onClick={() => setIsAddOpen(true)} data-testid="add-user">
          <Icon name="plus" className="size-4" />
          Add user
        </Button>
      }
    >
      {isError && users.length > 0 && (
        <div role="alert" className="flex flex-col gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 sm:flex-row sm:items-center sm:justify-between dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-100">
          <p>{getErrorMessage(error)} Showing users saved in this browser.</p>
          <Button variant="secondary" onClick={() => refetch()}>
            Retry
          </Button>
        </div>
      )}

      {!showFullLoading && !showFullError && (
        <UserToolbar
          search={filters.search}
          company={filters.company}
          source={filters.source}
          sort={filters.sort}
          companies={filters.companies}
          hasActiveQuery={filters.hasActiveQuery}
          onSearchChange={filters.setSearch}
          onCompanyChange={filters.setCompany}
          onSourceChange={filters.setSource}
          onSortChange={filters.setSort}
          onClear={filters.clearFilters}
        />
      )}

      {showFullLoading && <Loading />}
      {showFullError && <ErrorState message={getErrorMessage(error)} onRetry={() => refetch()} />}

      {!showFullLoading && !showFullError && users.length === 0 && (
        <EmptyState
          title="No users yet"
          description="The directory is empty. Add a user and it will stay in this browser."
          action={
            <Button onClick={() => setIsAddOpen(true)}>
              <Icon name="plus" className="size-4" />
              Add user
            </Button>
          }
        />
      )}

      {!showFullLoading && !showFullError && users.length > 0 && filters.visibleUsers.length === 0 && (
        <EmptyState
          title="No matching users"
          description="Nothing matches the current search or filters."
          action={
            <Button variant="secondary" onClick={filters.clearFilters}>
              Clear filters
            </Button>
          }
        />
      )}

      {filters.visibleUsers.length > 0 && (
        <UserList users={filters.visibleUsers} totalCount={users.length} onDelete={setUserToDelete} />
      )}

      <AddUserModal open={isAddOpen} emails={emails} onClose={() => setIsAddOpen(false)} onAdd={addUser} />
      <DeleteUserModal user={userToDelete} onClose={() => setUserToDelete(null)} onConfirm={deleteUser} />
    </PageContainer>
  )
}
