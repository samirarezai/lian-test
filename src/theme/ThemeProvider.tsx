import { useEffect, useState, type ReactNode } from 'react'
import { storageKeys } from '@/constants/storage.ts'
import { ThemeContext, type Theme } from '@/theme/context.ts'

function readTheme(): Theme {
  const stored = localStorage.getItem(storageKeys.theme)
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.documentElement.style.colorScheme = theme
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(readTheme)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    try {
      localStorage.setItem(storageKeys.theme, next)
    } catch {
      // The chosen theme still applies for this session.
    }
    applyTheme(next)
    setTheme(next)
  }

  return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>
}
