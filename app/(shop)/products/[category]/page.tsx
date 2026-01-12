import Link from 'next/link'
import { notFound } from 'next/navigation'
import ProductCard from '@/components/product/ProductCard'
import { Product } from '@/types/product'

async function getCategoryProducts(categorySlug: string) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL || 'http://mechanical-city.vercel.app'}/api/products?category=${categorySlug}`,
        { cache: 'no-store' }
    )
    if (!res.ok) return []
    return res.json()
}

interface CategoryPageProps {
    params: Promise<{
        category: string
    }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { category } = await params
    const categoryProducts: Product[] = await getCategoryProducts(category)

    // 404 if no products found (invalid category or empty)
    if (categoryProducts.length === 0) {
        return (
            <div className="p-8">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Category Not Found</h1>
                <p>No products found for category: "{category}"</p>
                <Link href="/products" className="text-blue-600 hover:underline mt-4 block">
                    Return to Shop
                </Link>
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

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {categoryProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}
