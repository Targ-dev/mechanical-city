import React from 'react'
import connectDB from '@/lib/db'
import SiteConfig from '@/models/SiteConfig'

export default async function Benefits() {
    let config = null;
    try {
        await connectDB()
        config = await SiteConfig.findOne()
    } catch (error) {
        console.error('DB Config Error in Benefits:', error)
    }
    
    // Default features if DB is empty or has no features
    const features = config?.features?.length ? config.features : [
        {
            title: 'Worldwide Shipping',
            description: 'For all Orders Over $100',
            iconSvg: '<svg class="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>'
        },
        {
            title: 'Money Back Guarantee',
            description: 'Guarantee With In 30 Days',
            iconSvg: '<svg class="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'
        },
        {
            title: 'Offers And Discounts',
            description: 'Back Returns In 7 Days',
            iconSvg: '<svg class="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>'
        },
        {
            title: '24/7 Support Services',
            description: 'Contact us Anytime',
            iconSvg: '<svg class="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>'
        }
    ]

    return (
        <section className="py-8 md:py-12 bg-white">
            <div className="layout-container">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                    {features.map((feature: any, idx: number) => (
                        <div key={idx} className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-2 md:gap-4 group cursor-default">
                            <span 
                                className="elementor-icon elementor-animation-grow text-primary [&>svg]:w-7 [&>svg]:h-7 md:[&>svg]:w-10 md:[&>svg]:h-10" 
                                dangerouslySetInnerHTML={{ __html: feature.iconSvg }} 
                            />
                            <div>
                                <h3 className="font-semibold text-[#1E1E1E] text-sm md:text-base">{feature.title}</h3>
                                <p className="text-gray-500 text-xs md:text-sm">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
