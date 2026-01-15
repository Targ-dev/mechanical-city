import React from 'react'

export default function AboutPage() {
    return (
        <>
            {/* Banner Section */}
            <section className="bg-secondary grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
                <div className="flex flex-col justify-center px-8 py-12 md:px-16 lg:px-24">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
                        About <span className="text-primary">Us</span>
                    </h1>
                    <p className="text-base md:text-lg text-gray-400 mt-4 max-w-md leading-relaxed font-medium">
                        Your trusted partner in professional-grade power tools, committed to excellence and durability since 2010.
                    </p>
                </div>
                <div className="relative h-full hidden lg:block">
                    <img
                        src="/images/banners/about-us.webp"
                        alt="Mechanical City Workshop"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>
            </section>

            {/* Innovation and Simplicity Section */}
            <section className="bg-background py-20 lg:py-32">
                <div className="layout-container">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr,1.5fr] gap-16 lg:gap-24 items-start">
                        {/* Left: Text Content */}
                        <div className="space-y-8">
                            <h2 className="text-4xl md:text-5xl font-black text-secondary tracking-tight">
                                Innovation <br className="hidden md:block" /> and <span className="text-primary">Simplicity</span>
                            </h2>
                            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                                <p>
                                    Mechanical City was founded in 2010, and now commands a significant
                                    presence in the online tools market, as one of the largest independent
                                    suppliers of power tools, handyman tools, range of accessories and all
                                    kind of construction consumables.
                                </p>
                                <p>
                                    With over 10,000 products in stock, from wrenches, saws, grinders &
                                    drills through to reciprocating saws, and nail guns.
                                </p>
                            </div>
                        </div>

                        {/* Right: Feature Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 mt-8 lg:mt-0">
                            {/* Verified Professionals */}
                            <div className="flex gap-6 group">
                                <div className="flex-shrink-0">
                                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-secondary mb-2">Verified professionals</h3>
                                    <p className="text-gray-500 leading-relaxed font-medium">One of the largest independent suppliers of tools</p>
                                </div>
                            </div>

                            {/* Trusted & Experienced */}
                            <div className="flex gap-6 group">
                                <div className="flex-shrink-0">
                                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-secondary mb-2">Trusted & Experienced</h3>
                                    <p className="text-gray-500 leading-relaxed font-medium">We command a bigger presence in the online market</p>
                                </div>
                            </div>

                            {/* Reliable & Fully Insured */}
                            <div className="flex gap-6 group">
                                <div className="flex-shrink-0">
                                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.757c1.27 0 2.539.352 3.536 1.001.03.019.06.039.088.06.287.21.503.504.605.852l.244.821c.21.705-.205 1.442-.91 1.652-.08.024-.162.036-.244.036H11.5c-.828 0-1.5-.672-1.5-1.5V10M14 10V5.5c0-.828-.672-1.5-1.5-1.5H8M14 10H8m0 0V5.5C8 4.672 7.328 4 6.5 4H4m4 6H4m0 0v8c0 .828.672 1.5 1.5 1.5H11M11 22v-3.5c0-.828.672-1.5 1.5-1.5h8c.828 0 1.5.672 1.5 1.5V22" />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-secondary mb-2">Reliable & Fully Insured</h3>
                                    <p className="text-gray-500 leading-relaxed font-medium">Accessories and big construction consumables</p>
                                </div>
                            </div>

                            {/* Money-back guarantee */}
                            <div className="flex gap-6 group">
                                <div className="flex-shrink-0">
                                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-secondary mb-2">Money-back guarantee</h3>
                                    <p className="text-gray-500 leading-relaxed font-medium">Our staff are fully trained across the entire range of tools</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Goal, Vision, Mission Grid Section */}
            <section className="bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {/* Item 1: Image */}
                    <div className="aspect-[4/3] w-full overflow-hidden">
                        <img
                            src="/images/banners/1.jpg"
                            alt="Mechanical City Work"
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </div>

                    {/* Item 2: Our Goal */}
                    <div className="aspect-[4/3] flex flex-col justify-center items-center text-center p-8 bg-surface">
                        <div className="mb-4">
                            <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.976-2.888a1 1 0 00-1.175 0l-3.976 2.888c-.784.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-black text-secondary uppercase tracking-tight mb-4">Our Goal</h3>
                        <p className="text-gray-500 max-w-xs leading-relaxed">
                            To be the leading global provider of high-performance tools, empowering every project with precision and efficiency.
                        </p>
                    </div>

                    {/* Item 3: Image */}
                    <div className="aspect-[4/3] w-full overflow-hidden">
                        <img
                            src="/images/banners/2.jpg"
                            alt="Mechanical City Tools"
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </div>

                    {/* Item 4: Our Vision */}
                    <div className="aspect-[4/3] flex flex-col justify-center items-center text-center p-8 bg-surface">
                        <div className="mb-4">
                            <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-black text-secondary uppercase tracking-tight mb-4">Our Vision</h3>
                        <p className="text-gray-500 max-w-xs leading-relaxed">
                            Continuous innovation in engineering technology, making professional craftsmanship accessible to all.
                        </p>
                    </div>

                    {/* Item 5: Image */}
                    <div className="aspect-[4/3] w-full overflow-hidden">
                        <img
                            src="/images/banners/3.jpg"
                            alt="Mechanical City Precision"
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </div>

                    {/* Item 6: Our Mission */}
                    <div className="aspect-[4/3] flex flex-col justify-center items-center text-center p-8 bg-surface">
                        <div className="mb-4">
                            <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-black text-secondary uppercase tracking-tight mb-4">Our Mission</h3>
                        <p className="text-gray-500 max-w-xs leading-relaxed">
                            Delivering durability and reliability in every tool, ensuring our customers can work with ultimate confidence.
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}
