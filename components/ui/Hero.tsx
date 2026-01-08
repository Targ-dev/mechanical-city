import React from 'react'

interface HeroProps {
    title: string
    subtitle: string
    backgroundImage?: string
}

export default function Hero({ title, subtitle }: HeroProps) {
    return (
        <section className="text-center py-12 bg-gray-50 rounded-xl mb-8">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                    {title}
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                    {subtitle}
                </p>
            </div>
        </section>
    )
}
