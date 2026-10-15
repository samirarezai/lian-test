import axios from 'axios'

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (!error.response) return 'Network error. Check your connection and try again.'
    return `Could not load users (${error.response.status}).`
  }

  if (error instanceof Error && error.message) return error.message
  return 'Something went wrong while loading users.'
}
