export const navigationPaths = {
  root: '/',
  users: '/users',
} as const

export const navigationItems = [
  {
    title: 'Users',
    path: navigationPaths.users,
  },
] as const
