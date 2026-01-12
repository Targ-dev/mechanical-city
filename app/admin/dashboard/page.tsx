import { cookies } from 'next/headers'

async function getStats() {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('auth_token')?.value

        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/admin/stats`, {
            headers: {
                'Cookie': `auth_token=${token}`
            },
            cache: 'no-store'
        })

        if (!res.ok) return null
        return res.json()
    } catch (error) {
        console.error('Error fetching stats:', error)
        return null
    }
}

export default async function DashboardPage() {
    const stats = await getStats()

    const displayStats = [
        { name: 'Total Products', value: stats?.totalProducts ?? 0 },
        { name: 'Total Orders', value: stats?.totalOrders ?? 0 },
        { name: 'Total Users', value: stats?.totalUsers ?? 0 },
        { name: 'Total Revenue', value: `₹${(stats?.totalRevenue ?? 0).toFixed(2)}` },
    ]

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {displayStats.map((item) => (
                    <div key={item.name} className="overflow-hidden rounded-lg bg-white shadow">
                        <div className="px-4 py-5 sm:p-6">
                            <dt className="truncate text-sm font-medium text-gray-500">
                                {item.name}
                            </dt>
                            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                                {item.value}
                            </dd>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

