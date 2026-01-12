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
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
    router.push('/')
  }

  return (
    <header className="border-b bg-white relative">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-lg font-semibold tracking-wide text-gray-900 hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          aria-label="Mechanical City home"
          onClick={() => setIsMenuOpen(false)}
        >
          MECHANICAL CITY
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        <nav
          aria-label="Main navigation"
          className={`
            ${isMenuOpen ? 'flex flex-col absolute top-full left-0 w-full bg-white border-b shadow-lg z-50 p-4' : 'hidden'}
            md:flex md:flex-row md:static md:w-auto md:bg-transparent md:border-none md:shadow-none md:p-0
          `}
        >
          <ul className="flex flex-col md:flex-row items-center gap-6 text-sm font-medium text-gray-700 w-full md:w-auto">
            {mounted && user?.role !== 'admin' && (
              <li>
                <Link
                  href="/products"
                  className="transition-colors hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 block py-2 md:py-0"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </Link>
              </li>
            )}
            {mounted && user && (
              <li>
                <Link
                  href={user.role === 'admin' ? '/admin' : '/orders'}
                  className="transition-colors hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 block py-2 md:py-0"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {user.role === 'admin' ? 'Dashboard' : 'Orders'}
                </Link>
              </li>
            )}
            {mounted && user?.role !== 'admin' && (
              <li className="relative">
                <Link
                  href="/cart"
                  className="transition-colors hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 flex items-center gap-1 py-2 md:py-0"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Cart
                  {totalItems > 0 && (
                    <span className="inline-flex items-center justify-center bg-red-600 text-white text-[10px] font-bold h-4 w-4 rounded-full leading-none">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </li>
            )}

            {!mounted ? (
              <li className="w-12"></li>
            ) : user ? (
              <>
                <li className="text-gray-900 font-semibold py-2 md:py-0">
                  {user.name} {user.role === 'admin' && <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded ml-1">Admin</span>}
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="transition-colors hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 block py-2 md:py-0"
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
                    className="transition-colors hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 block py-2 md:py-0"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    className="transition-colors hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 block py-2 md:py-0"
                    onClick={() => setIsMenuOpen(false)}
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
