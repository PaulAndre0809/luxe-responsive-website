import { create } from 'zustand'
import type { CartItem, Product } from '../types'

type CartStore = {
  items: CartItem[]
  addItem: (product: Product, size?: string) => void
  removeItem: (productId: number, size?: string) => void
  updateQty: (productId: number, qty: number, size?: string) => void
  clearCart: () => void
  total: () => number
  count: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addItem: (product, size) => {
    const existing = get().items.find(i => i.product.id === product.id && i.size === size)
    if (existing) {
      set(state => ({
        items: state.items.map(i =>
          i.product.id === product.id && i.size === size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        ),
      }))
    } else {
      set(state => ({ items: [...state.items, { product, quantity: 1, size }] }))
    }
  },

  removeItem: (productId, size) => {
    set(state => ({ items: state.items.filter(i => !(i.product.id === productId && i.size === size)) }))
  },

  updateQty: (productId, qty, size) => {
    if (qty < 1) {
      get().removeItem(productId, size)
      return
    }
    set(state => ({
      items: state.items.map(i => i.product.id === productId && i.size === size ? { ...i, quantity: qty } : i),
    }))
  },

  clearCart: () => set({ items: [] }),

  total: () => get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),

  count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
}))