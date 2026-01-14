import React from 'react';
import Link from 'next/link';

const PromoBanners = () => {
    return (
        <section className="py-8 md:py-12 bg-white">
            <div className="layout-container">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {/* Left Banner - Circular Saw */}
                    <div className="relative overflow-hidden rounded-xl bg-gray-900 aspect-[21/9] md:aspect-[16/7] group cursor-pointer transition-transform duration-300 hover:scale-[1.01]">
                        <img
                            src="/images/banners/2.jpg"
                            alt="Circular Saw Offer"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-center max-w-[60%]">
                            <span className="text-white text-xs md:text-sm font-semibold tracking-wider mb-2">
                                UP TO 10% OFF
                            </span>
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-6 uppercase leading-tight">
                                Circular Saw <br />
                                <span className="text-[#FFB800]">With Laser</span>
                            </h2>
                            <Link href="/products?category=saws">
                                <span className="inline-block bg-[#E31E24] text-white text-sm md:text-base font-bold px-6 py-2.5 rounded-lg hover:bg-[#C1181F] transition-colors">
                                    SHOP NOW
                                </span>
                            </Link>
                        </div>
                    </div>

                    {/* Right Banner - DeWalt Machine */}
                    <div className="relative overflow-hidden rounded-xl bg-[#FFB800] aspect-[21/9] md:aspect-[16/7] group cursor-pointer transition-transform duration-300 hover:scale-[1.01]">
                        <img
                            src="/images/banners/1.jpg"
                            alt="DeWalt Machine Offer"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-center max-w-[60%]">
                            <span className="text-black text-xs md:text-sm font-semibold tracking-wider mb-2">
                                UP TO 35% OFF
                            </span>
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-black mb-6 uppercase leading-tight">
                                DEWALT DW715 <br />
                                NEW MACHINE
                            </h2>
                            <Link href="/products?query=dewalt">
                                <span className="inline-block bg-[#E31E24] text-white text-sm md:text-base font-bold px-6 py-2.5 rounded-lg hover:bg-[#C1181F] transition-colors">
                                    SHOP NOW
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PromoBanners;
