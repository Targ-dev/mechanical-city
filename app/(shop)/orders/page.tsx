'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useOrderStore } from '@/store/order.store'
import Image from 'next/image'

export default function OrdersPage() {
    const orders = useOrderStore((state) => state.orders)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return <div className="py-20 text-center">Loading orders...</div>

    if (orders.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h1>
                <p className="text-gray-600 mb-8">You haven't placed any orders yet.</p>
                <Link
                    href="/products"
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                    Start Shopping
                </Link>
            </div>
        )
    }

    // Sort orders by most recent first
    const sortedOrders = [...orders].sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
            <div className="space-y-6">
                {sortedOrders.map((order) => (
                    <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-wrap gap-4 justify-between items-center bg-opacity-50">
                            <div className="flex gap-4 text-sm text-gray-600">
                                <div>
                                    <p className="font-medium text-gray-900">Order Placed</p>
                                    <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Total</p>
                                    <p>${order.total.toFixed(2)}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Order #</p>
                                    <p className="font-mono text-xs pt-0.5">{order.id.slice(0, 8).toUpperCase()}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                  ${order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                        order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                            'bg-yellow-100 text-yellow-800'}`}>
                                    {order.status}
                                </span>
                            </div>
                        </div>
                        <div className="p-6">
                            <ul className="divide-y divide-gray-100">
                                {order.items.map((item, idx) => (
                                    <li key={`${order.id}-${idx}`} className="flex py-4 first:pt-0 last:pb-0">
                                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 relative">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="ml-4 flex-1">
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-sm font-medium text-gray-900">{item.title}</h4>
                                                <p className="text-sm font-medium text-gray-900">${item.price.toFixed(2)}</p>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {order.shippingDetails && (
                            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                                <p className="text-sm text-gray-600 font-medium mb-1">Shipping API (Mock)</p>
                                <p className="text-sm text-gray-500">
                                    {order.shippingDetails.address}, {order.shippingDetails.city}, {order.shippingDetails.pincode}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
