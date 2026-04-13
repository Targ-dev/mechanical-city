'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

interface OrderItem {
    name: string;
    quantity: number;
    price: number;
}

interface Order {
    _id: string;
    orderId?: string;
    status: string;
    createdAt: string;
    total: number;
    items: OrderItem[];
}

export default function UserOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch('/api/orders/user')
                if (!res.ok) {
                    throw new Error('Failed to fetch orders')
                }
                const data = await res.json()
                setOrders(data.orders || [])
            } catch (error) {
                console.error('Error fetching orders:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchOrders()
    }, [])

    const getStatusDetails = (status: string) => {
        switch (status) {
            case 'awaiting_payment':
                return {
                    label: 'Awaiting Payment',
                    color: 'bg-yellow-100 text-yellow-800',
                    message: 'Complete payment by scanning QR and send screenshot on WhatsApp'
                }
            case 'paid':
                return {
                    label: 'Paid',
                    color: 'bg-green-100 text-green-800',
                    message: 'Payment verified. Your order is being prepared'
                }
            case 'shipped':
                return {
                    label: 'Shipped',
                    color: 'bg-blue-100 text-blue-800',
                    message: 'Your order has been shipped'
                }
            default:
                return {
                    label: status || 'Unknown',
                    color: 'bg-gray-100 text-gray-800',
                    message: 'Processing your order'
                }
        }
    }

    if (loading) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
                <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="animate-pulse bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    if (orders.length === 0) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-4">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">You haven't placed any orders yet</h2>
                <p className="text-gray-500 mb-8 max-w-md">Once you place an order, it will appear here so you can check its status.</p>
                <Link
                    href="/products"
                    className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-sm"
                >
                    Start Shopping
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

            <div className="space-y-6">
                {orders.map((order) => {
                    const statusDetails = getStatusDetails(order.status)
                    const displayId = order.orderId || `#${order._id.slice(0, 8).toUpperCase()}`

                    // Product Summary Logic
                    const visibleItems = order.items.slice(0, 2)
                    const remainingCount = order.items.length - 2

                    return (
                        <div key={order._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">

                            {/* Card Header & Status Banner */}
                            <div className="bg-gray-50 border-b border-gray-100 p-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg mb-1">{displayId}</h3>
                                    <p className="text-sm text-gray-500">
                                        Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </p>
                                </div>

                                <div className="flex flex-col items-start md:items-end gap-2">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${statusDetails.color}`}>
                                        {statusDetails.label}
                                    </span>
                                    <span className="font-bold text-gray-900 text-lg">
                                        ₹{order.total.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            {/* Card Body & Product Summary */}
                            <div className="p-6">
                                <div className="mb-6 bg-blue-50/50 border border-blue-100 rounded-lg p-4">
                                    <p className="text-sm text-blue-800 font-medium flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-600">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                        </svg>
                                        {statusDetails.message}
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Items Ordered</h4>
                                    {visibleItems.map((item, idx) => (
                                        <div key={idx} className="flex justify-between items-center text-sm">
                                            <span className="text-gray-600 flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                                                {item.name} <span className="text-gray-400">x{item.quantity}</span>
                                            </span>
                                            <span className="text-gray-900 font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                    {remainingCount > 0 && (
                                        <p className="text-sm text-blue-600 font-medium pt-2 mt-2 border-t border-gray-50 inline-block cursor-pointer">
                                            +{remainingCount} more item{remainingCount > 1 ? 's' : ''}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
