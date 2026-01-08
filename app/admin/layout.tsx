import Link from 'next/link'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
                </div>
                <nav className="mt-6">
                    <Link
                        href="/admin/dashboard"
                        className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                        <span className="font-medium">Dashboard</span>
                    </Link>
                    <Link
                        href="/admin/products"
                        className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                        <span className="font-medium">Products</span>
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
                {children}
            </main>
        </div>
    )
}
