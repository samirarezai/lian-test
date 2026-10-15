import { Link } from 'react-router-dom'
import { navigationPaths } from '@/constants/navigation.ts'

export function BackToUsers() {
  return (
    <Link
      to={navigationPaths.users}
      className="inline-flex w-fit items-center text-sm font-medium text-indigo-700 hover:text-indigo-800 dark:text-indigo-300"
    >
      Back to users
    </Link>
  )
}
