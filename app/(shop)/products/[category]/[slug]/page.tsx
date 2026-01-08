import Image from 'next/image'
import { notFound } from 'next/navigation'
import { products } from '@/lib/data'
import AddToCartButton from '@/components/product/AddToCartButton'

interface ProductPageProps {
    params: Promise<{
        category: string
        slug: string
    }>
}

export async function generateStaticParams() {
    return products.map((product) => ({
        category: product.category.slug,
        slug: product.slug,
    }))
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { category, slug } = await params

    const product = products.find(
        (p) => p.slug === slug && p.category.slug === category
    )

    if (!product) {
        notFound()
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="aspect-square bg-gray-100 relative w-full">
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                />
            </div>

            <div className="p-6 space-y-4">
                <div>
                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full mb-3 uppercase tracking-wider">
                        {product.category.name}
                    </span>
                    <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                        {product.title}
                    </h1>
                </div>

                <p className="text-gray-600 leading-relaxed text-lg">
                    {product.description}
                </p>

                <div className="pt-4 border-t border-gray-100">
                    <p className="text-3xl font-bold text-gray-900 mb-6">
                        ${product.price.toFixed(2)}
                    </p>

                    <AddToCartButton product={product} />
                </div>
            </div>
        </div>
    )
}
