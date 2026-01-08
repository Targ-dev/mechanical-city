'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cart.store'
import { useAuthStore } from '@/store/auth.store'

export default function Header() {
  const router = useRouter()
  const totalItems = useCartStore((state) => state.getTotalItems())
  const { user, logout } = useAuthStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-lg font-semibold tracking-wide text-gray-900 hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          aria-label="Mechanical City home"
        >
          MECHANICAL CITY
        </Link>

        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-6 text-sm font-medium text-gray-700">
            <li>
              <Link
                href="/products"
                className="transition-colors hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              >
                Products
              </Link>
            </li>
            <li className="relative">
              <Link
                href="/cart"
                className="transition-colors hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 flex items-center gap-1"
              >
                Cart
                {mounted && totalItems > 0 && (
                  <span className="inline-flex items-center justify-center bg-red-600 text-white text-[10px] font-bold h-4 w-4 rounded-full leading-none">
                    {totalItems}
                  </span>
                )}
              </Link>
            </li>

            {!mounted ? (
              // Loading/Hydration placeholder (optional, usually keeping layout stable is enough)
              <li className="w-12"></li>
            ) : user ? (
              <>
                <li className="text-gray-900 font-semibold">{user.name}</li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="transition-colors hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href="/login"
                    className="transition-colors hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    className="transition-colors hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}
