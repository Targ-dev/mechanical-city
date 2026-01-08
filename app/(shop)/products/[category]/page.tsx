import Link from 'next/link'
import { notFound } from 'next/navigation'
import ProductCard from '@/components/product/ProductCard'
import { products } from '@/lib/data'

export async function generateStaticParams() {
    const categories = new Set(products.map((product) => product.category.slug))
    return Array.from(categories).map((slug) => ({
        category: slug,
    }))
}

interface CategoryPageProps {
    params: Promise<{
        category: string
    }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { category } = await params

    // Find products for this category
    const categoryProducts = products.filter(
        (product) => product.category.slug === category
    )

    // 404 if no products found (invalid category)
    if (categoryProducts.length === 0) {
        // Debugging: Show what we received vs what we have
        const availableCategories = Array.from(new Set(products.map(p => p.category.slug)))
        return (
            <div className="p-8">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Debug: Category Not Found</h1>
                <p><strong>Received Param:</strong> "{category}"</p>
                <p><strong>Param Type:</strong> {typeof category}</p>
                <p><strong>Available Categories:</strong></p>
                <ul className="list-disc pl-5">
                    {availableCategories.map(c => (
                        <li key={c}>"{c}" (Match: {c === category ? 'Yes' : 'No'})</li>
                    ))}
                </ul>
            </div>
        )
    }

    // Get category name from the first product
    const categoryName = categoryProducts[0].category.name

    return (
        <div className="space-y-6">
            <div className="flex flex-col space-y-2">
                <Link
                    href="/products"
                    className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1 w-fit"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Categories
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">
                    {categoryName}
                </h1>
                <p className="text-gray-600">
                    {categoryProducts.length} {categoryProducts.length === 1 ? 'product' : 'products'} found
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {categoryProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}
