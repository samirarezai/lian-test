import type { UserProfile } from '@/services/types/user.ts'

const fields = [
  { key: 'name', title: 'Name' },
  { key: 'username', title: 'Username' },
  { key: 'email', title: 'Email' },
  { key: 'phone', title: 'Phone' },
  { key: 'address', title: 'Address' },
  { key: 'companyName', title: 'Company' },
] as const

function displayValue(value: string) {
  const trimmed = value.trim()
  return trimmed || '—'
}

export function Information({ user }: { user: UserProfile }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="text-lg font-semibold text-slate-950 dark:text-white">User info</h2>
      <dl className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {fields.map((field) => (
          <div key={field.key}>
            <dt className="text-xs font-medium text-slate-500 dark:text-zinc-400">{field.title}</dt>
            <dd className="mt-2 text-base break-words text-slate-950 dark:text-white">{displayValue(user[field.key])}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
