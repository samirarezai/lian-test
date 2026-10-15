export const navigationPaths = {
  root: '/',
  users: '/users',
  user: (userId: string) => `/users/${encodeURIComponent(userId)}`,
} as const

export const navigationItems = [
  {
    title: 'Users',
    path: navigationPaths.users,
  },
] as const
