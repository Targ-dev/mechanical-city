import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types/product'
import AddToCartButton from './AddToCartButton'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const productUrl = `/products/${product.category.slug}/${product.slug}`


  return (
    <div className="flex flex-col bg-white border border-gray-100 rounded-lg overflow-hidden md:hover:shadow-lg transition-shadow duration-200 w-full">
      
      {/* Image container */}
      <Link href={productUrl} className="w-full group">
        <div className="w-full aspect-square relative flex items-center justify-center bg-[#f8f9fa]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-3 md:p-5 mix-blend-multiply transition-transform duration-500 md:group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
          />
        </div>
      </Link>

      {/* Details container */}
      <div className="flex flex-col flex-1 p-2 md:p-3">
        
        <Link href={productUrl} className="group">
          <h3 className="text-xs md:text-sm text-secondary font-medium line-clamp-2 leading-snug md:group-hover:text-amber-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="mt-1 flex items-baseline gap-0.5">
          <span className="text-[10px] font-semibold text-secondary relative top-[-3px]">₹</span>
          <span className="text-base md:text-lg font-bold text-secondary">
            {Math.floor(product.price)}
          </span>
          <span className="text-[10px] font-semibold text-secondary relative top-[-3px]">
            {((product.price % 1) * 100).toFixed(0).padStart(2, '0')}
          </span>
        </div>

        <div className="mt-auto pt-2">
             <AddToCartButton product={product} />
        </div>

      </div>
    </div>
  )
}
