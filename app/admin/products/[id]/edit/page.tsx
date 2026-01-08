import { products } from '@/lib/data'
import ProductForm from '@/components/admin/ProductForm'
import { notFound } from 'next/navigation'
import EditProductClient from './EditProductClient'

export async function generateStaticParams() {
    return products.map((product) => ({
        id: product.id,
    }))
}

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    // Since we are using static export or similar, we want to be careful with async params.
    // In Next.js 15+, params is a promise.

    return <EditProductClient params={params} />
}
