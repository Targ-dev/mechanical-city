import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { IOrder } from '@/models/Order'
import { headers } from 'next/headers'
import StatusSelector from './StatusSelector'
import { getOrderById } from '@/lib/data-service'

export const dynamic = 'force-dynamic'

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    let order: (IOrder & { _id: string }) | null = null

    try {
        order = await getOrderById(id) as (IOrder & { _id: string }) | null
    } catch (error) {
        console.error('Error loading order:', error)
    }

    if (!order) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center bg-gray-50 rounded-xl my-8 mx-auto max-w-2xl border border-gray-200">
                <div className="bg-white p-4 rounded-full shadow-sm mb-6">
                    <svg className="w-16 h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Order Not Found</h2>
                <p className="text-gray-600 mb-8 max-w-md">The order ID <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">{id}</code> could not be found. It may have been deleted or the link is incorrect.</p>
                <div className="flex gap-4">
                    <Link
                        href="/admin/orders"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Orders
                    </Link>
                </div>
            </div>
        )
    }

    const getStatusColor = (s: string) => {
        switch (s?.toLowerCase()) {
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
                            Order #{order._id.toString().slice(0, 8).toUpperCase()}
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                {order.status}
                            </span>
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Placed on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                        </p>
                    </div>

                    <StatusSelector orderId={order._id.toString()} currentStatus={order.status} />
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
                                {order.items.map((item: any, idx: number) => (
                                    <tr key={idx}>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 relative bg-gray-100">
                                                    {item.image ? (
                                                        <Image
                                                            src={item.image}
                                                            alt={item.name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex items-center justify-center w-full h-full text-gray-400">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <span className="text-gray-900 font-medium">{item.quantity}</span> x ₹{item.price.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                                            ₹{(item.quantity * item.price).toFixed(2)}
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
                            {order.shippingAddress ? (
                                <>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Contact</label>
                                        <div className="text-sm font-medium text-gray-900">{order.shippingAddress.fullName}</div>
                                        <div className="text-sm text-gray-500">{order.shippingAddress.phone}</div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Shipping Address</label>
                                        <div className="text-sm text-gray-600">
                                            {order.shippingAddress.address}<br />
                                            {order.shippingAddress.city}, {order.shippingAddress.pincode}
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
                                <span>₹{(order.subtotal || (order.total - 15)).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Shipping</span>
                                {/* Assuming standard shipping since it wasn't preserved in model separately? Wait, models/Order.ts has subtotal and total. */}
                                <span>₹{(order.total - (order.subtotal || (order.total - 15))).toFixed(2)}</span>
                            </div>
                            <div className="pt-3 border-t border-gray-100 flex justify-between text-base font-bold text-gray-900">
                                <span>Total</span>
                                <span>₹{order.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
