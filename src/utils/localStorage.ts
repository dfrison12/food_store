import type { IUser } from '../types/IUser'
import { Rol } from '../types/Rol'

const ADMIN_USER: IUser = {
  email: 'admin@foodstore.com',
  password: 'Admin123',
  loggedIn: false,
  role: Rol.ADMIN,
}

const CLIENT_USER: IUser = {
  email: 'cliente@foodstore.com',
  password: 'Cliente123',
  loggedIn: false,
  role: Rol.CLIENT,
}

export const getUsers = (): IUser[] => {
  const users = localStorage.getItem('users')
  return users ? JSON.parse(users) as IUser[] : []
}

export const saveUsers = (users: IUser[]): void => {
  localStorage.setItem('users', JSON.stringify(users))
}

export const initializeUsers = (): void => {
  const users = getUsers()
  const adminExists = users.some((user) => user.email === ADMIN_USER.email)
  const clientExists = users.some((user) => user.email === CLIENT_USER.email)

  if (!adminExists) {
    users.push(ADMIN_USER)
  }

  if (!clientExists) {
    users.push(CLIENT_USER)
  }

  if (!adminExists || !clientExists) {
    saveUsers(users)
  }
}

export const saveUser = (user: IUser): void => {
  localStorage.setItem('userData', JSON.stringify(user))
}

export const getUser = (): IUser | null => {
  const user = localStorage.getItem('userData')
  return user ? JSON.parse(user) as IUser : null
}

export const removeUser = (): void => {
  localStorage.removeItem('userData')
}
