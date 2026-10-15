import { controlClass } from '@/components/form/controls.ts'
import { Icon } from '@/components/Icon/index.tsx'

type SearchTextProps = {
  id: string
  value: string
  onChange: (value: string) => void
}

export function SearchText({ id, value, onChange }: SearchTextProps) {
  return (
    <div className="relative">
      <Icon name="search" className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
      <input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by name or email"
        className={`${controlClass} pl-9`}
        data-testid="user-search"
        autoComplete="off"
      />
    </div>
  )
}
