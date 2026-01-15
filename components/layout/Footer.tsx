import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const youtubeShorts = [
    { id: 'C1fzwterMSE', url: 'https://youtube.com/shorts/C1fzwterMSE?si=HazUPizBwAV6DpQy' },
    { id: 'r9lqPCsddBs', url: 'https://youtube.com/shorts/r9lqPCsddBs?si=FULJtwxkmpYbzbcc' },
    { id: 'QnEM_odw4eI', url: 'https://youtube.com/shorts/QnEM_odw4eI?si=nFF_NSTb7y6srCsB' },
    { id: 'zq55qotA7nU', url: 'https://youtube.com/shorts/zq55qotA7nU?si=oBTosxpPazutOoJ6' },
    { id: '8iRoIhmbvtQ', url: 'https://youtube.com/shorts/8iRoIhmbvtQ?si=uqlH9X1lLqGgYNFu' },
    { id: 'AB4ywaJuQAE', url: 'https://youtube.com/shorts/AB4ywaJuQAE?si=EiPbFEioaU5R5pMr' },
  ]

  return (
    <footer className="bg-white mt-auto">
      {/* Newsletter Section */}
      <div className="bg-secondary py-12">
        <div className="layout-container">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <h2 className="text-3xl md:text-4xl font-black text-white whitespace-nowrap">
              Keep Me Updated
            </h2>

            <div className="flex-1 max-w-xl">
              <p className="text-gray-400 text-sm leading-relaxed italic border-l border-white/20 pl-6">
                "Excellent service and high-quality power tools! They performed flawlessly and gave me peace of mind throughout my projects. Highly professional."
              </p>
            </div>

            <div className="w-full lg:w-auto">
              <form className="flex w-full lg:w-[400px]">
                <input
                  type="email"
                  placeholder="Your email..."
                  className="flex-1 bg-[#082b40] border-0 text-white px-6 py-4 rounded-l-full focus:outline-none focus:ring-1 focus:ring-primary h-14"
                />
                <button
                  type="submit"
                  className="bg-primary text-secondary px-8 py-4 rounded-r-full font-bold h-14 hover:bg-yellow-500 transition-colors flex items-center justify-center min-w-[60px]"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section - YouTube Shorts */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 h-[250px]">
        {youtubeShorts.map((video, idx) => (
          <a
            key={idx}
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group overflow-hidden h-full block"
          >
            <Image
              src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
              alt={`YouTube Short ${idx + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              unoptimized // YouTube thumbnails are better handled unoptimized for external srcs usually, but Next Image can handle them with proper config. unoptimized is safer for quick mocks
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <svg className="w-12 h-12 text-white opacity-80" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 4-8 4z" />
              </svg>
            </div>
          </a>
        ))}
      </div>

      {/* Main Footer Links */}
      <div className="py-20 border-b border-gray-100">
        <div className="layout-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-24">

            {/* Column 1: Logo & Contact */}
            <div className="space-y-6">
              <Link href="/" className="inline-block">
                <span className="text-2xl font-black tracking-tighter text-secondary uppercase">
                  MECHANICAL<span className="text-primary">CITY</span>
                </span>
              </Link>
              <div className="space-y-4 text-gray-500 text-[15px] leading-relaxed">
                <div>
                  <p className="font-bold text-secondary mb-1">Corporate Office</p>
                  <p>121 King Street, Collins Melbourne</p>
                  <p>West Victoria 8007, Australia.</p>
                </div>
                <div>
                  <p className="font-bold text-secondary mb-1">Branch Office</p>
                  <p>456 Queens Road, Sydney</p>
                  <p>NSW 2000, Australia.</p>
                </div>
                <div className="pt-2">
                  <p><span className="font-bold text-secondary">Phone:</span> (+91) 987 654 3210</p>
                  <p><span className="font-bold text-secondary">Email:</span> support@mechanicalcity.com</p>
                </div>
              </div>
            </div>

            {/* Column 2: Information */}
            <div>
              <h3 className="text-xl font-bold text-secondary mb-8">Information</h3>
              <ul className="space-y-4 text-gray-500 text-[15px]">
                <li><Link href="/blog" className="hover:text-primary transition-colors">Our blog</Link></li>
                <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                <li><Link href="/faqs" className="hover:text-primary transition-colors">FAQs</Link></li>
              </ul>
            </div>

            {/* Column 3: About Us */}
            <div>
              <h3 className="text-xl font-bold text-secondary mb-8">About Us</h3>
              <ul className="space-y-4 text-gray-500 text-[15px]">
                <li><Link href="/who-we-are" className="hover:text-primary transition-colors">Who We Are ?</Link></li>
                <li><Link href="/responsibility" className="hover:text-primary transition-colors">Corporate Responsibility</Link></li>
                <li><Link href="/legal" className="hover:text-primary transition-colors">California Laws</Link></li>
                <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="py-8 bg-gray-50">
        <div className="layout-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-gray-500 text-sm">
              Copyright © {currentYear} <span className="text-primary font-bold">Mechanical City</span> All Rights Reserved.
            </p>
            <div className="flex items-center gap-4 opacity-70 grayscale hover:grayscale-0 transition-all">
              <Image src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" width={40} height={25} className="h-4 w-auto" />
              <Image src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" width={40} height={25} className="h-6 w-auto" />
              <Image src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" width={60} height={25} className="h-4 w-auto" />
              <Image src="https://upload.wikimedia.org/wikipedia/commons/3/39/Google_Pay_logo.svg" alt="Google Pay" width={50} height={25} className="h-5 w-auto" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
