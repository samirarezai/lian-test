import { lazy } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { navigationPaths } from '@/constants/navigation.ts'
import MainLayout from '@/Layout/Main.Layout/index.tsx'

const UsersPage = lazy(() => import('@/pages/Users/index.tsx'))

const router = createBrowserRouter([
  {
    path: navigationPaths.root,
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to={navigationPaths.users} replace /> },
      { path: 'users', element: <UsersPage /> },
      { path: '*', element: <Navigate to={navigationPaths.users} replace /> },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
