
// Load environment variables from .env.local
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import connectDB from '../lib/db';
import Product from '../models/Product';

const products = [
    {
        name: 'Professional 20V Cordless Drill Driver',
        slug: 'professional-hammer-drill',
        price: 159.99,
        description: 'Heavy-duty 20V Max cordless drill/driver with brushless motor. Features 2-speed transmission, 1/2-inch metal ratcheting chuck, and LED work light. Includes 2 high-capacity batteries and charger.',
        image: '/images/products/drill-1.jpg',
        category: {
            name: 'Drills',
            slug: 'drills',
        },
    },
    {
        name: 'Compact Impact Driver Kit',
        slug: 'compact-impact-driver',
        price: 129.99,
        description: 'Ultra-compact and lightweight design allows functionality in tight spaces. High-torque output motor delivers maximum power for heavy-duty fastening applications.',
        image: '/images/products/drill-2.jpg',
        category: {
            name: 'Drills',
            slug: 'drills',
        },
    },
    {
        name: 'Heavy Duty Hammer Drill',
        slug: 'heavy-duty-hammer-drill',
        price: 199.99,
        description: 'Powerful hammer drill geared for masonry and concrete drilling. Ergonomic grip and variable speed control for precision work. Built for vital jobsite durability.',
        image: '/images/products/drill-3.jpg',
        category: {
            name: 'Drills',
            slug: 'drills',
        },
    },
    {
        name: '7-1/4" Circular Saw',
        slug: 'circular-saw-pro',
        price: 189.99,
        description: 'High-performance motor delivers 5800 RPM for fast, smooth cutting. Features a heavy-gauge aluminum shoe and bevel capacity of 57 degrees. Ideal for framing and cross-cutting.',
        image: '/images/products/saw-1.jpg',
        category: {
            name: 'Saws',
            slug: 'saws',
        },
    },
    {
        name: 'Cordless Reciprocating Saw',
        slug: 'reciprocating-saw-cordless',
        price: 149.99,
        description: 'Compact design fits between studs and in other tight spots. Keyless blade clamp for quick and easy blade changes. Patented 4-position blade clamp allows for flush cutting.',
        image: '/images/products/saw-2.jpg',
        category: {
            name: 'Saws',
            slug: 'saws',
        },
    },
    {
        name: '10" Sliding Compound Miter Saw',
        slug: 'miter-saw-10-inch',
        price: 349.99,
        description: 'Precise miter system and machined base fence support for optimization of cutting accuracy. Tall sliding fences support crown molding vertically nested.',
        image: '/images/products/saw-3.jpg',
        category: {
            name: 'Saws',
            slug: 'saws',
        },
    },
    {
        name: '4-1/2" Angle Grinder',
        slug: 'angle-grinder-4-inch',
        price: 89.99,
        description: '11 Amp AC/DC 11,000 RPM motor for fast material removal. Dust Ejection System provides durability by ejecting damaging dust and debris particles.',
        image: '/images/products/grinder-1.jpg',
        category: {
            name: 'Grinders',
            slug: 'grinders',
        },
    },
    {
        name: 'Variable Speed Die Grinder',
        slug: 'die-grinder-variable',
        price: 119.99,
        description: 'Brushless motor requires no brush changes. Variable speed paddle switch allows for multiple application usage. Compact gear case.',
        image: '/images/products/grinder-2.jpg',
        category: {
            name: 'Grinders',
            slug: 'grinders',
        },
    },
    {
        name: '21-Piece Titanium Drill Bit Set',
        slug: 'drill-bit-set-21pc',
        price: 29.99,
        description: 'Titanium coating for longer life. Patented pilot point tip starts on contact. Ideal for drilling in metal, wood, and plastic.',
        image: '/images/products/accessory-1.jpg',
        category: {
            name: 'Accessories',
            slug: 'accessories',
        },
    },
    {
        name: 'Contractor Tool Bag',
        slug: 'contractor-tool-bag',
        price: 49.99,
        description: 'Heavy-duty poly fabric construction. Large interior compartment and multiple pockets for organization. Steel handle with padded grip.',
        image: '/images/products/accessory-2.jpg',
        category: {
            name: 'Accessories',
            slug: 'accessories',
        },
    },
];

async function seed() {
    try {
        console.log('Connecting to DB...');
        await connectDB();
        console.log('Connected to DB');

        console.log('Clearing old products...');
        await Product.deleteMany({});
        console.log('Products cleared');

        console.log('Seeding new products...');
        await Product.insertMany(products);
        console.log('Products seeded successfully');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding products:', error);
        process.exit(1);
    }
}

seed();
