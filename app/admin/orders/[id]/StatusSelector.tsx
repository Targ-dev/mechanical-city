'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface StatusSelectorProps {
    orderId: string
    currentStatus: string
}

export default function StatusSelector({ orderId, currentStatus }: StatusSelectorProps) {
    const [status, setStatus] = useState(currentStatus)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const statuses = ['Placed', 'Processing', 'Shipped', 'Delivered', 'Cancelled']

    const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value
        setStatus(newStatus)
        setIsLoading(true)

        try {
            const res = await fetch(`/api/orders/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            })

            if (!res.ok) {
                throw new Error('Failed to update status')
            }

            // Refresh the page to reflect changes
            router.refresh()
        } catch (error) {
            console.error('Error updating status:', error)
            // Revert status on error
            setStatus(currentStatus)
            alert('Failed to update status')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex items-center gap-3 bg-white p-2 rounded-lg border border-gray-200 shadow-sm">
            <span className="text-sm font-medium text-gray-700 whitespace-nowrap px-2">Status:</span>
            <div className="relative">
                <select
                    value={status}
                    onChange={handleStatusChange}
                    disabled={isLoading}
                    className="block w-full appearance-none rounded-md border border-gray-300 bg-white py-1.5 pl-3 pr-8 text-sm leading-6 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {statuses.map((s) => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                    </svg>
                </div>
            </div>
            {isLoading && (
                <div className="flex items-center px-1">
                    <svg className="animate-spin h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            )}
        </div>
    )
}
