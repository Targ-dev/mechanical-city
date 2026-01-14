'use client'

import { useState } from 'react'
import TrendingProductCard from './TrendingProductCard'

// Mock Data
const TABS = ['POWER TOOLS', 'HAND TOOLS', 'HAMMER TOOLS']

const MOCK_PRODUCTS = [
    {
        id: '1',
        name: 'Porter Cable PCCK640 Impact Driver, 1/4-Inch',
        slug: 'impact-driver',
        price: 99.00,
        originalPrice: 110.00,
        image: '/images/products/1.png',
        rating: 5,
        reviews: 2,
        discount: 10,
        category: { name: 'Power Tools', slug: 'power-tools' },
        description: 'High performance impact driver.'
    },
    {
        id: '2',
        name: 'Black+Decker 550W Variable Speed Hammer Drill',
        slug: 'hammer-drill',
        price: 180.00,
        originalPrice: 180.00,
        image: '/images/products/2.jpeg',
        rating: 4.5,
        reviews: 4,
        discount: 0,
        category: { name: 'Power Tools', slug: 'power-tools' },
        description: 'Variable speed hammer drill.'
    },
    {
        id: '3',
        name: 'Dewalt DCS331N-XJ XR Lithium-Ion Jigsaw',
        slug: 'jigsaw',
        price: 105.00,
        originalPrice: 105.00,
        image: '/images/products/3.jpg',
        rating: 5,
        reviews: 5,
        discount: 0,
        category: { name: 'Power Tools', slug: 'power-tools' },
        description: 'Wireless jigsaw for precision cutting.'
    },
    {
        id: '4',
        name: 'Bosch BH2760VC Brute Breaker Hammer',
        slug: 'breaker-hammer',
        price: 90.00,
        originalPrice: 90.00,
        image: '/images/products/4.jpg',
        rating: 4,
        reviews: 3,
        discount: 0,
        category: { name: 'Hammer Tools', slug: 'hammer-tools' },
        description: 'Heavy duty breaker hammer.'
    },
    {
        id: '5',
        name: 'Paslode IM90Ci Impulse Framing Combo Nailer',
        slug: 'nailer',
        price: 129.00,
        originalPrice: 129.00,
        image: '/images/products/5.webp',
        rating: 4.5,
        reviews: 5,
        discount: 0,
        category: { name: 'Power Tools', slug: 'power-tools' },
        description: 'Framing combo nailer.'
    },
    {
        id: '6',
        name: 'DEWALT 25-Gallons 200 PSI Air Compressor',
        slug: 'air-compressor',
        price: 139.50,
        originalPrice: 150.00,
        image: '/images/products/6.webp',
        rating: 4,
        reviews: 2,
        discount: 7,
        category: { name: 'Power Tools', slug: 'power-tools' },
        description: 'High capacity air compressor.'
    },
    {
        id: '7',
        name: 'Circular Saw Ryobi R18MMS 18 V Compact',
        slug: 'circular-saw',
        price: 55.00,
        originalPrice: 55.00,
        image: '/images/products/2.jpeg', // Reusing image for demo
        rating: 4,
        reviews: 2,
        discount: 0,
        category: { name: 'Power Tools', slug: 'power-tools' },
        description: 'Compact circular saw.'
    },
    {
        id: '8',
        name: 'Dewalt XTREME 12V Brushless Circular Saw',
        slug: 'brushless-saw',
        price: 65.00,
        originalPrice: 65.00,
        image: '/images/products/3.jpg', // Reusing image for demo
        rating: 3.5,
        reviews: 4,
        discount: 0,
        category: { name: 'Power Tools', slug: 'power-tools' },
        description: 'Brushless circular saw.'
    },
    {
        id: '9',
        name: 'DeWalt D55151 Electric Hand Carry Air Compressor',
        slug: 'hand-compressor',
        price: 76.00,
        originalPrice: 80.00,
        image: '/images/products/4.jpg', // Reusing image for demo
        rating: 4.5,
        reviews: 3,
        discount: 5,
        category: { name: 'Hand Tools', slug: 'hand-tools' },
        description: 'Portable air compressor.'
    },
    {
        id: '10',
        name: 'Black & Decker BDROUT127 1600W Router',
        slug: 'router',
        price: 59.00,
        originalPrice: 59.00,
        image: '/images/products/5.webp', // Reusing image for demo
        rating: 4,
        reviews: 4,
        discount: 0,
        category: { name: 'Power Tools', slug: 'power-tools' },
        description: 'High power router.'
    }
]

// State for pagination
export default function TrendingProducts() {
    // State for pagination
    const [page, setPage] = useState(0)
    const [activeTab, setActiveTab] = useState(TABS[0])
    const ITEMS_PER_PAGE_MOBILE = 4 // 2 rows * 2 cols
    const ITEMS_PER_PAGE_DESKTOP = 10 // Show all or max

    // Mock different behavior for mobile vs desktop or just simple pagination
    // Ideally we detect screen size or just use CSS to hide/show but React state is easier for slicing.
    // For simplicity, let's just paginate always but on desktop we might show more? 
    // Actually simplicity: Just show 4 items on mobile view?
    // Responsive design usually just flows. 
    // But user wants "arrow buttons". This implies hiding items.

    // Let's implement a simple pagination that slices the MOCK_PRODUCTS.
    // We need to check if we are on mobile? No, server component issues.
    // Best CSS approach:
    // Show all on desktop? Or Grid slider.
    // Let's implement a wrapper that acts as a slider/grid.

    // Simpler approach matching the request:
    // Just render the products.
    // On mobile, show only 4? (2 rows).
    // And have Next/Prev buttons that change the visible set.

    const [mobilePage, setMobilePage] = useState(0)
    const totalMobilePages = Math.ceil(MOCK_PRODUCTS.length / ITEMS_PER_PAGE_MOBILE)

    const nextMobilePage = () => {
        setMobilePage((prev) => (prev + 1) % totalMobilePages)
    }

    const prevMobilePage = () => {
        setMobilePage((prev) => (prev - 1 + totalMobilePages) % totalMobilePages)
    }

    // Slice for mobile
    const mobileStart = mobilePage * ITEMS_PER_PAGE_MOBILE
    const mobileProducts = MOCK_PRODUCTS.slice(mobileStart, mobileStart + ITEMS_PER_PAGE_MOBILE)

    // For desktop we show 10 (or all)
    const desktopProducts = MOCK_PRODUCTS.slice(0, 10)

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
                            {[...Array(totalMobilePages)].map((_, pageIndex) => (
                                <div key={pageIndex} className="w-full flex-shrink-0 px-1">
                                    <div className="grid grid-cols-2 gap-4">
                                        {MOCK_PRODUCTS.slice(pageIndex * ITEMS_PER_PAGE_MOBILE, (pageIndex + 1) * ITEMS_PER_PAGE_MOBILE).map((product) => (
                                            <TrendingProductCard key={product.id} product={product} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
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

                    {/* Page Indicator */}
                    <div className="flex justify-center mt-4 gap-1">
                        {[...Array(totalMobilePages)].map((_, i) => (
                            <div key={i} className={`h-1.5 rounded-full transition-all ${i === mobilePage ? 'w-6 bg-[#FFC400]' : 'w-1.5 bg-gray-300'}`} />
                        ))}
                    </div>
                </div>

                {/* Desktop View (Grid as before) */}
                <div className="hidden lg:grid lg:grid-cols-5 gap-6">
                    {desktopProducts.map((product) => (
                        <TrendingProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    )
}
