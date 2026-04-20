'use client'

import React, { useState } from 'react'
import { IUser } from '@/models/User'
import Pagination from '@/components/admin/Pagination'

interface UserTableClientProps {
    initialUsers: (IUser & { _id: string })[]
    currentAdminId: string
}

export default function UserTableClient({ initialUsers, currentAdminId }: UserTableClientProps) {
    const [users, setUsers] = useState(initialUsers)
    const [loadingIds, setLoadingIds] = useState<Record<string, boolean>>({})
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    const paginatedUsers = users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    const updateRole = async (userId: string, newRole: string) => {
        if (!window.confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
            return;
        }

        setLoadingIds(prev => ({ ...prev, [userId]: true }))
        setMessage(null)

        try {
            const res = await fetch(`/api/admin/users/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role: newRole })
            })

            if (!res.ok) {
                if (res.status === 403) {
                    alert("You cannot modify your own account");
                }
                const errorData = await res.json()
                throw new Error(errorData.error || 'Failed to update role')
            }

            const updatedUser = await res.json()

            setUsers(prevUsers => (prevUsers.map(user =>
                user._id === userId ? { ...user, role: updatedUser.role } : user
            )) as typeof prevUsers)
            setMessage({ text: `User role updated to ${newRole}.`, type: 'success' })
        } catch (error: any) {
            setMessage({ text: error.message, type: 'error' })
        } finally {
            setLoadingIds(prev => ({ ...prev, [userId]: false }))
            setTimeout(() => setMessage(null), 3000)
        }
    }

    const deleteUser = async (userId: string) => {
        if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
            return;
        }

        setLoadingIds(prev => ({ ...prev, [`del-${userId}`]: true }))
        setMessage(null)

        try {
            const res = await fetch(`/api/admin/users/${userId}`, {
                method: 'DELETE',
            })

            if (!res.ok) {
                if (res.status === 403) {
                    alert("You cannot modify your own account");
                }
                const errorData = await res.json()
                throw new Error(errorData.error || 'Failed to delete user')
            }

            setUsers(prevUsers => prevUsers.filter(user => user._id !== userId))
            setMessage({ text: 'User deleted successfully.', type: 'success' })
        } catch (error: any) {
            setMessage({ text: error.message, type: 'error' })
        } finally {
            setLoadingIds(prev => ({ ...prev, [`del-${userId}`]: false }))
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
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined Date</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedUsers.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-sm text-gray-500">
                                    No users found.
                                </td>
                            </tr>
                        ) : (
                            paginatedUsers.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {user.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                            ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                        {user._id === currentAdminId ? (
                                            <span className="text-gray-400 italic">Current User (Protected)</span>
                                        ) : (
                                            <>
                                                {user.role === 'user' ? (
                                                    <button
                                                        onClick={() => updateRole(user._id, 'admin')}
                                                        disabled={loadingIds[user._id]}
                                                        className="text-purple-600 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-md transition-colors disabled:opacity-50"
                                                    >
                                                        {loadingIds[user._id] ? 'Updating...' : 'Make Admin'}
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => updateRole(user._id, 'user')}
                                                        disabled={loadingIds[user._id]}
                                                        className="text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-md transition-colors disabled:opacity-50"
                                                    >
                                                        {loadingIds[user._id] ? 'Updating...' : 'Remove Admin'}
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => deleteUser(user._id)}
                                                    disabled={loadingIds[`del-${user._id}`]}
                                                    className="inline-block ml-2 text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-md transition-colors disabled:opacity-50"
                                                >
                                                    {loadingIds[`del-${user._id}`] ? 'Deleting...' : 'Delete'}
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {users.length > itemsPerPage && (
                <Pagination
                    currentPage={currentPage}
                    totalItems={users.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                />
            )}
        </div>
    )
}
