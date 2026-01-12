
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Must import after dotenv
const { default: connectDB } = await import('../lib/db');
const { default: User } = await import('../models/User');
const { default: Order } = await import('../models/Order');

async function verifyIsolation() {
    console.log('🕵️‍♀️ Starting Order Visibility Verification...');
    await connectDB();
    const BASE_URL = 'http://mechanical-city.vercel.app';

    // 1. Setup Test Users
    const userAEmail = `userA-${Date.now()}@test.com`;
    const userBEmail = `userB-${Date.now()}@test.com`;
    const adminEmail = `admin-${Date.now()}@test.com`;

    // Clean up previous runs if collisions (unlikely with timestamp)

    console.log('\n🔹 Creating User A (Normal)...');
    const regARes = await fetch(`${BASE_URL}/api/auth?action=register`, {
        method: 'POST', body: JSON.stringify({ name: 'User A', email: userAEmail, password: 'password123' })
    });
    const cookieA = regARes.headers.get('set-cookie');
    if (!cookieA) throw new Error('Failed to register User A');

    console.log('\n🔹 Creating User B (Normal)...');
    const regBRes = await fetch(`${BASE_URL}/api/auth?action=register`, {
        method: 'POST', body: JSON.stringify({ name: 'User B', email: userBEmail, password: 'password123' })
    });
    const cookieB = regBRes.headers.get('set-cookie');
    if (!cookieB) throw new Error('Failed to register User B');

    console.log('\n🔹 Creating Admin User...');
    // Register normally then upgrade role in DB manually since register API doesn't support role
    const regAdminRes = await fetch(`${BASE_URL}/api/auth?action=register`, {
        method: 'POST', body: JSON.stringify({ name: 'Admin', email: adminEmail, password: 'password123' })
    });
    const adminData = await regAdminRes.json();
    const cookieAdmin = regAdminRes.headers.get('set-cookie');
    // Upgrade role
    await User.updateOne({ email: adminEmail.toLowerCase() }, { role: 'admin' });
    console.log('✅ Admin role assigned in DB');

    // 2. User A creates an order
    console.log('\n🔹 User A creates an Order...');
    const orderPayload = {
        items: [{ productId: 'p1', name: 'Item A', price: 100, quantity: 1 }],
        shippingAddress: { fullName: 'User A', phone: '123', address: 'Street A', city: 'City A', pincode: '000' },
        subtotal: 100, total: 100
    };
    const createARes = await fetch(`${BASE_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Cookie': cookieA! }, // ! assertions are safe here if checks passed
        body: JSON.stringify(orderPayload)
    });
    if (createARes.status !== 201) {
        console.error('Failed to create User A order', await createARes.text());
        process.exit(1);
    }
    const orderAData = await createARes.json();
    const orderAId = orderAData._id;
    console.log(`✅ Order Created (ID: ${orderAId})`);

    // 3. User B tries to see User A's order (Should fail/not list)
    console.log('\n🔹 User B fetches orders (Should NOT see Order A)...');
    const getBRes = await fetch(`${BASE_URL}/api/orders`, {
        headers: { 'Cookie': cookieB! }
    });
    const ordersB = await getBRes.json();
    const seesOrderA = ordersB.some((o: any) => o._id === orderAId);

    if (seesOrderA) {
        console.error('❌ FAILURE: User B can see User A\'s order!');
        process.exit(1);
    } else {
        console.log('✅ SUCCESS: User B does NOT see Order A');
    }

    // 4. Admin tries to see User A's order (Should succeed)
    console.log('\n🔹 Admin fetches orders (Should see Order A)...');
    const getAdminRes = await fetch(`${BASE_URL}/api/orders`, {
        headers: { 'Cookie': cookieAdmin! }
    });
    const ordersAdmin = await getAdminRes.json();
    const adminSeesOrderA = ordersAdmin.some((o: any) => o._id === orderAId);

    if (adminSeesOrderA) {
        console.log('✅ SUCCESS: Admin sees Order A');
    } else {
        console.error('❌ FAILURE: Admin CANNOT see Order A');
        process.exit(1);
    }

    // 5. Verify Database Integrity
    console.log('\n🔹 Verifying DB Ownership...');
    const dbOrder = await Order.findById(orderAId);
    const userA = await User.findOne({ email: userAEmail.toLowerCase() });

    if (dbOrder?.user.toString() === userA?._id.toString()) {
        console.log('✅ DB Verification: Order.user matches User A ID');
    } else {
        console.error('❌ DB Verification Failed: Order.user mismatch');
        console.log('Order User:', dbOrder?.user);
        console.log('User A:', userA?._id);
        process.exit(1);
    }

    console.log('\n✨ Order Isolation Verification COMPLETE!');
    process.exit(0);
}

verifyIsolation();
