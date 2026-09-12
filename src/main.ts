import { getUser, initializeUsers } from './utils/localStorage'
import { navigate } from './utils/navigate'
import { Rol } from './types/Rol'

const LOGIN_ROUTE = '/src/pages/auth/login/login.html'
const ADMIN_ROUTE = '/src/pages/admin/home/home.html'
const CLIENT_ROUTE = '/src/pages/client/home/home.html'

const router = (): void => {
  initializeUsers()

  const route = window.location.pathname
  const user = getUser()
  const isIndex = route === '/' || route.endsWith('/index.html')
  const isAdminRoute = route.includes('/pages/admin/')
  const isClientRoute = route.includes('/pages/client/')

  if (isIndex) {
    if (!user || !user.loggedIn) {
      navigate(LOGIN_ROUTE)
    } else {
      navigate(user.role === Rol.ADMIN ? ADMIN_ROUTE : CLIENT_ROUTE)
    }
    return
  }

  if ((isAdminRoute || isClientRoute) && (!user || !user.loggedIn)) {
    navigate(LOGIN_ROUTE)
    return
  }

  if (isAdminRoute && user?.role !== Rol.ADMIN) {
    navigate(CLIENT_ROUTE)
    return
  }

  if (isClientRoute && user?.role !== Rol.CLIENT) {
    navigate(ADMIN_ROUTE)
  }
}

router()
