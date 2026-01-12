import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Category from '@/models/Category'

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB()
        const { id } = await params
        const category = await Category.findById(id)

        if (!category) {
            return NextResponse.json(
                { error: 'Category not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(category)
    } catch (error) {
        console.error('Error fetching category:', error)
        return NextResponse.json(
            { error: 'Failed to fetch category' },
            { status: 500 }
        )
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const body = await req.json()
        await connectDB()
        const { id } = await params

        const category = await Category.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        })

        if (!category) {
            return NextResponse.json(
                { error: 'Category not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(category)
    } catch (error: any) {
        console.error('Error updating category:', error)
        if (error.code === 11000) {
            return NextResponse.json(
                { error: 'Category with this slug already exists' },
                { status: 400 }
            )
        }
        return NextResponse.json(
            { error: 'Failed to update category' },
            { status: 500 }
        )
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB()
        const { id } = await params
        const category = await Category.findByIdAndDelete(id)

        if (!category) {
            return NextResponse.json(
                { error: 'Category not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({ message: 'Category deleted successfully' })
    } catch (error) {
        console.error('Error deleting category:', error)
        return NextResponse.json(
            { error: 'Failed to delete category' },
            { status: 500 }
        )
    }
}
