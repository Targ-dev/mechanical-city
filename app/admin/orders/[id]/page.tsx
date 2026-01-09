'use client'

import React, { useEffect, useState, use } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useOrderStore } from '@/store/order.store'

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const orders = useOrderStore((state) => state.orders)
    const [mounted, setMounted] = useState(false)
    const [status, setStatus] = useState('Placed')

    const order = orders.find((o) => o.id === id)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (order) {
            setStatus(order.status || 'Placed')
        }
    }, [order])

    if (!mounted) return <div className="p-8">Loading details...</div>

    if (!order) {
        return (
            <div className="p-8 text-center max-w-lg mx-auto">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Order Not Found</h2>
                <p className="text-gray-600 mb-6">The order you are looking for does not exist or has been removed.</p>
                <Link
                    href="/admin/orders"
                    className="inline-block bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Back to Orders
                </Link>
            </div>
        )
    }

    const getStatusColor = (s: string) => {
        switch (s.toLowerCase()) {
            case 'processing': return 'bg-yellow-100 text-yellow-800'
            case 'shipped': return 'bg-purple-100 text-purple-800'
            case 'delivered': return 'bg-green-100 text-green-800'
            case 'cancelled': return 'bg-red-100 text-red-800'
            default: return 'bg-blue-100 text-blue-800'
        }
    }

    return (
        <div className="p-6 max-w-6xl">
            <div className="mb-6">
                <Link href="/admin/orders" className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1 mb-4">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Orders
                </Link>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                            Order #{order.id.slice(0, 8).toUpperCase()}
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
                                {status}
                            </span>
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Placed on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                        </p>
                    </div>

                    <div className="flex items-center gap-3 bg-white p-2 rounded-lg border border-gray-200">
                        <label htmlFor="status-select" className="text-sm font-medium text-gray-700 whitespace-nowrap">
                            Update Status:
                        </label>
                        <select
                            id="status-select"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="block w-full rounded-md border-gray-300 py-1.5 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                        >
                            <option value="Placed">Placed</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column - Order Items */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                            <h3 className="font-semibold text-gray-900">Ordered Items</h3>
                        </div>
                        <table className="min-w-full divide-y divide-gray-200">
                            <tbody className="divide-y divide-gray-200">
                                {order.items.map((item, idx) => (
                                    <tr key={idx}>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 relative">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{item.title}</div>
                                                    <div className="text-sm text-gray-500">{item.category.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <span className="text-gray-900 font-medium">{item.quantity}</span> x ${item.price.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                                            ${(item.quantity * item.price).toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right Column - Customer & Payment */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                            <h3 className="font-semibold text-gray-900">Customer Details</h3>
                        </div>
                        <div className="p-6 space-y-4">
                            {order.shippingDetails ? (
                                <>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Contact</label>
                                        <div className="text-sm font-medium text-gray-900">{order.shippingDetails.name}</div>
                                        <div className="text-sm text-gray-500">{order.shippingDetails.phone}</div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Shipping Address</label>
                                        <div className="text-sm text-gray-600">
                                            {order.shippingDetails.address}<br />
                                            {order.shippingDetails.city}, {order.shippingDetails.pincode}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <p className="text-sm text-gray-500 italic">No shipping details provided.</p>
                            )}
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                            <h3 className="font-semibold text-gray-900">Order Summary</h3>
                        </div>
                        <div className="p-6 space-y-3">
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Subtotal</span>
                                <span>${(order.total - 15).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Shipping</span>
                                <span>$15.00</span>
                            </div>
                            <div className="pt-3 border-t border-gray-100 flex justify-between text-base font-bold text-gray-900">
                                <span>Total</span>
                                <span>${order.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
