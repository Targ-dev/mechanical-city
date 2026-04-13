import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Order from '@/models/Order';
import Product from '@/models/Product';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

// Helper to get authenticated user from cookie
async function getAuthUser() {
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token_v2')?.value;

  if (!token || !process.env.JWT_SECRET) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string };
    await connectDB();
    return await User.findById(decoded.id);
  } catch (error) {
    return null;
  }
}

function isSameCart(orderProducts: any[], incomingProducts: any[]) {
  if (orderProducts.length !== incomingProducts.length) return false;

  const sortedOrder = [...orderProducts].sort((a, b) => a.productId.toString().localeCompare(b.productId.toString()));
  const sortedIncoming = [...incomingProducts].sort((a, b) => a.productId.toString().localeCompare(b.productId.toString()));

  return sortedOrder.every((op, index) => {
    const ip = sortedIncoming[index];
    return op.productId.toString() === ip.productId.toString() && op.quantity === ip.quantity;
  });
}

export async function POST(request: Request) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json({ error: 'Order must contain items' }, { status: 400 });
    }

    if (!body.shippingAddress) {
      return NextResponse.json({ error: 'Shipping address is required' }, { status: 400 });
    }

    // Process and validate items
    let calculatedSubtotal = 0;
    const verifiedItems = [];

    for (const item of body.items) {
      if (!item.productId || typeof item.quantity !== 'number' || item.quantity <= 0) {
        return NextResponse.json({ error: 'Invalid product item format or quantity' }, { status: 400 });
      }

      // Fetch the REAL product from the database
      const realProduct = await Product.findById(item.productId);

      if (!realProduct) {
        return NextResponse.json({ error: `Product not found: ${item.productId}` }, { status: 404 });
      }

      const itemTotal = realProduct.price * item.quantity;
      calculatedSubtotal += itemTotal;

      verifiedItems.push({
        productId: realProduct._id.toString(),
        name: realProduct.name,
        price: realProduct.price, // Store price snapshot
        quantity: item.quantity
      });
    }

    // Adding static shipping charge of 15.00 matching frontend
    const shippingFee = 15.00;
    const calculatedTotal = calculatedSubtotal + shippingFee;

    // Advanced Duplicate Logic: Check cart similarity within 15 seconds
    const timeWindow = new Date(Date.now() - 15000);
    const recentOrder = await Order.findOne({
      user: user._id,
      createdAt: { $gte: timeWindow }
    }).sort({ createdAt: -1 });

    // Block if recent order exactly matches cart structure (user, product IDs, & quantities) to uniquely stop double-click issues.
    if (recentOrder && isSameCart(recentOrder.items, verifiedItems)) {
      console.warn("Duplicate order attempt", user._id);
      return NextResponse.json({ error: 'Please wait a few seconds before placing another order' }, { status: 429 });
    }

    // Build purely verified data for insertion
    const orderData = {
      user: user._id,
      items: verifiedItems,
      shippingAddress: body.shippingAddress,
      subtotal: calculatedSubtotal,
      total: calculatedTotal,
      status: 'awaiting_payment',
      orderId: `ORD-${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).substring(2, 6).toUpperCase()}`
    };

    const order = await Order.create(orderData);

    return NextResponse.json(order, { status: 201 });
  } catch (error: any) {
    console.error('Error creating order:', error);
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Validation Error', details: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let query = {};
    // If not admin, restrict to own orders
    if (user.role !== 'admin') {
      query = { user: user._id };
    }

    // Admins see all orders (empty query), Users see scoped
    const orders = await Order.find(query).sort({ createdAt: -1 });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
