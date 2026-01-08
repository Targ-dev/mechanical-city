'use client'

import { FormEvent, useState } from 'react'
import { Product } from '@/types/product'

interface ProductFormProps {
    initialData?: Partial<Product>
    onSubmit: (data: Partial<Product>) => void
    submitLabel: string
}

const CATEGORIES = [
    { name: 'Mechanical Keyboards', slug: 'mechanical-keyboards' },
    { name: 'Wireless Keyboards', slug: 'wireless-keyboards' },
    { name: 'Gaming Keyboards', slug: 'gaming-keyboards' },
    { name: 'Compact Keyboards', slug: 'compact-keyboards' },
]

export default function ProductForm({ initialData, onSubmit, submitLabel }: ProductFormProps) {
    const [formData, setFormData] = useState<Partial<Product>>({
        title: initialData?.title || '',
        price: initialData?.price || 0,
        image: initialData?.image || '',
        description: initialData?.description || '',
        category: initialData?.category || CATEGORIES[0],
        ...initialData,
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target

        if (name === 'price') {
            setFormData(prev => ({ ...prev, [name]: parseFloat(value) }))
        } else if (name === 'category') {
            const selectedCategory = CATEGORIES.find(c => c.slug === value)
            if (selectedCategory) {
                setFormData(prev => ({ ...prev, category: selectedCategory }))
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }))
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200 bg-white p-6 shadow sm:rounded-lg">
            <div className="space-y-6 sm:space-y-5">

                {/* Title */}
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        Product Name
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md p-2 border"
                            required
                        />
                    </div>
                </div>

                {/* Category */}
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        Category
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <select
                            id="category"
                            name="category"
                            value={formData.category?.slug}
                            onChange={handleChange}
                            className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md p-2 border"
                        >
                            {CATEGORIES.map((category) => (
                                <option key={category.slug} value={category.slug}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Price */}
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        Price
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <input
                            type="number"
                            name="price"
                            id="price"
                            min="0"
                            step="0.01"
                            value={formData.price}
                            onChange={handleChange}
                            className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md p-2 border"
                            required
                        />
                    </div>
                </div>

                {/* Image URL */}
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        Image URL
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <input
                            type="text"
                            name="image"
                            id="image"
                            value={formData.image}
                            onChange={handleChange}
                            className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md p-2 border"
                            required
                        />
                    </div>
                </div>

                {/* Description */}
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        Description
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <textarea
                            id="description"
                            name="description"
                            rows={3}
                            value={formData.description}
                            onChange={handleChange}
                            className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                </div>

            </div>

            <div className="pt-5">
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {submitLabel}
                    </button>
                </div>
            </div>
        </form>
    )
}
