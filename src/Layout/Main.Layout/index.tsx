import { Suspense } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { navigationItems, navigationPaths } from '@/constants/navigation.ts'
import { Loading } from '@/components/Loading/index.tsx'
import { Icon } from '@/components/Icon/index.tsx'
import { ThemeToggle } from '@/theme/ThemeToggle.tsx'

export default function MainLayout() {
  return (
    <div className="min-h-svh bg-slate-50 text-slate-900 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="mx-auto flex min-h-svh w-full">
        <aside className="sticky top-0 hidden h-svh w-64 shrink-0 flex-col border-r border-slate-200 bg-white px-4 py-6 md:flex dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-3 px-2">
            <span className="grid size-10 place-items-center rounded-xl bg-indigo-600 text-white">
              <Icon name="users" className="size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-950 dark:text-white">Directory</p>
              <p className="text-xs text-slate-500 dark:text-zinc-400">User dashboard</p>
            </div>
          </div>

          <nav className="mt-8 grid gap-1" aria-label="Main">
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-medium ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-200'
                      : 'text-slate-600 hover:bg-slate-50 dark:text-zinc-300 dark:hover:bg-zinc-800'
                  }`
                }
              >
                {item.title}
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto">
            <ThemeToggle />
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:hidden dark:border-zinc-800 dark:bg-zinc-900">
            <Link to={navigationPaths.users} className="text-sm font-semibold">
              Users
            </Link>
            <ThemeToggle />
          </header>
          <main className="flex-1 px-4 py-6 md:px-8 md:py-8">
            <Suspense fallback={<Loading />}>
              <Outlet />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  )
}
