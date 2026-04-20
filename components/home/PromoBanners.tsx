import React from 'react';
import Link from 'next/link';
import connectDB from '@/lib/db';
import SiteConfig from '@/models/SiteConfig';

export default async function PromoBanners() {
    let config = null;
    try {
        await connectDB()
        config = await SiteConfig.findOne()
    } catch (error) {
        console.error('DB Config Error in PromoBanners:', error)
    }

    const banners = config?.banners || [];
    
    // Fallbacks
    const promo1 = banners[1] || {
        imageUrl: '/images/banners/2.jpg',
        subtitle: 'UP TO 10% OFF',
        titleHtml: 'Circular Saw <br />\n<span class="text-[#FFB800]">With Laser</span>',
        buttonText: 'SHOP NOW',
        buttonLink: '/products?category=saws'
    };

    const promo2 = banners[2] || {
        imageUrl: '/images/banners/1.jpg',
        subtitle: 'UP TO 35% OFF',
        titleHtml: 'DEWALT DW715 <br />\nNEW MACHINE',
        buttonText: 'SHOP NOW',
        buttonLink: '/products?query=dewalt'
    };

    return (
        <section className="py-8 md:py-12 bg-white">
            <div className="layout-container">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {/* Left Banner */}
                    <div className="relative overflow-hidden rounded-xl bg-gray-900 aspect-[16/9] md:aspect-[16/7] group cursor-pointer transition-transform duration-300 hover:scale-[1.01]">
                        <img
                            src={promo1.imageUrl}
                            alt="Promo Offer 1"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-center max-w-[75%] md:max-w-[60%]">
                            <span className="text-white text-[10px] md:text-sm font-semibold tracking-wider mb-1 md:mb-2 drop-shadow-md">
                                {promo1.subtitle}
                            </span>
                            <h2 
                                className="text-[16px] leading-[1.2] sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 md:mb-6 uppercase [&>span]:text-[#FFB800] drop-shadow-md"
                                dangerouslySetInnerHTML={{ __html: promo1.titleHtml }}
                            />
                            <div>
                                <Link href={promo1.buttonLink}>
                                    <span className="inline-block bg-[#E31E24] text-white text-xs md:text-base font-bold px-4 py-2 md:px-6 md:py-2.5 rounded-md md:rounded-lg hover:bg-[#C1181F] transition-colors shadow-sm">
                                        {promo1.buttonText}
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Right Banner */}
                    <div className="relative overflow-hidden rounded-xl bg-[#FFB800] aspect-[16/9] md:aspect-[16/7] group cursor-pointer transition-transform duration-300 hover:scale-[1.01]">
                        <img
                            src={promo2.imageUrl}
                            alt="Promo Offer 2"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-center max-w-[75%] md:max-w-[60%]">
                            <span className="text-black text-[10px] md:text-sm font-semibold tracking-wider mb-1 md:mb-2 drop-shadow-sm">
                                {promo2.subtitle}
                            </span>
                            <h2 
                                className="text-[16px] leading-[1.2] sm:text-xl md:text-2xl lg:text-3xl font-bold text-black mb-3 md:mb-6 uppercase [&>span]:text-black drop-shadow-sm"
                                dangerouslySetInnerHTML={{ __html: promo2.titleHtml }}
                            />
                            <div>
                                <Link href={promo2.buttonLink}>
                                    <span className="inline-block bg-[#E31E24] text-white text-xs md:text-base font-bold px-4 py-2 md:px-6 md:py-2.5 rounded-md md:rounded-lg hover:bg-[#C1181F] transition-colors shadow-sm">
                                        {promo2.buttonText}
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
