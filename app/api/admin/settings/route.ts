import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import connectDB from '@/lib/db'
import SiteConfig from '@/models/SiteConfig'
import User from '@/models/User'

// Helper to check admin
async function checkAdmin() {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token_v2')?.value
    if (!token || !process.env.JWT_SECRET) return false
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string }
        await connectDB()
        const user = await User.findById(decoded.id)
        if (!user || user.role !== 'admin') return false
        return true
    } catch {
        return false
    }
}

export async function GET() {
    try {
        const isAdmin = await checkAdmin()
        if (!isAdmin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        await connectDB()
        let config = await SiteConfig.findOne()
        if (!config) {
            // Seed a new config if one doesn't exist
            config = await SiteConfig.create({
                 features: [
                    { title: "Worldwide Shipping", description: "For all Orders Over $100", iconSvg: '<svg class="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>' },
                    { title: "Money Back Guarantee", description: "Guarantee With In 30 Days", iconSvg: '<svg class="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>' },
                    { title: "Offers And Discounts", description: "Back Returns In 7 Days", iconSvg: '<svg class="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>' },
                    { title: "24/7 Support Services", description: "Contact us Anytime", iconSvg: '<svg class="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>' }
                 ],
                 banners: [
                     { bannerId: 'promo1', imageUrl: '/images/banners/2.jpg', subtitle: 'UP TO 10% OFF', titleHtml: 'Circular Saw <br />\n<span className="text-[#FFB800]">With Laser</span>', buttonText: 'SHOP NOW', buttonLink: '/products?category=saws' },
                     { bannerId: 'promo2', imageUrl: '/images/banners/1.jpg', subtitle: 'UP TO 35% OFF', titleHtml: 'DEWALT DW715 <br />\nNEW MACHINE', buttonText: 'SHOP NOW', buttonLink: '/products?query=dewalt' },
                     { bannerId: 'bosch', imageUrl: '/images/banners/3.jpg', subtitle: 'Exclusive Month End Offer', titleHtml: '<span className="text-primary block">Bosch GKS 235</span>\n<span className="block">Turbo Circular</span>', buttonText: 'Shop Now', buttonLink: '/products?search=bosch' }
                 ]
            })
        }
        return NextResponse.json(config)
    } catch (error) {
        console.error('Error fetching settings:', error)
        return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
    }
}

export async function PUT(req: NextRequest) {
    try {
        const isAdmin = await checkAdmin()
        if (!isAdmin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await req.json()
        await connectDB()
        
        let config = await SiteConfig.findOne()
        if (!config) {
            config = new SiteConfig(body)
            await config.save()
        } else {
            // Update fields
            Object.assign(config, body)
            await config.save()
        }

        return NextResponse.json(config)
    } catch (error) {
        console.error('Error updating settings:', error)
        return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
    }
}
