import ProductCard from '@/components/product/ProductCard'
import { Product } from '@/types/product'

interface ProductListProps {
  products: Product[]
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <div className="layout-container py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-2">Featured Products</h2>
          <p className="text-gray-500">Top 10 Most Sold This Week, Next Day Delivery.</p>
        </div>
        <a href="#" className="font-bold text-primary hover:text-secondary transition-colors flex items-center gap-1 group whitespace-nowrap">
          Top 100 Most Sold
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
        {products.slice(0, 8).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
