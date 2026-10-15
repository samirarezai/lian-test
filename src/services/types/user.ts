export type UserSource = 'api' | 'local'

export type ApiUser = {
  id: number
  name: string
  email: string
  company: {
    name: string
  }
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
