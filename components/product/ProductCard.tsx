import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types/product'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.category.slug}/${product.slug}`}
      className="block group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-3">
        <div className="text-xs text-gray-500 mb-1">{product.category.name}</div>
        <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2 h-[40px]">
          {product.name}
        </h3>
        <p className="text-base font-bold text-gray-900">
          ₹{product.price.toFixed(2)}
        </p>
      </div>
    </Link>
  )
}
