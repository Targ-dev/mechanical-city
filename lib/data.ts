import { Product } from '@/types/product'

export const products: Product[] = [
    {
        id: '1',
        slug: 'mechanical-keyboard-pro',
        title: 'Mechanical Keyboard Pro',
        price: 149.99,
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop',
        description: 'A high-performance mechanical keyboard with custom switches and RGB lighting.',
        category: {
            name: 'Mechanical Keyboards',
            slug: 'mechanical-keyboards'
        }
    },
    {
        id: '2',
        slug: 'wireless-mechanical-keyboard',
        title: 'Wireless Mechanical Keyboard',
        price: 129.99,
        image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&h=500&fit=crop',
        description: 'Experience the freedom of wireless connectivity without compromising on tactile feedback.',
        category: {
            name: 'Wireless Keyboards',
            slug: 'wireless-keyboards'
        }
    },
    {
        id: '3',
        slug: 'rgb-mechanical-keyboard',
        title: 'RGB Mechanical Keyboard',
        price: 179.99,
        image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&h=500&fit=crop',
        description: 'Illuminate your setup with customizable per-key RGB lighting and premium switches.',
        category: {
            name: 'Gaming Keyboards',
            slug: 'gaming-keyboards'
        }
    },
    {
        id: '4',
        slug: 'compact-mechanical-keyboard',
        title: 'Compact Mechanical Keyboard',
        price: 99.99,
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop',
        description: 'Save desk space with this compact 60% layout mechanical keyboard.',
        category: {
            name: 'Compact Keyboards',
            slug: 'compact-keyboards'
        }
    }
]
