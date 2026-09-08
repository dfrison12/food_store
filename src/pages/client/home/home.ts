import { PRODUCTS, getCategories } from '../../../data/data'
import type { IProduct } from '../../../types/product'
import { logout } from '../../../utils/auth'
import { addToCart } from '../../../utils/cart'

const productList = document.getElementById('product-list') as HTMLElement
const categoryList = document.getElementById('category-list') as HTMLDivElement
const searchInput = document.getElementById('search') as HTMLInputElement
const emptyMessage = document.getElementById('empty-message') as HTMLParagraphElement
const confirmationMessage = document.getElementById('confirmation-message') as HTMLParagraphElement
const logoutButton = document.getElementById('logoutButton') as HTMLButtonElement

let selectedCategory: number | null = null

const formatPrice = (price: number): string => {
  return `$${price.toLocaleString('es-AR')}`
}

const renderProducts = (products: IProduct[]): void => {
  productList.innerHTML = ''
  emptyMessage.textContent = products.length === 0
    ? 'No se encontraron productos.'
    : ''

  products.forEach((product) => {
    const article = document.createElement('article')
    article.className = product.disponible ? 'product-card' : 'product-card unavailable'
    article.innerHTML = `
      <img src="${product.imagen}" alt="${product.nombre}">
      <div class="product-info">
        <p class="product-category">${product.categorias[0].nombre}</p>
        <h3>${product.nombre}</h3>
        <p>${product.descripcion}</p>
        <p class="price">${formatPrice(product.precio)}</p>
        <p class="stock">${product.disponible ? `Stock: ${product.stock}` : 'Sin stock'}</p>
        <button type="button" ${product.disponible ? '' : 'disabled'}>
          ${product.disponible ? 'Agregar' : 'No disponible'}
        </button>
      </div>
    `

    const addButton = article.querySelector('button') as HTMLButtonElement
    addButton.addEventListener('click', () => {
      addToCart(product)
      confirmationMessage.textContent = `Agregaste ${product.nombre} al carrito.`
    })

    productList.appendChild(article)
  })
}

const filterProducts = (): void => {
  const search = searchInput.value.trim().toLowerCase()
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch = product.nombre.toLowerCase().includes(search)
    const matchesCategory = selectedCategory === null
      || product.categorias.some((category) => category.id === selectedCategory)

    return !product.eliminado && matchesSearch && matchesCategory
  })

  renderProducts(filteredProducts)
}

const renderCategories = (): void => {
  const allButton = document.createElement('button')
  allButton.type = 'button'
  allButton.textContent = 'Ver todos'
  allButton.className = 'category-button active'
  allButton.addEventListener('click', () => {
    selectedCategory = null
    setActiveCategory(allButton)
    filterProducts()
  })
  categoryList.appendChild(allButton)

  getCategories().forEach((category) => {
    const button = document.createElement('button')
    button.type = 'button'
    button.textContent = category.nombre
    button.className = 'category-button'
    button.addEventListener('click', () => {
      selectedCategory = category.id
      setActiveCategory(button)
      filterProducts()
    })
    categoryList.appendChild(button)
  })
}

const setActiveCategory = (selectedButton: HTMLButtonElement): void => {
  const buttons = categoryList.querySelectorAll('button')
  buttons.forEach((button) => button.classList.remove('active'))
  selectedButton.classList.add('active')
}

searchInput.addEventListener('input', filterProducts)
logoutButton.addEventListener('click', logout)

renderCategories()
renderProducts(PRODUCTS.filter((product) => !product.eliminado))
