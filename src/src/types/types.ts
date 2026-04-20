export type UserSession = {
  id: number
  email: string
  exp: number
}

export type AppVariables = {
  user: UserSession
}