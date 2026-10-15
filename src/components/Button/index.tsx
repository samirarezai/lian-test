import type { ButtonHTMLAttributes } from 'react'

const variants = {
  primary:
    'bg-indigo-600 text-white hover:bg-indigo-500 disabled:bg-indigo-400 dark:disabled:bg-indigo-800',
  secondary:
    'border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800',
  danger: 'bg-rose-600 text-white hover:bg-rose-500',
  ghost:
    'text-slate-600 hover:bg-slate-100 dark:text-zinc-300 dark:hover:bg-zinc-800',
} as const

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants
}

export function Button({ variant = 'primary', className = '', type = 'button', ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex h-10 items-center justify-center gap-2 rounded-lg px-3.5 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    />
  )
}
