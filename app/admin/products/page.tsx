'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Product } from '@/types/product'
import Image from 'next/image'
import Pagination from '@/components/admin/Pagination'

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([])
    const [categories, setCategories] = useState<{name: string, slug: string}[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string>('all')
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(p => p.category.slug === selectedCategory)

    const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    useEffect(() => {
        setCurrentPage(1)
    }, [selectedCategory])

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [productsRes, categoriesRes] = await Promise.all([
                    fetch('/api/products'),
                    fetch('/api/categories')
                ])
                if (productsRes.ok) {
                    const data = await productsRes.json()
                    setProducts(data)
                }
                if (categoriesRes.ok) {
                    const data = await categoriesRes.json()
                    setCategories(data)
                }
            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchInitialData()
    }, [])

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this product?')) {
            try {
                const res = await fetch(`/api/products/${id}`, {
                    method: 'DELETE'
                })
                if (res.ok) {
                    setProducts(products.filter(p => p.id !== id))
                } else {
                    alert('Error deleting product')
                }
            } catch (error) {
                alert('An error occurred while deleting product')
            }
        }
    }

    if (loading) return <div>Loading...</div>

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                    <h2 className="text-2xl font-bold text-gray-900 whitespace-nowrap">Manage Products</h2>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="block w-full sm:w-48 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="all">All Categories</option>
                        {categories.map(c => (
                            <option key={c.slug} value={c.slug}>{c.name}</option>
                        ))}
                    </select>
                </div>
                <Link
                    href="/admin/products/new"
                    className="w-full sm:w-auto inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Add Product
                </Link>
            </div>

            <div className="overflow-hidden bg-white shadow sm:rounded-md">
                <ul role="list" className="divide-y divide-gray-200">
                    {paginatedProducts.map((product) => (
                        <li key={product.id}>
                            <div className="flex items-center px-4 py-4 sm:px-6">
                                <div className="flex min-w-0 flex-1 items-center">
                                    <div className="flex-shrink-0">
                                        <img className="h-12 w-12 rounded object-cover" src={product.image} alt="" />
                                    </div>
                                    <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                        <div>
                                            <p className="truncate text-sm font-medium text-indigo-600">{product.name}</p>
                                            <p className="mt-2 flex items-center text-sm text-gray-500">
                                                <span className="truncate">{product.category.name}</span>
                                            </p>
                                        </div>
                                        <div className="hidden md:block">
                                            <p className="text-sm text-gray-900">
                                                Price: <span className="font-semibold">₹{product.price.toFixed(2)}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <Link
                                        href={`/admin/products/${product.id}/edit`}
                                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        Delete<span className="sr-only">, {product.name}</span>
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            {filteredProducts.length > itemsPerPage && (
                <Pagination
                    currentPage={currentPage}
                    totalItems={filteredProducts.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                />
            )}
        </div>
    )
}
