'use client'

import { useState } from 'react'
import { Product } from '@/types/product'
import { useCartStore } from '@/store/cart.store'

interface AddToCartButtonProps {
    product: Product
    size?: 'small' | 'large'
}

export default function AddToCartButton({ product, size = 'small' }: AddToCartButtonProps) {
    const addItem = useCartStore((state) => state.addItem)
    const [isAdded, setIsAdded] = useState(false)

    const handleAddToCart = (e: React.MouseEvent) => {
        // Prevent event propagation if the button inside a Link area
        e.preventDefault()
        e.stopPropagation()
        
        addItem(product)
        setIsAdded(true)
        setTimeout(() => setIsAdded(false), 2000)
    }

    const sizeClasses = size === 'large'
        ? 'py-4 md:py-3.5 px-6 font-bold text-base gap-2'
        : 'py-2 px-4 font-medium text-xs md:text-sm gap-1.5'

    const iconSizeClass = size === 'large' ? 'w-5 h-5 mb-0.5' : 'w-4 h-4'

    return (
        <button
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`w-full rounded-full transition-opacity active:scale-[0.98] flex items-center justify-center shadow-sm border border-transparent ${sizeClasses}
                ${isAdded
                    ? 'bg-green-600 text-white'
                    : 'bg-primary text-secondary md:hover:opacity-90'
                }`}
        >
            {isAdded ? (
                <>
                   <svg className={iconSizeClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                   </svg>
                   Added to Cart
                </>
            ) : (
                <>
                   Add to cart
                </>
            )}
        </button>
    )
}
