import { Product } from '@/types/product'

export const products: Product[] = [
    {
        id: '1',
        slug: 'professional-hammer-drill',
        name: 'Professional Hammer Drill',
        price: 199.99,
        image: '/images/products/1.png',
        description: 'Heavy-duty 18V cordless hammer drill with brushless motor for maximum performance.',
        category: {
            name: 'Drills',
            slug: 'drills'
        }
    },
    {
        id: '2',
        slug: 'circular-saw-pro',
        name: '7-1/4" Circular Saw',
        price: 159.99,
        image: '/images/products/2.jpeg',
        description: 'High-torque circular saw designed for precision cutting in wood and composite materials.',
        category: {
            name: 'Saws',
            slug: 'saws'
        }
    },
    {
        id: '3',
        slug: 'angle-grinder-4-inch',
        name: '4-1/2" Angle Grinder',
        price: 89.99,
        image: '/images/products/3.jpg',
        description: 'Compact and powerful angle grinder ideal for cutting, grinding, and polishing.',
        category: {
            name: 'Grinders',
            slug: 'grinders'
        }
    },
    {
        id: '4',
        slug: 'random-orbit-sander',
        name: 'Random Orbit Sander',
        price: 79.99,
        image: '/images/products/4.jpg',
        description: 'Variable speed random orbit sander for a swirl-free finish on wood and metal.',
        category: {
            name: 'Sanders',
            slug: 'sanders'
        }
    },
    {
        id: '5',
        slug: 'impact-driver-kit',
        name: '18V Impact Driver Kit',
        price: 149.99,
        image: '/images/products/5.webp',
        description: 'Compact impact driver delivering 1500 in-lbs of torque for fastening applications.',
        category: {
            name: 'Drills',
            slug: 'drills'
        }
    },
    {
        id: '6',
        slug: 'reciprocating-saw',
        name: 'Cordless Reciprocating Saw',
        price: 129.99,
        image: '/images/products/6.webp',
        description: 'Versatile reciprocating saw for demolition and rough cutting tasks.',
        category: {
            name: 'Saws',
            slug: 'saws'
        }
    }
]
