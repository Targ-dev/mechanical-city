import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import * as jwt from 'jsonwebtoken';

const getUserIdFromCookie = (req: NextRequest) => {
    const token = req.cookies.get('auth_token_v2')?.value;
    if (!token || !process.env.JWT_SECRET) return null;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as any;
        return decoded.id;
    } catch {
        return null;
    }
}

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const userId = getUserIdFromCookie(req);
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        
        return NextResponse.json({ user });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
         await connectDB();
         const userId = getUserIdFromCookie(req);
         if (!userId) {
             return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
         }

         const body = await req.json();
         const { name, phone, address } = body;

         const updatedUser = await User.findByIdAndUpdate(
             userId,
             { name, phone, address },
             { new: true, runValidators: true }
         ).select('-password');

         return NextResponse.json({ user: updatedUser, message: 'Profile updated successfully' });
    } catch (error: any) {
         return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
