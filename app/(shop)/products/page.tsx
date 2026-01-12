import Link from 'next/link'
import { Category, Product } from '@/types/product'

async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://mechanical-city.vercel.app'}/api/products`, {
    cache: 'no-store',
  })
  if (!res.ok) return []
  return res.json()
}

async function getCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://mechanical-city.vercel.app'}/api/categories`, {
    cache: 'no-store',
  })
  if (!res.ok) return []
  return res.json()
}

export default async function ProductsPage() {
  const products: Product[] = await getProducts()
  const categories: Category[] = await getCategories()

  return (
    <div className="space-y-6">
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shop by Category</h1>
        <p className="text-gray-600">Explore our premium selection of mechanical keyboards</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/products/${category.slug}`}
            className="block group"
          >
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1">
              <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 mb-2 flex items-center justify-between">
                {category.name}
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-all"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </h2>
              <p className="text-sm text-gray-500">
                Browse {category.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
