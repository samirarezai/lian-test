export type UserSource = 'api' | 'local'

export type ApiUser = {
  id: number
  name: string
  username?: string
  email: string
  phone?: string
  address?: {
    street?: string
    suite?: string
    city?: string
    zipcode?: string
  }
  company: {
    name: string
  }
}

export type UserProfile = {
  id: string
  name: string
  username: string
  email: string
  phone: string
  address: string
  companyName: string
  source: UserSource
}

export type DashboardUser = {
  id: string
  name: string
  email: string
  companyName: string
  source: UserSource
}

export type CreateUserInput = {
  name: string
  email: string
  companyName: string
}
