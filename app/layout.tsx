import './globals.css'
import React from 'react'
import { GeistSans } from 'geist/font/sans'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AuthProvider from '@/components/providers/AuthProvider'
import connectDB from '@/lib/db'
import SiteConfig from '@/models/SiteConfig'
import { getCategories, getProducts } from '@/lib/data-service'

export const metadata = {
  title: 'Mechanical City',
  description: 'E-commerce starter'
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let config = null
  try {
    await connectDB()
    config = await SiteConfig.findOne()
  } catch (error) {
    console.error('DB Config Error in Layout:', error)
  }

  const contactEmail = config?.contactEmail || 'support@mechanicalcity.com'
  const contactPhone = config?.contactPhone || '+91 - 987 654 3210'

  const rawCategories = await getCategories() || [];
  const rawProducts = await getProducts() || [];

  const initialCategories = rawCategories.map((c: any) => {
    const catProducts = rawProducts.filter((p: any) => p.category?.slug === c.slug).slice(0, 8);
    return {
      name: c.name,
      slug: c.slug,
      href: `/products/${c.slug}`,
      hasMegaMenu: catProducts.length > 0,
      subs: catProducts.length > 0 ? [{ title: 'Top Products', items: catProducts.map((p: any) => ({ name: p.name, slug: p.slug })) }] : []
    };
  });

  return (
    <html lang="en" className={GeistSans.variable}>
      <body className={`flex flex-col min-h-screen ${GeistSans.className}`}>
        <AuthProvider>
          <Header contactPhone={contactPhone} contactEmail={contactEmail} initialCategories={initialCategories} />
          <main className="flex-1 w-full">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
