import Link from 'next/link'
import { notFound } from 'next/navigation'
import ProductCard from '@/components/product/ProductCard'
import { Product } from '@/types/product'
import { getProducts } from '@/lib/data-service'

export const dynamic = 'force-dynamic'

interface CategoryPageProps {
    params: Promise<{ category: string }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { category } = await params
    const categoryProducts: any[] = await getProducts(category)

    if (categoryProducts.length === 0) {
        return (
            <div className="p-6 md:p-12 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[50vh] text-center">
                <svg className="w-12 h-12 text-gray-200 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h1 className="text-xl md:text-2xl font-black text-secondary mb-2">Category Empty</h1>
                <p className="text-gray-500 mb-6 text-sm">We couldn't find any products in "{category}".</p>
                <Link href="/products" className="bg-secondary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-black transition-colors">
                    Back to Shop
                </Link>
            </div>
        )
    }

    const categoryName = categoryProducts[0].category.name

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12 bg-white">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-100 pb-4 mb-6 md:mb-8 gap-4">
                <div>
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-gray-400 hover:text-primary transition-colors mb-1.5 uppercase tracking-wider"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        All Categories
                    </Link>
                    <h1 className="text-2xl md:text-3xl font-black text-secondary tracking-tight">
                        {categoryName}
                    </h1>
                </div>
                <div className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-wide">
                    {categoryProducts.length} Items Listed
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-5">
                {categoryProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}
