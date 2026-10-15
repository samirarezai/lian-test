import { QueryClient } from '@tanstack/react-query'
import axios from 'axios'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
      retry(failureCount, error) {
        if (axios.isAxiosError(error) && error.response && error.response.status < 500) {
          return false
        }
        return failureCount < 1
      },
      retryDelay: 1000,
    },
  },
})
