'use client'

import React, { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/auth.store'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const { user, isAuthenticated, checkAuth } = useAuthStore()
  const router = useRouter()
  
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    }
  })

  // Auth and data fetching effect
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!isAuthenticated()) {
        router.push('/login?redirect=/profile')
        return
      }

      try {
        const res = await fetch('/api/profile')
        if (res.ok) {
          const data = await res.json()
          setFormData({
            name: data.user.name || '',
            email: data.user.email || '',
            phone: data.user.phone || '',
            address: {
              street: data.user.address?.street || '',
              city: data.user.address?.city || '',
              state: data.user.address?.state || '',
              zipCode: data.user.address?.zipCode || '',
              country: data.user.address?.country || ''
            }
          })
        }
      } catch (error) {
        console.error('Failed to fetch profile', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfileData()
  }, [isAuthenticated, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1]
      setFormData(prev => ({
        ...prev,
        address: { ...prev.address, [addressField]: value }
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage({ type: '', text: '' })

    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          address: formData.address
        })
      })

      const data = await res.json()

      if (res.ok) {
        setMessage({ type: 'success', text: 'Profile updated successfully!' })
        checkAuth() // Refresh zustand store user details silently
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to update profile' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error occurred' })
    } finally {
      setIsSaving(false)
      // Auto dismiss success message
      setTimeout(() => setMessage({ type: '', text: '' }), 4000)
    }
  }

  if (isLoading) {
    return (
      <div className="py-20 flex justify-center items-center min-h-[60vh] bg-[#EAEDED]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#232F3E]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-[80vh] bg-[#EAEDED] py-10 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#0F1111]">Your Account Details</h1>
          <p className="text-sm text-gray-600 mt-1">Manage your personal information and shipping addresses</p>
        </div>

        {message.text && (
          <div className={`p-4 mb-6 rounded-lg border flex items-center gap-3 shadow-sm ${
            message.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            {message.type === 'success' ? (
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            )}
            <p className="font-bold text-[14px]">{message.text}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Card 1: Personal Information */}
          <div className="bg-white p-6 sm:p-8 rounded-lg border border-[#D5D9D9] shadow-sm">
            <h2 className="text-[20px] font-bold text-[#0F1111] mb-5 pb-2 border-b border-gray-100">Personal Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[13px] font-bold text-[#0F1111] mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-[#8D9096] rounded-[3px] focus:outline-none focus:ring-1 focus:ring-[#E77600] focus:border-[#E77600] shadow-[0_1px_2px_rgba(15,17,17,0.15)_inset] text-[14px]"
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-[#0F1111] mb-1">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-[3px] text-gray-500 cursor-not-allowed text-[14px]"
                />
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed.</p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-[13px] font-bold text-[#0F1111] mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-3 py-2 border border-[#8D9096] rounded-[3px] focus:outline-none focus:ring-1 focus:ring-[#E77600] focus:border-[#E77600] shadow-[0_1px_2px_rgba(15,17,17,0.15)_inset] text-[14px]"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Shipping Address */}
          <div className="bg-white p-6 sm:p-8 rounded-lg border border-[#D5D9D9] shadow-sm">
            <h2 className="text-[20px] font-bold text-[#0F1111] mb-5 pb-2 border-b border-gray-100">Default Shipping Address</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-[13px] font-bold text-[#0F1111] mb-1">Street Address</label>
                <input
                  type="text"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleInputChange}
                  placeholder="123 Main St, Apt 4B"
                  className="w-full px-3 py-2 border border-[#8D9096] rounded-[3px] focus:outline-none focus:ring-1 focus:ring-[#E77600] focus:border-[#E77600] shadow-[0_1px_2px_rgba(15,17,17,0.15)_inset] text-[14px]"
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-[#0F1111] mb-1">City</label>
                <input
                  type="text"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#8D9096] rounded-[3px] focus:outline-none focus:ring-1 focus:ring-[#E77600] focus:border-[#E77600] shadow-[0_1px_2px_rgba(15,17,17,0.15)_inset] text-[14px]"
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-[#0F1111] mb-1">State / Province</label>
                <input
                  type="text"
                  name="address.state"
                  value={formData.address.state}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#8D9096] rounded-[3px] focus:outline-none focus:ring-1 focus:ring-[#E77600] focus:border-[#E77600] shadow-[0_1px_2px_rgba(15,17,17,0.15)_inset] text-[14px]"
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-[#0F1111] mb-1">ZIP / Postal Code</label>
                <input
                  type="text"
                  name="address.zipCode"
                  value={formData.address.zipCode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#8D9096] rounded-[3px] focus:outline-none focus:ring-1 focus:ring-[#E77600] focus:border-[#E77600] shadow-[0_1px_2px_rgba(15,17,17,0.15)_inset] text-[14px]"
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-[#0F1111] mb-1">Country</label>
                <input
                  type="text"
                  name="address.country"
                  value={formData.address.country}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#8D9096] rounded-[3px] focus:outline-none focus:ring-1 focus:ring-[#E77600] focus:border-[#E77600] shadow-[0_1px_2px_rgba(15,17,17,0.15)_inset] text-[14px]"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className={`bg-[#FFD814] text-[#0F1111] px-8 py-2.5 rounded-full font-bold text-[14px] shadow-[0_1px_2px_rgba(0,0,0,0.1)] border border-[#FCD200] hover:bg-[#F7CA00] active:bg-[#F0B800] transition-colors flex items-center justify-center min-w-[200px] ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSaving ? (
                 <div className="flex items-center gap-2">
                   <div className="w-4 h-4 border-2 border-[#0F1111] border-b-transparent rounded-full animate-spin"></div>
                   Saving...
                 </div>
              ) : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
