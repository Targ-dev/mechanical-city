import React from 'react'
import Link from 'next/link'
import { IOrder } from '@/models/Order'
import OrderTableClient from './OrderTableClient'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import jwt from 'jsonwebtoken'
import connectDB from '@/lib/db'
import Order from '@/models/Order'
import User from '@/models/User'

async function getOrders() {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token_v2')?.value

    if (!token) return null

    try {
        if (!process.env.JWT_SECRET) return null
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string }

        await connectDB()
        const user = await User.findById(decoded.id)

        if (!user || user.role !== 'admin') {
            return null
            // Or redirect('/') ideally, but for data fetching helper return null is safer
        }

        const orders = await Order.find({}).sort({ createdAt: -1 })
        return JSON.parse(JSON.stringify(orders))
    } catch (error) {
        console.error('Error fetching admin orders:', error)
        return null
    }
}

export default async function AdminOrdersPage() {
    let orders: (IOrder & { _id: string })[] = []

    try {
        const result = await getOrders()
        if (result) {
            orders = result
        }
    } catch (error) {
        console.error('Error loading orders:', error)
    }

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
                <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-500">
                        Total Orders: <span className="font-semibold text-gray-900">{orders.length}</span>
                    </div>
                </div>
            </div>

            <OrderTableClient initialOrders={orders} />
        </div>
    )
}
