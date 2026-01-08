import Link from 'next/link'
import { products } from '@/lib/data'
import { Category } from '@/types/product'

export default function ProductsPage() {
  // Derive unique categories from products
  const categoriesMap = new Map<string, Category>()

  products.forEach((product) => {
    if (!categoriesMap.has(product.category.slug)) {
      categoriesMap.set(product.category.slug, product.category)
    }
  })

  // Convert map to array and sort by name
  const categories = Array.from(categoriesMap.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  )

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
