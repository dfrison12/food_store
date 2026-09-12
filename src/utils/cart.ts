import type { ICartItem, IProduct } from '../types/product'

const CART_KEY = 'cart'

export const getCartItems = (): ICartItem[] => {
  const cart = localStorage.getItem(CART_KEY)
  return cart ? JSON.parse(cart) as ICartItem[] : []
}

const saveCartItems = (items: ICartItem[]): void => {
  localStorage.setItem(CART_KEY, JSON.stringify(items))
}

export const updateQuantity = (productId: number, quantity: number): void => {
  const items = getCartItems()
  const item = items.find((cartItem) => cartItem.id === productId)

  if (item) {
    item.cantidad = quantity
    saveCartItems(items)
  }
}

export const addToCart = (product: IProduct): void => {
  const items = getCartItems()
  const existingItem = items.find((item) => item.id === product.id)

  if (existingItem) {
    updateQuantity(product.id, existingItem.cantidad + 1)
  } else {
    items.push({ ...product, cantidad: 1 })
    saveCartItems(items)
  }
}

export const removeFromCart = (productId: number): void => {
  const items = getCartItems()
  const updatedItems = items.filter((item) => item.id !== productId)
  saveCartItems(updatedItems)
}

export const calculateTotal = (items: ICartItem[]): number => {
  return items.reduce((total, item) => total + item.precio * item.cantidad, 0)
}
