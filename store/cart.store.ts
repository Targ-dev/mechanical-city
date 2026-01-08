import { create } from 'zustand'
import { Product } from '@/types/product'

export interface CartItem extends Product {
  quantity: number
}

interface CartState {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void

  // Selectors
  getTotalItems: () => number
  getSubtotal: () => number
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (product: Product) => {
    const { items } = get()
    const existingItem = items.find((item) => item.id === product.id)

    if (existingItem) {
      set({
        items: items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      })
    } else {
      set({ items: [...items, { ...product, quantity: 1 }] })
    }
  },

  removeItem: (id: string) => {
    set({ items: get().items.filter((item) => item.id !== id) })
  },

  updateQuantity: (id: string, quantity: number) => {
    const { items } = get()
    if (quantity <= 0) {
      set({ items: items.filter((item) => item.id !== id) })
    } else {
      set({
        items: items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      })
    }
  },

  clearCart: () => set({ items: [] }),

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0)
  },

  getSubtotal: () => {
    return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
  },
}))
