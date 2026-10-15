import { sourceFilterOptions, userSortOptions, type SourceFilter, type UserSort } from '@/handler/users.ts'
import { SearchText } from '@/components/SearchText.tsx'
import { controlClass, labelClass } from '@/components/form/controls.ts'
import { Button } from '@/components/Button/index.tsx'

type UserToolbarProps = {
  search: string
  company: string
  source: SourceFilter
  sort: UserSort
  companies: string[]
  hasActiveQuery: boolean
  onSearchChange: (value: string) => void
  onCompanyChange: (value: string) => void
  onSourceChange: (value: SourceFilter) => void
  onSortChange: (value: UserSort) => void
  onClear: () => void
}

export function UserToolbar({
  search,
  company,
  source,
  sort,
  companies,
  hasActiveQuery,
  onSearchChange,
  onCompanyChange,
  onSourceChange,
  onSortChange,
  onClear,
}: UserToolbarProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,0.8fr)_minmax(0,0.9fr)_auto] xl:items-end">
        <label className={labelClass} htmlFor="user-search">
          Search
          <SearchText id="user-search" value={search} onChange={onSearchChange} />
        </label>

        <label className={labelClass} htmlFor="user-company">
          Company
          <select
            id="user-company"
            value={company}
            onChange={(event) => onCompanyChange(event.target.value)}
            className={controlClass}
          >
            <option value="">All companies</option>
            {companies.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className={labelClass} htmlFor="user-source">
          Source
          <select
            id="user-source"
            value={source}
            onChange={(event) => onSourceChange(event.target.value as SourceFilter)}
            className={controlClass}
          >
            {sourceFilterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className={labelClass} htmlFor="user-sort">
          Sort
          <select
            id="user-sort"
            value={sort}
            onChange={(event) => onSortChange(event.target.value as UserSort)}
            className={controlClass}
          >
            {userSortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <Button variant="secondary" onClick={onClear} disabled={!hasActiveQuery} className="w-full xl:w-auto">
          Clear
        </Button>
      </div>
    </div>
  )
}
