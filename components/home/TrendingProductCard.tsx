import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types/product'

interface TrendingProductCardProps {
    product: Product & {
        originalPrice?: number
        discount?: number
        reviews?: number
        rating?: number
    }
}

export default function TrendingProductCard({ product }: TrendingProductCardProps) {
    const discount = product.discount || 0
    const originalPrice = product.originalPrice || product.price * 1.2 // Mock original price if missing
    const rating = product.rating || 5
    const reviews = product.reviews || 0

    return (
        <div className="bg-white rounded-lg border border-gray-100 p-4 transition-shadow hover:shadow-lg flex flex-col h-full relative group">
            {/* Discount Badge */}
            {discount > 0 && (
                <div className="absolute top-4 left-4 z-10 bg-[#FFC400] text-[#1E1E1E] text-xs font-bold px-2 py-1 rounded">
                    -{discount}%
                </div>
            )}

            {/* Product Image */}
            <div className="relative aspect-square w-full mb-4">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-grow">
                {/* Category (Optional, based on design it looks like just title but maybe category helps) */}
                {/* <div className="text-xs text-gray-400 mb-1">{product.category.name}</div> */}

                {/* Title */}
                <Link href={`/products/${product.category.slug}/${product.slug}`} className="hover:text-[#FFC400] transition-colors">
                    <h3 className="text-sm font-medium text-gray-700 mb-2 line-clamp-2 h-10" title={product.name}>
                        {product.name}
                    </h3>
                </Link>


                {/* Rating */}
                <div className="flex items-center mb-3">
                    <div className="flex text-[#FFC400] text-xs">
                        {[...Array(5)].map((_, i) => (
                            <svg
                                key={i}
                                className={`w-3 h-3 ${i < Math.floor(rating) ? 'fill-current' : 'text-gray-300 fill-current'}`}
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                    <span className="text-xs text-gray-400 ml-2">({reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                    {originalPrice > product.price && (
                        <span className="text-xs text-gray-400 line-through">
                            ₹{originalPrice.toFixed(2)}
                        </span>
                    )}
                    <span className="text-sm font-bold text-[#0B3954]">
                        ₹{product.price.toFixed(2)}
                    </span>
                </div>

                {/* Add to Cart Button */}
                <button
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold py-3 px-4 rounded transition-colors uppercase mt-auto"
                    onClick={() => console.log('Add to cart default')} // Placeholder
                >
                    Add to cart
                </button>
            </div>
        </div>
    )
}
