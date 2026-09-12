import type { ICartItem } from '../../../types/product'
import { logout } from '../../../utils/auth'
import { calculateTotal, getCartItems, removeFromCart } from '../../../utils/cart'

const cartList = document.getElementById('cart-list') as HTMLDivElement
const emptyCart = document.getElementById('empty-cart') as HTMLParagraphElement
const cartTotal = document.getElementById('cart-total') as HTMLDivElement
const logoutButton = document.getElementById('logoutButton') as HTMLButtonElement

const formatPrice = (price: number): string => {
  return `$${price.toLocaleString('es-AR')}`
}

const renderCart = (items: ICartItem[]): void => {
  cartList.innerHTML = ''

  if (items.length === 0) {
    emptyCart.textContent = 'El carrito está vacío.'
    cartTotal.innerHTML = ''
    return
  }

  emptyCart.textContent = ''

  items.forEach((item) => {
    const article = document.createElement('article')
    article.className = 'cart-item'
    article.innerHTML = `
      <img src="${item.imagen}" alt="${item.nombre}">
      <div>
        <h3>${item.nombre}</h3>
        <p>Precio: ${formatPrice(item.precio)}</p>
        <p>Cantidad: ${item.cantidad}</p>
        <p><strong>Subtotal: ${formatPrice(item.precio * item.cantidad)}</strong></p>
      </div>
      <button class="remove-button" type="button">Quitar</button>
    `

    const removeButton = article.querySelector('.remove-button') as HTMLButtonElement
    removeButton.addEventListener('click', () => {
      removeFromCart(item.id)
      renderCart(getCartItems())
    })

    cartList.appendChild(article)
  })

  cartTotal.innerHTML = `<strong>Total: ${formatPrice(calculateTotal(items))}</strong>`
}

logoutButton.addEventListener('click', logout)
renderCart(getCartItems())
