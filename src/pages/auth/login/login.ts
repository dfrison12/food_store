import type { IUser } from '../../../types/IUser'
import { Rol } from '../../../types/Rol'
import { getUsers, saveUser } from '../../../utils/localStorage'
import { navigate } from '../../../utils/navigate'

const form = document.getElementById('form') as HTMLFormElement
const inputEmail = document.getElementById('email') as HTMLInputElement
const inputPassword = document.getElementById('password') as HTMLInputElement
const mensaje = document.getElementById('mensaje') as HTMLParagraphElement

form.addEventListener('submit', (event: SubmitEvent) => {
  event.preventDefault()

  const email = inputEmail.value.trim()
  const password = inputPassword.value
  const users = getUsers()
  const user = users.find(
    (registeredUser) => registeredUser.email === email && registeredUser.password === password,
  )

  if (!user) {
    mensaje.textContent = 'El email o la contraseña son incorrectos.'
    return
  }

  const authenticatedUser: IUser = {
    ...user,
    loggedIn: true,
  }

  saveUser(authenticatedUser)
  navigate(authenticatedUser.role === Rol.ADMIN
    ? '/src/pages/admin/home/home.html'
    : '/src/pages/client/home/home.html')
})
