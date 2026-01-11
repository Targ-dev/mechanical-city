import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Order from '@/models/Order';
import Product from '@/models/Product';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

async function getAuthUser() {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token || !process.env.JWT_SECRET) return null;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string };
        await connectDB();
        const user = await User.findById(decoded.id);
        return user && user.role === 'admin' ? user : null;
    } catch (error) {
        return null;
    }
}

export async function GET() {
    try {
        const admin = await getAuthUser();
        if (!admin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();

        const [totalOrders, totalProducts, totalUsers, allOrders] = await Promise.all([
            Order.countDocuments(),
            Product.countDocuments(),
            User.countDocuments(),
            Order.find().select('total'),
        ]);

        const totalRevenue = allOrders.reduce((sum, order) => sum + (order.total || 0), 0);

        return NextResponse.json({
            totalOrders,
            totalProducts,
            totalUsers,
            totalRevenue,
        });
    } catch (error) {
        console.error('Error fetching admin stats:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
