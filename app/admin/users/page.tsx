import React from 'react'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import connectDB from '@/lib/db'
import User, { IUser } from '@/models/User'
import UserTableClient from './UserTableClient'

async function getUsers() {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token_v2')?.value

    if (!token) return null

    try {
        if (!process.env.JWT_SECRET) return null
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string }

        await connectDB()
        const adminUser = await User.findById(decoded.id)

        if (!adminUser || adminUser.role !== 'admin') {
            return null
        }

        const users = await User.find({}).select('-password').sort({ createdAt: -1 })
        return { 
            users: JSON.parse(JSON.stringify(users)), 
            currentAdminId: decoded.id 
        }
    } catch (error) {
        console.error('Error fetching admin users:', error)
        return null
    }
}

export default async function AdminUsersPage() {
    let users: (IUser & { _id: string })[] = []
    let currentAdminId = ''

    try {
        const result = await getUsers()
        if (result) {
            users = result.users
            currentAdminId = result.currentAdminId
        }
    } catch (error) {
        console.error('Error loading users:', error)
    }

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Users</h1>
                <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-500">
                        Total Users: <span className="font-semibold text-gray-900">{users.length}</span>
                    </div>
                </div>
            </div>

            <UserTableClient initialUsers={users} currentAdminId={currentAdminId} />
        </div>
    )
}
