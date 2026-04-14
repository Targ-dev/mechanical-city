import './globals.css'
import React from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AuthProvider from '@/components/providers/AuthProvider'
import connectDB from '@/lib/db'
import SiteConfig from '@/models/SiteConfig'

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

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <AuthProvider>
          <Header contactPhone={contactPhone} contactEmail={contactEmail} />
          <main className="flex-1 w-full">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
