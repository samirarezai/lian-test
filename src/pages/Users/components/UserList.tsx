import { useNavigate } from 'react-router-dom'
import { sourceLabel, userInitials } from '@/handler/users.ts'
import { navigationPaths } from '@/constants/navigation.ts'
import type { DashboardUser } from '@/services/types/user.ts'
import { Button } from '@/components/Button/index.tsx'
import { Icon } from '@/components/Icon/index.tsx'

type UserListProps = {
  users: DashboardUser[]
  totalCount: number
  onDelete: (user: DashboardUser) => void
}

function SourceBadge({ user }: { user: DashboardUser }) {
  const isLocal = user.source === 'local'
  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
        isLocal
          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200'
          : 'bg-sky-50 text-sky-700 dark:bg-sky-500/15 dark:text-sky-200'
      }`}
    >
      {sourceLabel(user.source)}
    </span>
  )
}

function DeleteUserButton({ user, onDelete }: { user: DashboardUser; onDelete: (user: DashboardUser) => void }) {
  return (
    <Button
      variant="ghost"
      aria-label={`Delete ${user.name}`}
      onClick={(event) => {
        event.stopPropagation()
        onDelete(user)
      }}
      className="px-2 text-rose-600 dark:text-rose-300"
    >
      <Icon name="trash" className="size-4 text-rose-600 dark:text-rose-300" />
    </Button>
  )
}

export function UserList({ users, totalCount, onDelete }: UserListProps) {
  const navigate = useNavigate()
  const openUser = (user: DashboardUser) => navigate(navigationPaths.user(user.id))

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900" data-testid="user-list">
      <p className="border-b border-slate-200 px-4 py-3 text-sm text-slate-500 dark:border-zinc-800 dark:text-zinc-400">
        Showing {users.length} of {totalCount} users
      </p>

      <ul className="grid gap-3 p-3 md:hidden">
        {users.map((user) => (
          <li
            key={user.id}
            className="cursor-pointer rounded-xl border border-slate-200 p-3 dark:border-zinc-800"
            onClick={() => openUser(user)}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate font-medium text-slate-950 dark:text-white">{user.name}</p>
                <p className="truncate text-sm text-slate-500 dark:text-zinc-400">{user.email}</p>
                <p className="mt-2 truncate text-sm text-slate-700 dark:text-zinc-200">{user.companyName}</p>
              </div>
              <DeleteUserButton user={user} onDelete={onDelete} />
            </div>
            <div className="mt-3">
              <SourceBadge user={user} />
            </div>
          </li>
        ))}
      </ul>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-slate-50 text-xs tracking-wide text-slate-500 uppercase dark:bg-zinc-950/60 dark:text-zinc-400">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Company</th>
              <th className="px-4 py-3 font-medium">Source</th>
              <th className="px-4 py-3 text-right font-medium">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="cursor-pointer border-t border-slate-100 hover:bg-slate-50 dark:border-zinc-800 dark:hover:bg-zinc-800/60" onClick={() => openUser(user)}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-indigo-50 text-xs font-semibold text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-200">
                      {userInitials(user.name)}
                    </span>
                    <span className="font-medium text-slate-950 dark:text-white">{user.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-600 dark:text-zinc-300">{user.email}</td>
                <td className="px-4 py-3 text-slate-700 dark:text-zinc-200">{user.companyName}</td>
                <td className="px-4 py-3">
                  <SourceBadge user={user} />
                </td>
                <td className="px-4 py-3 text-right">
                  <DeleteUserButton user={user} onDelete={onDelete} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
