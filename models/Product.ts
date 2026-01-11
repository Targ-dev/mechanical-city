import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    slug: string;
    price: number;
    image?: string;
    description?: string;
    category: {
        name: string;
        slug: string;
    };
    createdAt: Date;
}

const ProductSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
        },
        description: {
            type: String,
        },
        category: {
            name: {
                type: String,
            },
            slug: {
                type: String,
            },
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

// Prevent model overwrite in development
const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
