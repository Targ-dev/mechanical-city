'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const CategoriesGrid = () => {
    const [categories, setCategories] = useState<any[]>([]);

    React.useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('/api/categories');
                const data = await res.json();
                if (Array.isArray(data)) {
                    setCategories(data);
                }
            } catch (err) {
                console.error("Failed to fetch categories");
            }
        };
        fetchCategories();
    }, []);

    const [mobilePage, setMobilePage] = useState(0);
    const touchStartX = React.useRef<number | null>(null);
    const touchEndX = React.useRef<number | null>(null);

    // Minimum distance for a swipe to be registered
    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.targetTouches[0].clientX;
    };

    const onTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const onTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) return;

        const distance = touchStartX.current - touchEndX.current;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe && mobilePage < maxMobilePage) {
            setMobilePage(prev => prev + 1);
        } else if (isRightSwipe && mobilePage > 0) {
            setMobilePage(prev => prev - 1);
        }

        // Reset
        touchStartX.current = null;
        touchEndX.current = null;
    };

    // Group categories into columns (2 items per column)
    const columns = [];
    for (let i = 0; i < categories.length; i += 2) {
        columns.push(categories.slice(i, i + 2));
    }

    const VISIBLE_COLUMNS = 3;
    // Total steps to move = total columns - visible columns + 1
    const totalSteps = Math.max(columns.length - VISIBLE_COLUMNS + 1, 0);
    const dotCount = columns.length > 0 ? Math.max(totalSteps, 1) : 0;
    const maxMobilePage = Math.max(totalSteps - 1, 0);

    useEffect(() => {
        setMobilePage((prev) => Math.min(prev, maxMobilePage));
    }, [maxMobilePage]);

    return (
        <section className="py-16 bg-white overflow-hidden">
            <div className="layout-container">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-secondary uppercase tracking-wide mb-4">
                        Shop By Categories
                    </h2>
                    <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
                    <p className="text-muted text-sm max-w-lg mx-auto">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                </div>

                {/* Mobile View Slider */}
                <div
                    className="lg:hidden relative touch-pan-y"
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                >
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${mobilePage * (100 / VISIBLE_COLUMNS)}%)` }}
                    >
                        {columns.map((column, colIndex) => (
                            <div key={colIndex} className="w-1/3 flex-shrink-0 px-1.5">
                                <div className="flex flex-col gap-3">
                                    {column.map((category) => (
                                        <Link
                                            key={category.slug}
                                            href={`/products?category=${category.slug}`}
                                            className="group"
                                        >
                                            <div className="bg-[#F8F9FA] rounded-xl p-4 md:p-6 flex flex-col items-center justify-center h-full min-h-[140px] border border-transparent hover:border-primary/20 transition-all">
                                                <div className="mb-3 w-12 h-12 flex items-center justify-center">
                                                    <img
                                                        src={category.image}
                                                        alt={category.name}
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>
                                                <h3 className="text-[10px] font-bold text-secondary text-center uppercase tracking-tighter leading-tight">
                                                    {category.name}
                                                </h3>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Dots */}
                    <div className="flex justify-center mt-8 gap-2">
                        {[...Array(dotCount)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setMobilePage(i)}
                                className={`h-2.5 rounded-full transition-all duration-300 ${i === mobilePage ? 'w-8 bg-primary' : 'w-2.5 bg-gray-300'
                                    }`}
                                aria-label={`Go to step ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Desktop Grid */}
                <div className="hidden lg:grid grid-cols-7 gap-6">
                    {categories.map((category) => (
                        <Link
                            key={category.slug}
                            href={`/products?category=${category.slug}`}
                            className="group"
                        >
                            <div className="bg-[#F8F9FA] rounded-xl p-8 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-xl hover:bg-white hover:-translate-y-1 border border-transparent hover:border-primary/20 h-full min-h-[180px]">
                                <div className="mb-4 transition-transform duration-300 group-hover:scale-110 flex items-center justify-center">
                                    <div className="w-16 h-16 flex items-center justify-center relative">
                                        <img
                                            src={category.image}
                                            alt={category.name}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                </div>
                                <h3 className="text-xs md:text-sm font-bold text-secondary text-center group-hover:text-primary transition-colors uppercase tracking-tight">
                                    {category.name}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoriesGrid;
