'use client'

import React, { useState } from 'react'

const offices = [
    {
        id: 'corporate',
        title: 'Mechanical City',
        subtitle: 'Corporate Office',
        addressLines: [
            '121 King Street, Collins Melbourne,',
            'Victoria 3000,',
            'Australia.'
        ],
        phone: '+91 799 444 1050',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3932.4949442976613!2d76.31458197507442!3d9.724074990367715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b087d92fa24a3fb%3A0xd43a4e90467bf5b8!2sMechanical%20city%20Powertools%20Sales%20and%20Service!5e0!3m2!1sen!2sin!4v1768497027538!5m2!1sen!2sin'
    },
    {
        id: 'branch',
        title: 'Mechanical City',
        subtitle: 'Branch Office',
        addressLines: [
            '456 Queens Road, Sydney,',
            'NSW 2000,',
            'Australia.'
        ],
        phone: '+91 799 444 1051',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3932.8907111011767!2d76.33426617507398!3d9.690368290399793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b087d617fa21c61%3A0xaec514c8142bd6f9!2sMechanical%20city%20cherthala!5e0!3m2!1sen!2sin!4v1768497137239!5m2!1sen!2sin'
    }
]

export default function ContactPage() {
    const [activeIndex, setActiveIndex] = useState(0)
    const office = offices[activeIndex]

    const nextOffice = () => setActiveIndex((prev) => (prev + 1) % offices.length)
    const prevOffice = () => setActiveIndex((prev) => (prev - 1 + offices.length) % offices.length)

    return (
        <>
            {/* Banner Section */}
            <section className="bg-secondary grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
                <div className="flex flex-col justify-center px-8 py-12 md:px-16 lg:px-24">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
                        Contact <span className="text-primary">Us</span>
                    </h1>
                    <p className="text-base md:text-lg text-gray-400 mt-4 max-w-md leading-relaxed font-medium">
                        We're here to help you with all your power tool needs. Reach out to us for expert advice and support.
                    </p>
                </div>
                <div className="relative h-full hidden lg:block">
                    <img
                        src="/images/banners/2.jpg"
                        alt="Mechanical City Tools"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>
            </section>

            {/* Address Slider Section - Wrapped in a Card */}
            <section className="py-16 bg-gray-50/50">
                <div className="layout-container">
                    <div className="bg-white rounded-[2rem] shadow-2xl shadow-secondary/10 overflow-hidden border border-gray-100 flex flex-col lg:flex-row h-[550px]">
                        {/* Left: Address Slider */}
                        <div className="w-full lg:w-1/2 bg-white flex items-center justify-center relative px-8 py-10">
                            {/* Navigation Arrows */}
                            <button
                                onClick={prevOffice}
                                className="absolute left-4 lg:left-6 p-2.5 text-secondary hover:text-primary transition-colors bg-gray-50 rounded-full shadow-sm hover:shadow-md z-10"
                                aria-label="Previous office"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            <button
                                onClick={nextOffice}
                                className="absolute right-4 lg:right-8 p-2.5 text-secondary hover:text-primary transition-colors bg-gray-50 rounded-full shadow-sm hover:shadow-md z-10"
                                aria-label="Next office"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>

                            <div className="flex flex-col items-center text-center animate-in fade-in duration-500 scale-in-95" key={activeIndex}>
                                {/* Location Icon */}
                                <div className="mb-6">
                                    <div className="w-16 h-16 bg-secondary/5 rounded-full flex items-center justify-center border-2 border-secondary/10 relative">
                                        <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-0.5 w-10 bg-primary rounded-full"></div>
                                    </div>
                                </div>

                                {/* Title & Subtitle */}
                                <h3 className="text-2xl font-black text-secondary tracking-tight mb-1 uppercase">
                                    {office.title}
                                </h3>
                                <h4 className="text-lg font-bold text-primary mb-8">
                                    {office.subtitle}
                                </h4>

                                {/* Address Lines */}
                                <div className="text-gray-500 font-medium text-base leading-relaxed space-y-1.5 mb-8">
                                    {office.addressLines.map((line, i) => (
                                        <p key={i}>{line}</p>
                                    ))}
                                </div>

                                {/* Phone Number */}
                                <p className="text-2xl font-black text-secondary tracking-tight">
                                    {office.phone}
                                </p>
                            </div>
                        </div>

                        {/* Right: Map */}
                        <div className="w-full lg:w-1/2 h-full bg-gray-100 relative">
                            <iframe
                                key={activeIndex}
                                src={office.mapUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="absolute inset-0"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form & Details Section */}
            <section className="py-20 lg:py-10 bg-surface">
                <div className="layout-container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                        {/* Left: Contact Info */}
                        <div className="space-y-12">
                            <div>
                                <h2 className="text-4xl font-black text-secondary tracking-tight mb-6 uppercase">
                                    Get In <span className="text-primary">Touch</span>
                                </h2>
                                <p className="text-lg text-gray-500 leading-relaxed font-medium">
                                    Have a specific inquiry or just want to say hello? Our team is standing by to assist you with technical specs, order tracking, or wholesale inquiries.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4 group">
                                    <div className="w-12 h-12 bg-secondary/5 rounded-lg flex items-center justify-center text-secondary group-hover:bg-primary group-hover:text-secondary transition-all">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    </div>
                                    <h4 className="text-lg font-bold text-secondary uppercase tracking-tight">Email Support</h4>
                                    <p className="text-gray-500 font-medium">support@mechanicalcity.com<br />info@mechanicalcity.com</p>
                                </div>
                                <div className="space-y-4 group">
                                    <div className="w-12 h-12 bg-secondary/5 rounded-lg flex items-center justify-center text-secondary group-hover:bg-primary group-hover:text-secondary transition-all">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                    </div>
                                    <h4 className="text-lg font-bold text-secondary uppercase tracking-tight">Phone Support</h4>
                                    <p className="text-gray-500 font-medium">+91-987-654-3210<br />+91-987-654-3211</p>
                                </div>
                                <div className="space-y-4 group">
                                    <div className="w-12 h-12 bg-secondary/5 rounded-lg flex items-center justify-center text-secondary group-hover:bg-primary group-hover:text-secondary transition-all">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </div>
                                    <h4 className="text-lg font-bold text-secondary uppercase tracking-tight">Business Hours</h4>
                                    <p className="text-gray-500 font-medium">Mon - Sat: 9:00 AM - 7:00 PM<br />Sunday: Closed</p>
                                </div>
                            </div>
                        </div>

                        {/* Right: Contact Form */}
                        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100">
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-secondary mb-2 uppercase tracking-wider">Full Name</label>
                                        <input
                                            type="text"
                                            className="w-full bg-gray-50 border-0 text-secondary px-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-secondary mb-2 uppercase tracking-wider">Email Address</label>
                                        <input
                                            type="email"
                                            className="w-full bg-gray-50 border-0 text-secondary px-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-secondary mb-2 uppercase tracking-wider">Subject</label>
                                    <input
                                        type="text"
                                        className="w-full bg-gray-50 border-0 text-secondary px-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                                        placeholder="Order Inquiry"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-secondary mb-2 uppercase tracking-wider">Message</label>
                                    <textarea
                                        rows={6}
                                        className="w-full bg-gray-50 border-0 text-secondary px-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium resize-none"
                                        placeholder="How can we help you today?"
                                    ></textarea>
                                </div>
                                <button
                                    type="button"
                                    className="w-full bg-primary text-secondary font-black py-4 rounded-xl hover:bg-yellow-500 transform hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-primary/20 uppercase tracking-widest text-sm"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
