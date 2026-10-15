import { lazy } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { navigationPaths } from '@/constants/navigation.ts'
import MainLayout from '@/Layout/Main.Layout/index.tsx'
import { getUserLoader } from '@/loader/user.loader.ts'
import { UserDetailsError } from '@/pages/Users/Details.tsx'

const UsersPage = lazy(() => import('@/pages/Users/index.tsx'))
const UserDetailsPage = lazy(() => import('@/pages/Users/Details.tsx'))

const router = createBrowserRouter([
  {
    path: navigationPaths.root,
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to={navigationPaths.users} replace /> },
      { path: 'users', element: <UsersPage /> },
      {
        path: 'users/:userId',
        loader: ({ params }) => getUserLoader(params.userId),
        element: <UserDetailsPage />,
        errorElement: <UserDetailsError />,
      },
      { path: '*', element: <Navigate to={navigationPaths.users} replace /> },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
