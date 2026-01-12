import EditProductClient from './EditProductClient'

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    return <EditProductClient params={params} />
}
