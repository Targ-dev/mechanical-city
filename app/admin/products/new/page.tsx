'use client'

import ProductForm from '@/components/admin/ProductForm'
import { Product } from '@/types/product'

export default function NewProductPage() {
    const handleCreate = (data: Partial<Product>) => {
        console.log('Creating product:', data)
        alert('Product created! Check console for data.')
    }

    return (
        <div className="space-y-6">
            <div className="md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        Add New Product
                    </h2>
                </div>
            </div>

            <ProductForm
                onSubmit={handleCreate}
                submitLabel="Add Product"
            />
        </div>
    )
}
