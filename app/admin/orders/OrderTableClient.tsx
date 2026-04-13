'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { IOrder } from '@/models/Order'

interface OrderTableClientProps {
    initialOrders: (IOrder & { _id: string })[]
}

export default function OrderTableClient({ initialOrders }: OrderTableClientProps) {
    const [orders, setOrders] = useState(initialOrders)
    const [loadingIds, setLoadingIds] = useState<Record<string, boolean>>({})
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null)

    const updateStatus = async (orderId: string, newStatus: string, displayId: string) => {
        let confirmMessage = '';
        if (newStatus === 'paid') confirmMessage = 'Have you verified the payment?';
        if (newStatus === 'shipped') confirmMessage = 'Are you sure you want to mark this order as shipped?';

        if (confirmMessage && !window.confirm(confirmMessage)) {
            return;
        }

        setLoadingIds(prev => ({ ...prev, [orderId]: true }))
        setMessage(null)

        try {
            const res = await fetch(`/api/admin/orders/${orderId}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            })

            if (!res.ok) {
                const errorData = await res.json()
                throw new Error(errorData.error || 'Failed to update status')
            }

            const updatedOrder = await res.json()

            // Update local state
            setOrders(prevOrders => (prevOrders.map(order =>
                order._id === orderId ? { ...order, status: updatedOrder.status } : order
            )) as typeof prevOrders)
            setMessage({ text: `Order ${displayId} marked as ${newStatus.replace('_', ' ')}.`, type: 'success' })
        } catch (error: any) {
            setMessage({ text: error.message, type: 'error' })
        } finally {
            setLoadingIds(prev => ({ ...prev, [orderId]: false }))
            // Auto hide message after 3 seconds
            setTimeout(() => setMessage(null), 3000)
        }
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {message && (
                <div className={`px-6 py-3 text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                    {message.text}
                </div>
            )}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">View</span></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-sm text-gray-500">
                                    No orders found.
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {order.orderId || `#${order._id.toString().slice(0, 8).toUpperCase()}`}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {order.shippingAddress?.fullName || 'Guest'}
                                        <div className="text-xs text-gray-500">₹{order.total.toFixed(2)}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                            ${order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                                order.status === 'paid' ? 'bg-green-100 text-green-800' :
                                                    'bg-yellow-100 text-yellow-800'}`}>
                                            {order.status.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                        {order.status === 'awaiting_payment' && (
                                            <button
                                                onClick={() => updateStatus(order._id, 'paid', order.orderId || `#${order._id.toString().slice(0, 8).toUpperCase()}`)}
                                                disabled={loadingIds[order._id]}
                                                className="text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-md transition-colors disabled:opacity-50"
                                            >
                                                {loadingIds[order._id] ? 'Updating...' : 'Mark as Paid'}
                                            </button>
                                        )}
                                        {order.status === 'paid' && (
                                            <button
                                                onClick={() => updateStatus(order._id, 'shipped', order.orderId || `#${order._id.toString().slice(0, 8).toUpperCase()}`)}
                                                disabled={loadingIds[order._id]}
                                                className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md transition-colors disabled:opacity-50"
                                            >
                                                {loadingIds[order._id] ? 'Updating...' : 'Mark as Shipped'}
                                            </button>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link
                                            href={`/admin/orders/${order._id}`}
                                            className="text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md transition-colors"
                                        >
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
