// Load environment variables from .env.local
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import connectDB from '../lib/db';
import Product from '../models/Product';
import Category from '../models/Category';
import SiteConfig from '../models/SiteConfig';

// Generic high-quality tool image
const THEME_IMAGE = 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80';

const products = [
    {
        name: 'Professional 20V Cordless Drill Driver',
        slug: 'professional-hammer-drill',
        price: 159.99,
        description: 'Heavy-duty 20V Max cordless drill/driver with brushless motor.',
        image: THEME_IMAGE,
        category: { name: 'Drills', slug: 'drills' },
    },
    {
        name: 'Compact Impact Driver Kit',
        slug: 'compact-impact-driver',
        price: 129.99,
        description: 'Ultra-compact and lightweight design allows functionality in tight spaces.',
        image: THEME_IMAGE,
        category: { name: 'Drills', slug: 'drills' },
    },
    {
        name: 'Heavy Duty Hammer Drill',
        slug: 'heavy-duty-hammer-drill',
        price: 199.99,
        description: 'Powerful hammer drill geared for masonry and concrete drilling.',
        image: THEME_IMAGE,
        category: { name: 'Drills', slug: 'drills' },
    },
    {
        name: '7-1/4" Circular Saw',
        slug: 'circular-saw-pro',
        price: 189.99,
        description: 'High-performance motor delivers 5800 RPM for fast, smooth cutting.',
        image: THEME_IMAGE,
        category: { name: 'Saws', slug: 'saws' },
    },
    {
        name: 'Cordless Reciprocating Saw',
        slug: 'reciprocating-saw-cordless',
        price: 149.99,
        description: 'Compact design fits between studs and in other tight spots.',
        image: THEME_IMAGE,
        category: { name: 'Saws', slug: 'saws' },
    },
    {
        name: '10" Sliding Compound Miter Saw',
        slug: 'miter-saw-10-inch',
        price: 349.99,
        description: 'Precise miter system and machined base fence support.',
        image: THEME_IMAGE,
        category: { name: 'Saws', slug: 'saws' },
    },
    {
        name: '4-1/2" Angle Grinder',
        slug: 'angle-grinder-4-inch',
        price: 89.99,
        description: '11 Amp AC/DC 11,000 RPM motor for fast material removal.',
        image: THEME_IMAGE,
        category: { name: 'Grinders', slug: 'grinders' },
    },
    {
        name: 'Variable Speed Die Grinder',
        slug: 'die-grinder-variable',
        price: 119.99,
        description: 'Brushless motor requires no brush changes.',
        image: THEME_IMAGE,
        category: { name: 'Grinders', slug: 'grinders' },
    },
    {
        name: '21-Piece Titanium Drill Bit Set',
        slug: 'drill-bit-set-21pc',
        price: 29.99,
        description: 'Titanium coating for longer life. Patented pilot point tip starts on contact.',
        image: THEME_IMAGE,
        category: { name: 'Accessories', slug: 'accessories' },
    },
    {
        name: 'Contractor Tool Bag',
        slug: 'contractor-tool-bag',
        price: 49.99,
        description: 'Heavy-duty poly fabric construction. Large interior compartment.',
        image: THEME_IMAGE,
        category: { name: 'Accessories', slug: 'accessories' },
    },
];

const banners = [
    {
        bannerId: 'hero-1',
        imageUrl: THEME_IMAGE,
        subtitle: 'Pro Series Tools',
        titleHtml: 'Ultimate Power <br />For Every Job',
        buttonText: 'Shop Drills',
        buttonLink: '/products?category=drills'
    },
    {
        bannerId: 'hero-2',
        imageUrl: THEME_IMAGE,
        subtitle: 'Spring Sale',
        titleHtml: 'Save 20% On <br />Heavy Machinery',
        buttonText: 'View Deals',
        buttonLink: '/products?category=saws'
    },
    {
        bannerId: 'hero-3',
        imageUrl: THEME_IMAGE,
        subtitle: 'New Arrivals',
        titleHtml: 'Next-Gen <br />Cordless Tools',
        buttonText: 'Discover Now',
        buttonLink: '/products'
    }
];

async function seed() {
    try {
        console.log('Connecting to DB...');
        await connectDB();
        console.log('Connected to DB');

        console.log('Clearing old data...');
        await Product.deleteMany({});
        await Category.deleteMany({});
        console.log('Data cleared');

        // Extract unique categories
        const categoriesMap = new Map();
        products.forEach(p => {
            if (!categoriesMap.has(p.category.slug)) {
                categoriesMap.set(p.category.slug, {
                    name: p.category.name,
                    slug: p.category.slug,
                    description: `All ${p.category.name} products`,
                    image: THEME_IMAGE
                });
            }
        });

        const categories = Array.from(categoriesMap.values());

        console.log(`Seeding ${categories.length} categories...`);
        await Category.insertMany(categories);
        console.log('Categories seeded');

        console.log(`Seeding ${products.length} products...`);
        await Product.insertMany(products);
        console.log('Products seeded successfully');

        console.log('Updating Site Banners...');
        let config = await SiteConfig.findOne({ singletonId: 'global' });
        if (!config) {
            config = new SiteConfig({ singletonId: 'global', banners: banners });
        } else {
            config.banners = banners;
        }
        await config.save();
        console.log('Banners updated successfully');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
}

seed();
