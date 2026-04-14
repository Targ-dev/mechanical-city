import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import connectDB from '@/lib/db'
import User from '@/models/User'

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await req.json()
        const { role } = body

        const cookieStore = await cookies()
        const token = cookieStore.get('auth_token_v2')?.value
        if (!token || !process.env.JWT_SECRET) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string }
        if (id === decoded.id) {
            return NextResponse.json({ error: 'You cannot change your own role.' }, { status: 403 })
        }

        await connectDB()

        const user = await User.findById(id)
        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            )
        }

        user.role = role
        await user.save()

        const updatedUser = await User.findById(id).select('-password')

        return NextResponse.json(updatedUser)
    } catch (error) {
        console.error('Error updating user:', error)
        return NextResponse.json(
            { error: 'Failed to update user' },
            { status: 500 }
        )
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const cookieStore = await cookies()
        const token = cookieStore.get('auth_token_v2')?.value
        if (!token || !process.env.JWT_SECRET) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string }
        if (id === decoded.id) {
            return NextResponse.json({ error: 'You cannot delete your own account.' }, { status: 403 })
        }

        await connectDB()

        const user = await User.findByIdAndDelete(id)
        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({ message: 'User deleted successfully' })
    } catch (error) {
        console.error('Error deleting user:', error)
        return NextResponse.json(
            { error: 'Failed to delete user' },
            { status: 500 }
        )
    }
}
