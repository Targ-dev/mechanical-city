import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Order from '@/models/Order';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

async function verifyAdmin() {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token_v2')?.value;

    if (!token || !process.env.JWT_SECRET) return false;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string };
        await connectDB();
        const user = await User.findById(decoded.id);
        return user && user.role === 'admin';
    } catch (error) {
        return false;
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const isAdmin = await verifyAdmin();
        if (!isAdmin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id: orderId } = await params;

        const { status } = await request.json();

        const validStatuses = ['awaiting_payment', 'paid', 'shipped'];
        if (!validStatuses.includes(status)) {
            return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
        }

        await connectDB();
        const existingOrder = await Order.findById(orderId);

        if (!existingOrder) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        // Validate status transition
        const currentStatus = existingOrder.status;
        let isValidTransition = false;

        if (currentStatus === 'awaiting_payment' && status === 'paid') isValidTransition = true;
        if (currentStatus === 'paid' && status === 'shipped') isValidTransition = true;

        if (!isValidTransition) {
            return NextResponse.json({ error: 'Invalid status transition' }, { status: 400 });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { status, updatedAt: new Date() },
            { new: true } // Return updated document
        );

        if (!updatedOrder) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        return NextResponse.json(updatedOrder, { status: 200 });
    } catch (error: any) {
        console.error('Error updating order status:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
