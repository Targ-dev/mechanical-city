import Link from 'next/link'
import Image from 'next/image'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import jwt from 'jsonwebtoken'
import connectDB from '@/lib/db'
import Order, { IOrder } from '@/models/Order'

async function getOrders() {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value

    if (!token) return null

    try {
        if (!process.env.JWT_SECRET) return null
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string }

        await connectDB()
        const orders = await Order.find({ user: decoded.id }).sort({ createdAt: -1 })
        return JSON.parse(JSON.stringify(orders))
    } catch (error) {
        console.error('Error fetching orders:', error)
        return null
    }
}

export default async function OrdersPage() {
    let orders: (IOrder & { _id: string })[] = []

    try {
        const result = await getOrders()
        if (!result) {
            // If no token or error, maybe redirect to login? 
            // But existing code just showed empty list or error.
            // Given the route protection middleware, we should have a token here theoretically.
            // If manual verify fails, treat as empty.
            orders = []
        } else {
            orders = result
        }
    } catch (error) {
        console.error('Error loading orders:', error)
    }

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

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
            <div className="space-y-6">
                {orders.map((order) => (
                    <div key={order._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-wrap gap-4 justify-between items-center bg-opacity-50">
                            <div className="flex gap-4 text-sm text-gray-600">
                                <div>
                                    <p className="font-medium text-gray-900">Order Placed</p>
                                    <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Total</p>
                                    <p>₹{order.total.toFixed(2)}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Order #</p>
                                    <p className="font-mono text-xs pt-0.5">{order._id.toString().slice(0, 8).toUpperCase()}</p>
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
                                {order.items.map((item: any, idx: number) => (
                                    <li key={`${order._id}-${idx}`} className="flex py-4 first:pt-0 last:pb-0">
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
                                        <div className="ml-4 flex-1">
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                                                <p className="text-sm font-medium text-gray-900">₹{item.price.toFixed(2)}</p>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {order.shippingAddress && (
                            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                                <p className="text-sm text-gray-600 font-medium mb-1">Shipping Details</p>
                                <p className="text-sm text-gray-500">
                                    {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.pincode}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
