export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                {/* Total Products */}
                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="px-4 py-5 sm:p-6">
                        <dt className="truncate text-sm font-medium text-gray-500">
                            Total Products
                        </dt>
                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                            12
                        </dd>
                    </div>
                </div>

                {/* Total Orders */}
                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="px-4 py-5 sm:p-6">
                        <dt className="truncate text-sm font-medium text-gray-500">
                            Total Orders
                        </dt>
                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                            25
                        </dd>
                    </div>
                </div>

                {/* Total Users */}
                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="px-4 py-5 sm:p-6">
                        <dt className="truncate text-sm font-medium text-gray-500">
                            Total Users
                        </dt>
                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                            5
                        </dd>
                    </div>
                </div>
            </div>
        </div>
    )
}
