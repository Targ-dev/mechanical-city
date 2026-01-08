'use client'

import { useState } from 'react'
import { Product } from '@/types/product'
import { useCartStore } from '@/store/cart.store'

interface AddToCartButtonProps {
    product: Product
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
    const addItem = useCartStore((state) => state.addItem)
    const [isAdded, setIsAdded] = useState(false)

    const handleAddToCart = () => {
        addItem(product)
        setIsAdded(true)
        setTimeout(() => setIsAdded(false), 2000)
    }

    return (
        <button
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all focus:ring-4 focus:ring-blue-100 active:transform active:scale-[0.98] ${isAdded
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
        >
            {isAdded ? 'Added to Cart!' : 'Add to Cart'}
        </button>
    )
}
