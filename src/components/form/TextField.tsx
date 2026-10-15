import type { InputHTMLAttributes, ReactNode } from 'react'
import { controlClass, labelClass } from '@/components/form/controls.ts'

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
  hint?: ReactNode
}

export function TextField({ label, error, hint, id, className = '', ...props }: TextFieldProps) {
  const fieldId = id ?? props.name

  return (
    <label className={labelClass} htmlFor={fieldId}>
      {label}
      <input id={fieldId} className={`${controlClass} ${className}`} aria-invalid={Boolean(error)} {...props} />
      {error ? (
        <span role="alert" className="text-xs font-normal text-rose-600 dark:text-rose-300">
          {error}
        </span>
      ) : (
        hint
      )}
    </label>
  )
}
