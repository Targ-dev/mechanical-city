import Image from 'next/image'
import { notFound } from 'next/navigation'
import AddToCartButton from '@/components/product/AddToCartButton'
import { Product } from '@/types/product'

async function getProduct(categorySlug: string, productSlug: string) {
    // Since we only have "get all" or "get by category", we fetch by category and find the item.
    // Ideally, API should support /api/products/[slug] or /api/products?slug=...
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/products?category=${categorySlug}`,
        { cache: 'no-store' }
    )
    if (!res.ok) return null
    const products: Product[] = await res.json()
    return products.find((p) => p.slug === productSlug) || null
}

interface ProductPageProps {
    params: Promise<{
        category: string
        slug: string
    }>
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { category, slug } = await params
    const product = await getProduct(category, slug)

    if (!product) {
        notFound()
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="aspect-square bg-gray-100 relative w-full border-b md:border-b-0 md:border-r border-gray-200">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover p-8 md:p-12 hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                    />
                </div>

                <div className="p-8 md:p-12 space-y-6 flex flex-col justify-center bg-white">
                    <div>
                        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
                            {product.category.name}
                        </span>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-2">
                            {product.name}
                        </h1>
                    </div>

                    <p className="text-gray-600 leading-relaxed text-lg">
                        {product.description}
                    </p>

                    <div className="pt-6 border-t border-gray-100">
                        <p className="text-4xl font-bold text-gray-900 mb-8">
                            ₹{product.price.toFixed(2)}
                        </p>

                        <AddToCartButton product={product} />
                    </div>
                </div>
            </div>
        </div>
    )
}
