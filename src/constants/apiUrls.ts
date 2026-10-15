export const apiUrls = {
  users: '/users',
  user: (userId: string) => `/users/${userId}`,
} as const
