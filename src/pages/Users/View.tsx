import { userInitials } from '@/handler/users.ts'
import type { UserProfile } from '@/services/types/user.ts'
import { Information } from '@/pages/Users/components/Information.tsx'

export function UserView({ user }: { user: UserProfile }) {
  return (
    <div className="grid gap-5" data-testid="user-details">
      <header className="flex items-center gap-4">
        <span className="grid size-16 shrink-0 place-items-center rounded-full bg-indigo-50 text-lg font-semibold text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-200">
          {userInitials(user.name)}
        </span>
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-semibold text-slate-950 md:text-3xl dark:text-white">{user.name}</h1>
          <p className="truncate text-sm text-slate-500 dark:text-zinc-400">{user.email}</p>
        </div>
      </header>
      <Information user={user} />
    </div>
  )
}
