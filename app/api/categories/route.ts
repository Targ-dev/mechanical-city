import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Category from '@/models/Category'

export async function GET() {
    try {
        await connectDB()
        const categories = await Category.find().sort({ createdAt: -1 })
        return NextResponse.json(categories)
    } catch (error) {
        console.error('Error fetching categories:', error)
        return NextResponse.json(
            { error: 'Failed to fetch categories' },
            { status: 500 }
        )
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        await connectDB()

        const category = await Category.create(body)

        return NextResponse.json(category, { status: 201 })
    } catch (error: any) {
        console.error('Error creating category:', error)
        if (error.code === 11000) {
            return NextResponse.json(
                { error: 'Category with this slug already exists' },
                { status: 400 }
            )
        }
        return NextResponse.json(
            { error: 'Failed to create category' },
            { status: 500 }
        )
    }
}
