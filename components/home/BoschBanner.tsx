import React from 'react';
import Link from 'next/link';
import connectDB from '@/lib/db';
import SiteConfig from '@/models/SiteConfig';

export default async function BoschBanner() {
    let config = null;
    try {
        await connectDB()
        config = await SiteConfig.findOne()
    } catch (error) {
        console.error('DB Config Error in BoschBanner:', error)
    }

    const banners = config?.banners || [];
    
    // Fallback
    const bosch = banners.find(b => b.bannerId === 'bosch') || {
        imageUrl: '/images/banners/3.jpg',
        subtitle: 'Exclusive Month End Offer',
        titleHtml: '<span class="text-primary block">Bosch GKS 235</span>\n<span class="block">Turbo Circular</span>',
        buttonText: 'Shop Now',
        buttonLink: '/products?search=bosch'
    };

    return (
        <section className="pb-16 bg-white">
            <div className="layout-container">
                <div className="relative overflow-hidden rounded-xl bg-gray-900 aspect-[16/7] md:aspect-[21/6] group cursor-pointer transition-transform duration-300 hover:scale-[1.005]">
                    {/* Background Image */}
                    <img
                        src={bosch.imageUrl}
                        alt="Promo Offer 3"
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 text-white">
                        <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest mb-2 md:mb-3 opacity-90">
                            {bosch.subtitle}
                        </p>
                        <h2 
                            className="text-xl md:text-3xl lg:text-4xl font-extrabold uppercase leading-tight"
                            dangerouslySetInnerHTML={{ __html: bosch.titleHtml }}
                        />

                        <div className="mt-4 md:mt-6">
                            <Link
                                href={bosch.buttonLink}
                                className="inline-block bg-[#E32A24] hover:bg-[#C42420] text-white font-bold py-2 px-6 md:py-2.5 md:px-8 rounded transition-all uppercase text-[10px] md:text-xs active:scale-95 shadow-lg"
                            >
                                {bosch.buttonText}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
