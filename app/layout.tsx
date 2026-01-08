import './globals.css'
import React from 'react'

export const metadata = {
  title: 'Mechanical City',
  description: 'E-commerce starter'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
