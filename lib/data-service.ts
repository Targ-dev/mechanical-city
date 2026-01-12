import connectDB from './db';
import Product from '@/models/Product';
import Category from '@/models/Category';
import Order from '@/models/Order';
import { cache } from 'react';

export const getProducts = cache(async (categorySlug?: string) => {
    await connectDB();
    const query = categorySlug ? { 'category.slug': categorySlug } : {};
    const products = await Product.find(query).sort({ createdAt: -1 }).lean();

    return products.map(p => ({
        ...p,
        id: p._id.toString(),
        _id: p._id.toString()
    }));
});

export const getProductBySlug = cache(async (slug: string) => {
    await connectDB();
    const product = await Product.findOne({ slug }).lean();
    if (!product) return null;

    return {
        ...product,
        id: product._id.toString(),
        _id: product._id.toString()
    };
});

export const getProductByCategoryAndSlug = cache(async (categorySlug: string, productSlug: string) => {
    // Ideally we just query by slug as it should be unique, but for strictness:
    await connectDB();
    const product = await Product.findOne({
        slug: productSlug,
        'category.slug': categorySlug
    }).lean();

    if (!product) return null;

    return {
        ...product,
        id: product._id.toString(),
        _id: product._id.toString()
    };
});

export const getCategories = cache(async () => {
    await connectDB();
    const categories = await Category.find().sort({ createdAt: -1 }).lean();
    return categories.map(c => ({
        ...c,
        id: c._id.toString(),
        _id: c._id.toString()
    }));
});

export const getOrderById = cache(async (id: string) => {
    await connectDB();
    try {
        const order = await Order.findById(id).lean();
        if (!order) return null;
        return {
            ...order,
            _id: order._id.toString(),
            // Ensure nested items also have string IDs if needed, though usually top level is key
        };
    } catch (error) {
        return null;
    }
});
