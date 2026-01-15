'use client'

import Link from 'next/link'
import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cart.store'
import { useAuthStore } from '@/store/auth.store'
import Image from 'next/image'

export default function Header() {
  const router = useRouter()
  const totalItems = useCartStore((state) => state.getTotalItems())
  const { user, logout } = useAuthStore()
  const [mounted, setMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [activeMobileTab, setActiveMobileTab] = useState<'menu' | 'categories'>('menu')

  // Ref for search container to handle click outside
  const searchRef = useRef<HTMLDivElement>(null)

  const recommendedItems = [
    'Level',
    'Utility knife',
    'Hammer',
    'Cordless drill',
    'Screwdriver set'
  ]

  // Mock Data for Mega Menu matching the user's image
  const categories = [
    {
      name: 'Gardening',
      href: '/products?category=gardening',
      hasMegaMenu: true,
      subs: [
        {
          title: 'Garden Tools',
          items: ['Shovels & Spades', 'Rakes', 'Pruners & Shears', 'Garden Hoes', 'Wheelbarrows']
        },
        {
          title: 'Watering & Irrigation',
          items: ['Hoses', 'Nozzles & Wands', 'Sprinklers', 'Watering Cans', 'Timers']
        },
        {
          title: 'Plant Care',
          items: ['Pots & Planters', 'Soils & Fertilizers', 'Gloves', 'Plant Supports']
        },
        {
          title: 'Power Equipment',
          items: ['Lawn Mowers', 'Leaf Blowers', 'String Trimmers', 'Hedge Trimmers']
        }
      ]
    },
    {
      name: 'Hand tools',
      href: '/products?category=hand-tools',
      hasMegaMenu: true,
      subs: [
        {
          title: 'General',
          items: ['Hammers', 'Screwdrivers', 'Pliers', 'Wrenches', 'Tape Measures']
        },
        {
          title: 'Cutting',
          items: ['Utility Knives', 'Saws', 'Wire Cutters', 'Chisels', 'Scissors']
        },
        {
          title: 'Finishing',
          items: ['Sandpaper', 'Files', 'Rasps', 'Putty Knives']
        },
        {
          title: 'Sets',
          items: ['Mechanics Tool Sets', 'Household Tool Sets', 'Socket Sets']
        }
      ]
    },
    {
      name: 'Landscaping',
      href: '/products?category=landscaping',
      hasMegaMenu: true,
      subs: [
        {
          title: 'Heavy Duty',
          items: ['Chainsaws', 'Pole Saws', 'Tillers', 'Augers']
        },
        {
          title: 'Maintenance',
          items: ['Pressure Washers', 'Sweepers', 'Snow Blowers', 'Log Splitters']
        },
        {
          title: 'Outdoor Decor',
          items: ['Pavers', 'Retaining Walls', 'Edging', 'Stepping Stones']
        },
        {
          title: 'Safety Gear',
          items: ['Gloves', 'Eye Protection', 'Hearing Protection', 'Boots']
        }
      ]
    },
    {
      name: 'Power tool',
      href: '/products?category=power-tools',
      hasMegaMenu: true,
      subs: [
        {
          title: 'Power Tools',
          items: ['Cable Cutting & Crimping', 'Compressors', 'Drills', 'Dust Management', 'Grinders & Polishers']
        },
        {
          title: 'Home Improvement',
          items: ['Tool Sets', 'Screwdriver Sets', 'Socket & Socket Wrench Sets', 'Combination Wrenches', 'Pliers']
        },
        {
          title: 'Hand Tools',
          items: ['Drywall Tools', 'Hammers', 'Hand Saws', 'Knives & Blades']
        },
        {
          title: 'Accessories',
          items: ['Batteries & Chargers', 'Cutting & Grinding', 'Drilling Accessories', 'Fastening Accessories']
        }
      ]
    },
    {
      name: 'Woodworking',
      href: '/products?category=woodworking',
      hasMegaMenu: true,
      subs: [
        {
          title: 'Cutting',
          items: ['Table Saws', 'Miter Saws', 'Band Saws', 'Scroll Saws', 'Jigsaws']
        },
        {
          title: 'Shaping',
          items: ['Routers', 'Planers', 'Jointers', 'Lathes']
        },
        {
          title: 'Sanding',
          items: ['Belt Sanders', 'Orbital Sanders', 'Disc Sanders', 'Drum Sanders']
        },
        {
          title: 'Assembly',
          items: ['Clamps', 'Vises', 'Glue & Adhesives', 'Dowels & Biscuits']
        }
      ]
    },
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
    router.push('/')
  }

  const SearchDropdown = () => (
    <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-md border border-gray-100 overflow-hidden z-50 mt-2">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-100">
        <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">RECOMMENDED FOR YOU</span>
        <button className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-primary transition-colors">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>
      <ul>
        {recommendedItems.map((item, index) => (
          <li key={index}>
            <Link
              href={`/products?q=${encodeURIComponent(item)}`}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-gray-700"
              onClick={() => setIsSearchFocused(false)}
            >
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <header className="sticky top-0 z-50 shadow-md">

      {/* Top Main Header (Dark) */}
      <div className="bg-secondary">
        <div className="layout-container">
          <div className="flex h-20 items-center justify-between gap-4">

            {/* Logo Section */}
            <Link
              href="/"
              className="flex items-center gap-2 group focus:outline-none"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="text-xl md:text-2xl font-black tracking-tighter text-white uppercase">
                MECHANICAL<span className="text-primary">CITY</span>
              </span>
            </Link>

            {/* Desktop: Categories Button (Mega Menu) */}
            <div className="hidden lg:block relative group z-50">
              {/* Page Overlay Backdrop */}
              <div className="fixed inset-0 bg-black/40 z-[-1] hidden group-hover:block transition-opacity duration-300 pointer-events-none" aria-hidden="true" />

              <button className="flex items-center gap-2 bg-primary text-secondary px-6 py-2.5 rounded-md font-bold transition-colors relative z-20 cursor-pointer">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
                All Categories
                <svg className="w-4 h-4 ml-2 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Level 1: Main Dropdown */}
              <div className="absolute top-full left-0 w-64 hidden group-hover:block animate-in fade-in zoom-in-95 duration-100 z-50">
                <div className="bg-white shadow-xl border border-gray-100 overflow-visible relative rounded-md">
                  {categories.map((cat, idx) => (
                    <div key={idx} className="group/item static">
                      <Link
                        href={cat.href}
                        // Hover style: Left Yellow Border, Gray Background, No Text Color Change
                        // Added: border-b for dividers, conditional arrow
                        className={`flex items-center justify-between px-5 py-3.5 text-gray-700 hover:bg-gray-50 border-l-4 border-l-transparent hover:border-l-primary transition-colors font-medium ${idx !== categories.length - 1 ? 'border-b border-b-gray-200' : ''}`}
                      >
                        {cat.name}
                        {/* Arrow now shown for all since all have submenus */}
                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>

                      {/* Level 2: Mega Menu Panel */}
                      {cat.hasMegaMenu && (
                        <div className="absolute left-full top-0 w-[800px] h-[500px] bg-white shadow-xl border border-gray-100 rounded-md hidden group-hover/item:block p-8 z-50 -ml-[1px]">
                          {/* Using -ml-[1px] to ensure connectivity and cover borders */}
                          <div className="grid grid-cols-2 gap-x-12 gap-y-8 h-full">
                            {cat.subs?.map((section, sIdx) => (
                              <div key={sIdx}>
                                <h3 className="font-bold text-secondary text-base mb-4 border-b border-gray-100 pb-2">{section.title}</h3>
                                <ul className="space-y-3">
                                  {section.items.map((item, iIdx) => (
                                    <li key={iIdx}>
                                      <Link href="#" className="text-gray-500 hover:text-primary transition-colors text-sm">
                                        {item}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-3xl px-8 search-container" ref={searchRef}>
              <div className="w-full relative">
                <input
                  type="text"
                  placeholder="Search for power tools..."
                  className={`w-full h-11 pl-4 pr-12 rounded-md border-0 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 ${isSearchFocused ? '' : ''}`}
                  onFocus={() => setIsSearchFocused(true)}
                />
                <button className="absolute right-0 top-0 h-11 w-12 flex items-center justify-center text-gray-500 hover:text-primary">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>

                {/* Search Recommendations Dropdown */}
                {isSearchFocused && <SearchDropdown />}
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-6">
              {/* Desktop Contact */}
              <div className="hidden xl:flex flex-col items-end text-right text-white">
                <div className="font-bold text-sm">+91 - 987 654 3210</div>
                <div className="text-xs text-gray-400">support@mechanicalcity.com</div>
              </div>

              {/* Icons */}
              <div className="flex items-center gap-4 text-white">
                {/* User Icon */}
                <Link href={user ? (user.role === 'admin' ? '/admin' : '/orders') : '/login'} className="hidden sm:block p-1 hover:text-primary transition-colors">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </Link>

                {/* Cart Icon */}
                <Link href="/cart" className="relative p-1 hover:text-primary transition-colors">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {mounted && totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-secondary">
                      {totalItems}
                    </span>
                  )}
                </Link>

                {/* Mobile Menu Toggle */}
                <button
                  className="lg:hidden p-1 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {isMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

          </div>

          {/* Mobile Search Row */}
          <div className="lg:hidden pb-4 search-container">
            <div className="w-full relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full h-10 pl-4 pr-10 rounded-md border-0 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0"
                onFocus={() => setIsSearchFocused(true)}
              />
              <button className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center text-gray-500 hover:text-primary">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Mobile Search Recommendations Dropdown */}
              {isSearchFocused && <SearchDropdown />}
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Navigation Bar (Light) */}
      <div className="bg-[#edf5f5] border-b border-gray-200 hidden lg:block">
        <div className="layout-container">
          <div className="flex items-center justify-between h-12 text-[14px] font-medium text-gray-600">
            {/* Left Links */}
            <div className="flex items-center gap-7">
              <Link href="/" className="flex items-center hover:text-primary transition-colors border-b-2 border-primary h-12 text-primary">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </Link>
              <Link href="/products" className="hover:text-primary transition-colors">Elements</Link>
              <Link href="/products" className="hover:text-primary transition-colors">Shop</Link>
              <Link href="/products" className="hover:text-primary transition-colors">Collections</Link>
              <Link href="/about" className="hover:text-primary transition-colors">About us</Link>
              <Link href="/news" className="hover:text-primary transition-colors">News</Link>
              <Link href="/contact" className="hover:text-primary transition-colors">Contact us</Link>
              <Link href="/wishlist" className="flex items-center gap-1 hover:text-primary transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Wishlist
              </Link>
              <Link href="/compare" className="flex items-center gap-1 hover:text-primary transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Compare
              </Link>
            </div>

            {/* Right Links */}
            <div className="flex items-center gap-7">
              <Link href="/clearance" className="hover:text-primary transition-colors">Clearance</Link>
              <Link href="/deals" className="flex items-center gap-1 hover:text-primary transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Special Deals
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Navigation */}
      {/* Mobile Sidebar Navigation (Always Rendered for Animation) */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${isMenuOpen ? 'pointer-events-auto visible' : 'pointer-events-none invisible delay-300'}`}>

        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMenuOpen(false)}
        ></div>

        {/* Close Button (Outside - Fades In) */}
        <button
          className={`absolute top-6 right-[320px] p-2 bg-white text-secondary rounded-full hover:bg-gray-100 z-50 shadow-lg transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMenuOpen(false)}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Sidebar Wrapper with Animation (Slides In) */}
        <div
          className={`absolute top-0 right-0 h-full w-[300px] bg-secondary shadow-xl flex flex-col transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >

          {/* Sidebar Top: Logo & Search */}
          <div className="p-6 pb-0">
            <div className="flex justify-center mb-6">
              <span className="text-2xl font-black tracking-tighter text-white uppercase">
                MECHANICAL<span className="text-primary">CITY</span>
              </span>
            </div>
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="What are you looking for..."
                className="w-full h-10 pl-4 pr-10 rounded-sm border-0 bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none"
                onFocus={() => setIsSearchFocused(true)}
              />
              <button className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center text-gray-500 hover:text-primary">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Tabs Header */}
          <div className="flex text-white font-bold text-sm tracking-wider uppercase border-b border-white/10">
            <button
              onClick={() => setActiveMobileTab('menu')}
              className={`flex-1 py-4 text-center border-b-2 transition-colors ${activeMobileTab === 'menu' ? 'border-white text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
            >
              Menu
            </button>
            <button
              onClick={() => setActiveMobileTab('categories')}
              className={`flex-1 py-4 text-center border-b-2 transition-colors ${activeMobileTab === 'categories' ? 'border-white text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
            >
              Categories
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeMobileTab === 'menu' ? (
              <nav className="flex flex-col space-y-4">
                <Link href="/" className="text-white hover:text-primary font-bold uppercase text-sm border-b border-white/10 pb-3" onClick={() => setIsMenuOpen(false)}>Home</Link>
                <Link href="/products" className="text-white hover:text-primary font-bold uppercase text-sm border-b border-white/10 pb-3" onClick={() => setIsMenuOpen(false)}>Elements</Link>
                <Link href="/products" className="text-white hover:text-primary font-bold uppercase text-sm border-b border-white/10 pb-3" onClick={() => setIsMenuOpen(false)}>Shop</Link>
                <Link href="/products" className="text-white hover:text-primary font-bold uppercase text-sm border-b border-white/10 pb-3" onClick={() => setIsMenuOpen(false)}>Collections</Link>
                <Link href="/about" className="text-white hover:text-primary font-bold uppercase text-sm border-b border-white/10 pb-3" onClick={() => setIsMenuOpen(false)}>About Us</Link>
                <Link href="/news" className="text-white hover:text-primary font-bold uppercase text-sm border-b border-white/10 pb-3" onClick={() => setIsMenuOpen(false)}>News</Link>
                <Link href="/contact" className="text-white hover:text-primary font-bold uppercase text-sm border-b border-white/10 pb-3" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>

                {user ? (
                  <>
                    <Link href={user.role === 'admin' ? '/admin' : '/orders'} className="text-white hover:text-primary font-bold uppercase text-sm border-b border-white/10 pb-3" onClick={() => setIsMenuOpen(false)}>
                      {user.role === 'admin' ? 'Dashboard' : 'My Orders'}
                    </Link>
                    <button onClick={handleLogout} className="text-left text-gray-400 hover:text-white font-bold uppercase text-sm border-b border-white/10 pb-3">Logout</button>
                  </>
                ) : (
                  <>
                    <Link href="/wishlist" className="flex items-center gap-2 text-white hover:text-primary font-bold uppercase text-sm border-b border-white/10 pb-3" onClick={() => setIsMenuOpen(false)}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                      Wishlist
                    </Link>
                    <Link href="/compare" className="flex items-center gap-2 text-white hover:text-primary font-bold uppercase text-sm border-b border-white/10 pb-3" onClick={() => setIsMenuOpen(false)}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                      Compare
                    </Link>
                    <div className="pt-2 flex flex-col gap-2">
                      <Link href="/login" className="text-white hover:text-primary font-bold uppercase text-sm" onClick={() => setIsMenuOpen(false)}>Login</Link>
                      <Link href="/register" className="text-white hover:text-primary font-bold uppercase text-sm" onClick={() => setIsMenuOpen(false)}>Register</Link>
                    </div>
                  </>
                )}

              </nav>
            ) : (
              <nav className="flex flex-col space-y-4">
                {categories.map((cat, idx) => (
                  <Link
                    key={idx}
                    href={cat.href}
                    className="text-white hover:text-primary font-bold uppercase text-sm border-b border-white/10 pb-3 flex justify-between items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {cat.name}
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </nav>
            )}
          </div>

          {/* Footer Contact Info */}
          <div className="p-6 border-t border-white/10 text-white">
            <div className="font-bold text-lg mb-1">+30 (0) 1234 56789</div>
            <div className="text-gray-400 text-sm">support@example.com</div>
          </div>
        </div>
      </div>
    </header >
  )
}
