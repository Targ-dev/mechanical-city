'use client'

import { useEffect, useState } from 'react'
import TrendingProductCard from './TrendingProductCard'

export default function TrendingProducts() {
    const [products, setProducts] = useState<any[]>([])
    const [activeTab, setActiveTab] = useState<string>('')
    const ITEMS_PER_PAGE_MOBILE = 4 // 2 rows * 2 cols
    const ITEMS_PER_PAGE_DESKTOP = 10 
    const [mobilePage, setMobilePage] = useState(0)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/products')
                const data = await res.json()
                if (Array.isArray(data) && data.length > 0) {
                    setProducts(data)
                    // Set active tab to the first dynamically found category
                    const uniqueCategories = Array.from(new Set(data.map((p: any) => p.category?.name?.toUpperCase()))).filter(Boolean) as string[]
                    if (uniqueCategories.length > 0) {
                        setActiveTab(uniqueCategories[0])
                    }
                }
            } catch (err) {
                console.error("Failed to fetch products for Trending section")
            }
        }
        fetchProducts()
    }, [])

    // Derive TABS dynamically from fetched products
    const tabs = Array.from(new Set(products.map((p: any) => p.category?.name?.toUpperCase()))).filter(Boolean) as string[]
    const TABS = tabs.length > 0 ? tabs : ['ALL PRODUCTS'];

    // If an active tab is set, filter by category name
    const filteredProducts = activeTab && activeTab !== 'ALL PRODUCTS'
        ? products.filter((p: any) => p.category?.name?.toUpperCase() === activeTab)
        : products;

    // Reset pagination when active tab changes
    useEffect(() => {
        setMobilePage(0)
    }, [activeTab])

    const totalMobilePages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE_MOBILE)

    const nextMobilePage = () => {
        if(totalMobilePages > 0) setMobilePage((prev) => (prev + 1) % totalMobilePages)
    }

    const prevMobilePage = () => {
        if(totalMobilePages > 0) setMobilePage((prev) => (prev - 1 + totalMobilePages) % totalMobilePages)
    }

    // For desktop we show 10
    const desktopProducts = filteredProducts.slice(0, ITEMS_PER_PAGE_DESKTOP)

    return (
        <section className="py-8 bg-gray-50/50">
            <div className="layout-container">
                {/* Header */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-secondary uppercase tracking-wide mb-8">Trending Products</h2>

                    <div className="overflow-x-auto pb-4 no-scrollbar">
                        <div className="flex justify-start sm:justify-center gap-4 min-w-max px-4">
                            {TABS.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-8 py-3 border text-sm font-bold uppercase transition-colors whitespace-nowrap ${activeTab === tab
                                        ? 'bg-[#FFC400] border-[#FFC400] text-secondary'
                                        : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mobile View (Slider) */}
                <div className="relative block lg:hidden group">
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${mobilePage * 100}%)` }}
                        >
                            {totalMobilePages > 0 ? [...Array(totalMobilePages)].map((_, pageIndex) => (
                                <div key={pageIndex} className="w-full flex-shrink-0 px-1">
                                    <div className="grid grid-cols-2 gap-4">
                                        {filteredProducts.slice(pageIndex * ITEMS_PER_PAGE_MOBILE, (pageIndex + 1) * ITEMS_PER_PAGE_MOBILE).map((product: any) => (
                                            <TrendingProductCard key={product.id} product={product} />
                                        ))}
                                    </div>
                                </div>
                            )) : (
                                <div className="w-full text-center py-8 text-gray-500">No products found for this category.</div>
                            )}
                        </div>
                    </div>

                    {/* Navigation Buttons (Only shown if more than 1 page) */}
                    {totalMobilePages > 1 && (
                        <>
                            <button
                                onClick={prevMobilePage}
                                className="absolute top-1/2 -translate-y-1/2 left-0 bg-white text-gray-800 rounded-full p-2 shadow-lg hover:bg-[#FFC400] hover:text-[#1E1E1E] transition-colors z-10 -ml-3 border border-gray-100"
                                aria-label="Previous"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            </button>
                            <button
                                onClick={nextMobilePage}
                                className="absolute top-1/2 -translate-y-1/2 right-0 bg-white text-gray-800 rounded-full p-2 shadow-lg hover:bg-[#FFC400] hover:text-[#1E1E1E] transition-colors z-10 -mr-3 border border-gray-100"
                                aria-label="Next"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </button>
                        </>
                    )}

                    {/* Page Indicator */}
                    {totalMobilePages > 1 && (
                        <div className="flex justify-center mt-4 gap-1">
                            {[...Array(totalMobilePages)].map((_, i) => (
                                <div key={i} className={`h-1.5 rounded-full transition-all ${i === mobilePage ? 'w-6 bg-[#FFC400]' : 'w-1.5 bg-gray-300'}`} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Desktop View (Grid) */}
                <div className="hidden lg:grid lg:grid-cols-5 gap-6">
                    {desktopProducts.length > 0 ? desktopProducts.map((product: any) => (
                        <TrendingProductCard key={product.id} product={product} />
                    )) : (
                        <div className="col-span-5 text-center py-8 text-gray-500">No products found for this category.</div>
                    )}
                </div>
            </div>
        </section>
    )
}
