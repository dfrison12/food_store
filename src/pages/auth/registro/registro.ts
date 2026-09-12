import type { IUser } from '../../../types/IUser'
import { Rol } from '../../../types/Rol'
import { getUsers, saveUsers } from '../../../utils/localStorage'
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
  const userExists = users.some((user) => user.email === email)

  if (userExists) {
    mensaje.textContent = 'Ya existe un usuario registrado con ese email.'
    return
  }

  const newUser: IUser = {
    email,
    password,
    loggedIn: false,
    role: Rol.CLIENT,
  }

  users.push(newUser)
  saveUsers(users)
  navigate('../login/login.html')
})
