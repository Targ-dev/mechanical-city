import { Product } from './product'

export interface OrderItem extends Product {
  quantity: number
}

export interface Order {
  id: string
  items: OrderItem[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  createdAt: string
  shippingDetails?: {
    name: string
    phone: string
    address: string
    city: string
    pincode: string
  }
}
