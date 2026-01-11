import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IOrderItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
}

export interface IShippingAddress {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
}

export interface IOrder extends Document {
    user: mongoose.Types.ObjectId | string;
    items: IOrderItem[];
    shippingAddress: IShippingAddress;
    subtotal: number;
    total: number;
    status: string;
    createdAt: Date;
}

const OrderSchema: Schema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        items: [
            {
                productId: { type: String, required: true },
                name: { type: String, required: true },
                price: { type: Number, required: true },
                quantity: { type: Number, required: true },
            },
        ],
        shippingAddress: {
            fullName: { type: String, required: true },
            phone: { type: String, required: true },
            address: { type: String, required: true },
            city: { type: String, required: true },
            pincode: { type: String, required: true },
        },
        subtotal: { type: Number, required: true },
        total: { type: Number, required: true },
        status: { type: String, default: 'Placed' },
        createdAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true, // Auto-manage createdAt and updatedAt if desired, but user asked for specific createdAt
    }
);

// Fallback to ensure we don't overwrite the model if it already exists (Next.js hot reload safe)
const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
