'use client'

import { useRouter } from 'next/navigation'
import { use, useEffect, useState } from 'react'
import ProductForm from '@/components/admin/ProductForm'
import { Product } from '@/types/product'

export default function EditProductClient({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter()
    const { id } = use(params)
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products/${id}`)
                if (res.ok) {
                    const data = await res.json()
                    setProduct(data)
                }
            } catch (error) {
                console.error('Error fetching product:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchProduct()
    }, [id])

    const handleUpdate = async (data: Partial<Product>) => {
        try {
            const res = await fetch(`/api/products/${id}`, {
                method: 'PUT',
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
            alert('An error occurred while updating product')
        }
    }

    if (loading) {
        return <div>Loading...</div>
    }

    if (!product) {
        return <div>Product not found</div>
    }

    return (
        <div className="space-y-6">
            <div className="md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        Edit Product: {product.name}
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
