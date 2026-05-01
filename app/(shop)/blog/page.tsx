import React from 'react'
import Link from 'next/link'

export default function BlogPage() {
    return (
        <>
            {/* Banner Section */}
            <section className="bg-secondary grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
                <div className="flex flex-col justify-center px-8 py-12 md:px-16 lg:px-24">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
                        Our <span className="text-primary">Blog</span>
                    </h1>
                    <p className="text-base md:text-lg text-gray-400 mt-4 max-w-md leading-relaxed font-medium">
                        Latest news, insights, and expert advice for professionals and DIY enthusiasts.
                    </p>
                </div>
                <div className="relative h-full hidden lg:block bg-surface flex items-center justify-center">
                   <div className="absolute inset-0 bg-primary/5"></div>
                   <div className="absolute inset-0 flex items-center justify-center">
                     <svg className="w-32 h-32 text-primary/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                     </svg>
                   </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="bg-background py-16 lg:py-24">
                <div className="layout-container text-center py-20">
                    <svg className="w-20 h-20 text-gray-300 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                    <h2 className="text-2xl font-bold text-secondary mb-4">Blog Coming Soon</h2>
                    <p className="text-gray-500 max-w-md mx-auto mb-8">
                        We are currently preparing amazing content for you. Check back soon for expert tips, industry news, and tool guides!
                    </p>
                    <Link href="/" className="inline-flex items-center justify-center bg-primary text-secondary px-8 py-3 rounded-md font-bold hover:bg-primary/90 transition-colors">
                        Return to Home
                    </Link>
                </div>
            </section>
        </>
    )
}
