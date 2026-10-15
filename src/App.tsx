import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/helpers/query/index.ts'
import { AppRouter } from '@/router/index.tsx'
import { ThemeProvider } from '@/theme/ThemeProvider.tsx'

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AppRouter />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
