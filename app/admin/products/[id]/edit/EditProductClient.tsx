'use client'

import { use, useEffect, useState } from 'react'
import ProductForm from '@/components/admin/ProductForm'
import { Product } from '@/types/product'
import { products as initialProducts } from '@/lib/data' // We'll just read from data for mock finding

export default function EditProductClient({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const product = initialProducts.find(p => p.id === id)

    const handleUpdate = (data: Partial<Product>) => {
        console.log('Updating product:', { ...product, ...data })
        alert('Product updated! Check console for data.')
    }

    if (!product) {
        return <div>Product not found</div>
    }

    return (
        <div className="space-y-6">
            <div className="md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        Edit Product: {product.title}
                    </h2>
                </div>
            </div>

            <ProductForm
                initialData={product}
                onSubmit={handleUpdate}
                submitLabel="Update Product"
            />
        </div>
    )
}
