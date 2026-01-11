'use client'

import { useRouter } from 'next/navigation'
import ProductForm from '@/components/admin/ProductForm'
import { Product } from '@/types/product'

export default function NewProductPage() {
    const router = useRouter()

    const handleCreate = async (data: Partial<Product>) => {
        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })

            if (res.ok) {
                router.push('/admin/products')
            } else {
                const err = await res.json()
                alert(`Error: ${err.error}`)
            }
        } catch (error) {
            alert('An error occurred while creating product')
        }
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

