export interface Category {
  name: string
  slug: string
}

export interface Product {
  id: string
  slug: string
  title: string
  price: number
  image: string
  description: string
  category: Category
}
