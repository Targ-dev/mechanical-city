import React from 'react'

interface HeroProps {
    title: string
    subtitle: string
    backgroundImage?: string
}

export default function Hero({ title, subtitle, backgroundImage }: HeroProps) {
    return (
        <section className="relative h-[600px] flex items-center justify-center bg-gray-900 rounded-xl overflow-hidden mb-12">
            {/* Background Image */}
            {backgroundImage && (
                <div
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{ backgroundImage: `url('${backgroundImage}')` }}
                />
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 z-10" />

            {/* Content */}
            <div className="relative z-20 max-w-4xl mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight drop-shadow-sm">
                    {title}
                </h1>
                <p className="text-lg md:text-2xl text-gray-200 max-w-2xl mx-auto font-medium drop-shadow-sm">
                    {subtitle}
                </p>
                <div className="mt-8">
                    <a
                        href="#products"
                        className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition-colors transform hover:scale-105 duration-200"
                    >
                        Shop Now
                    </a>
                </div>
            </div>
        </section>
    )
}
