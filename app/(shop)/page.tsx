import Hero from '@/components/ui/Hero'
import TrendingProducts from '@/components/home/TrendingProducts'
import Benefits from '@/components/home/Benefits'
import PromoBanners from '@/components/home/PromoBanners'
import CategoriesGrid from '@/components/home/CategoriesGrid'
import BoschBanner from '@/components/home/BoschBanner'
import PopularBrands from '@/components/home/PopularBrands'

export default async function ShopHome() {
  return (
    <>
      <Hero
        title="Premium Power Tools"
        subtitle="Built for performance and durability"
        backgroundImage="/images/UI/banner.jpg"
      />

      <Benefits />

      <TrendingProducts />

      <PromoBanners />

      <CategoriesGrid />

      <BoschBanner />

      <PopularBrands />

      <section className="bg-background py-16">
        <div className="layout-container text-center max-w-3xl">
          <h2 className="text-3xl font-bold text-main mb-6">About Us</h2>
          <div className="space-y-4 text-muted leading-relaxed">
            <p>
              Welcome to Mechanical City, your premier destination for professional-grade power tools.
              We are dedicated to equipping both seasoned professionals and passionate DIY enthusiasts with the
              highest quality machinery available on the market.
            </p>
            <p>
              Our commitment lies in durability and performance. We strictly curate products that withstand the
              toughest job sites and rigorous daily use, ensuring that you can rely on your tools when it matters most.
            </p>
            <p>
              Whether you are building a skyscraper or a bookshelf, we believe that the right tool makes all the difference.
              Experience the power of precision with our comprehensive range of drills, saws, and workshop essentials.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 layout-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-main mb-6">Contact Us</h2>
            <p className="text-muted mb-8">
              Have questions about our products or need assistance with an order?
              Our team of experts is here to help. Reach out to us through any of the channels below.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg text-primary">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-main">Email</h3>
                  <p className="text-muted">support@mechanicalcity.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg text-primary">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-main">Phone</h3>
                  <p className="text-muted">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg text-primary">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-main">Location</h3>
                  <p className="text-muted">San Francisco, CA, USA</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface p-8 rounded-2xl shadow-sm border border-border">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-main mb-1">Full Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full rounded-md border-border shadow-sm focus:border-primary focus:ring-primary py-2 px-3 border"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-main mb-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  className="w-full rounded-md border-border shadow-sm focus:border-primary focus:ring-primary py-2 px-3 border"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-main mb-1">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full rounded-md border-border shadow-sm focus:border-primary focus:ring-primary py-2 px-3 border"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button
                type="button"
                className="w-full bg-primary text-secondary font-bold py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
