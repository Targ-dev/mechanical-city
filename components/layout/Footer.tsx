import Link from 'next/link'
import Image from 'next/image'
import connectDB from '@/lib/db'
import SiteConfig from '@/models/SiteConfig'

export default async function Footer() {
  let config = null;
  try {
      await connectDB()
      config = await SiteConfig.findOne()
  } catch (error) {
      console.error('DB Config Error in Footer:', error)
  }

  const contactEmail = config?.contactEmail || 'support@mechanicalcity.com';
  const contactPhone = config?.contactPhone || '(+91) 987 654 3210';
  const contactAddress = config?.contactAddress || '121 King Street, Collins Melbourne\nWest Victoria 8007, Australia.';
  const footerAboutText = config?.footerAboutText || '"Excellent service and high-quality power tools! They performed flawlessly and gave me peace of mind throughout my projects. Highly professional."';
  const socialFacebook = config?.socialFacebook;
  const socialInstagram = config?.socialInstagram;
  const socialWhatsapp = config?.socialWhatsapp;
  
  const currentYear = new Date().getFullYear()

  const youtubeShorts = (config?.youtubeShorts?.length ?? 0) > 0 ? config!.youtubeShorts : [
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
                {footerAboutText}
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
                  <p className="whitespace-pre-line">{contactAddress}</p>
                </div>
                <div className="pt-2">
                  <p><span className="font-bold text-secondary">Phone:</span> {contactPhone}</p>
                  <p><span className="font-bold text-secondary">Email:</span> {contactEmail}</p>
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
              
              {/* Social Links from DB */}
              <h3 className="text-xl font-bold text-secondary mb-4 mt-8">Connect With Us</h3>
              <div className="flex gap-4">
                  {socialFacebook && socialFacebook !== '#' && (
                      <a href={socialFacebook} target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-primary hover:text-white transition-colors">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>
                      </a>
                  )}
                  {socialInstagram && socialInstagram !== '#' && (
                      <a href={socialInstagram} target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-primary hover:text-white transition-colors">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2c2.72 0 3.05.01 4.12.06 1.06.05 1.78.22 2.41.47.65.25 1.2.61 1.76 1.16.55.56.91 1.11 1.16 1.76.25.63.42 1.35.47 2.41.05 1.07.06 1.4.06 4.12s-.01 3.05-.06 4.12c-.05 1.06-.22 1.78-.47 2.41-.25.65-.61 1.2-1.16 1.76-.56.55-1.11.91-1.76 1.16-.63.25-1.35.42-2.41.47-1.07.05-1.4.06-4.12.06s-3.05-.01-4.12-.06c-1.06-.05-1.78-.22-2.41-.47-.65-.25-1.2-.61-1.76-1.16-.55-.56-.91-1.11-1.16-1.76-.25-.63-.42-1.35-.47-2.41C2.01 15.05 2 14.72 2 12s.01-3.05.06-4.12c.05-1.06.22-1.78.47-2.41.25-.65.61-1.2 1.16-1.76.56-.55 1.11-.91 1.76-1.16.63-.25 1.35-.42 2.41-.47C8.95 2.01 9.28 2 12 2zm0 8.96a3.04 3.04 0 1 0 0 6.08 3.04 3.04 0 0 0 0-6.08zm0-1.8a4.84 4.84 0 1 1 0 9.68 4.84 4.84 0 0 1 0-9.68zm5.66-3.88a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z"/></svg>
                      </a>
                  )}
                  {socialWhatsapp && socialWhatsapp !== '#' && (
                      <a href={socialWhatsapp} target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-primary hover:text-white transition-colors">
                           <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.1 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.46 14.28c-.23.64-1.31 1.21-1.88 1.28-.53.07-1.2.22-3.86-.88-3.19-1.32-5.26-4.6-5.42-4.81-.15-.22-1.29-1.72-1.29-3.28 0-1.56.81-2.33 1.1-2.65.28-.3.61-.38.81-.38.2 0 .4.01.58.01.2 0 .47-.08.73.55.28.66.96 2.36 1.04 2.52.08.16.13.35.03.55-.1.2-.15.33-.3.51-.15.18-.33.43-.46.56-.15.16-.31.33-.13.64.18.31.81 1.34 1.74 2.16 1.2.1.84 1.83 2 1.48.24-.13.38-.45.52-.61.15-.16.3-.13.48-.06.18.07 1.16.55 1.36.65.2.1.33.15.38.24.05.09.05.51-.18 1.15z"/></svg>
                      </a>
                  )}
              </div>
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
