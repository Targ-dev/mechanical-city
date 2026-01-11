import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/models/Product';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const categorySlug = searchParams.get('category');

    let query = {};
    if (categorySlug) {
      query = { 'category.slug': categorySlug };
    }

    const products = await Product.find(query).sort({ createdAt: -1 });

    // Map _id to id for frontend compatibility
    const productsWithId = products.map((product) => {
      const p = product.toObject();
      return {
        ...p,
        id: p._id.toString(),
      };
    });

    return NextResponse.json(productsWithId);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
async function isAdmin(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
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

export async function POST(request: NextRequest) {
  try {
    if (!(await isAdmin(request))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();
    const { name, price, image, description, category } = body;

    if (!name || !price || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate slug from name
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

    const product = await Product.create({
      name,
      slug,
      price,
      image,
      description,
      category,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
