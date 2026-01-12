
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function testJWT() {
    console.log('Starting JWT Verification...');

    const { default: connectDB } = await import('../lib/db');
    const { default: User } = await import('../models/User');
    const { default: jwt } = await import('jsonwebtoken');
    const { default: bcrypt } = await import('bcryptjs'); // Import bcrypt to verify locally

    const BASE_URL = 'http://mechanical-city.vercel.app';
    const testEmail = `jwt-test-${Date.now()}@example.com`;
    const password = 'securePass123';

    await connectDB(); // Connect to DB for manual inspection

    // 1. Register & Check Token
    console.log(`\n🔹 Registering user: ${testEmail}`);
    try {
        const regRes = await fetch(`${BASE_URL}/api/auth?action=register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'JWT Tester', email: testEmail, password })
        });

        if (regRes.status !== 201) {
            console.error('❌ Registration Failed', await regRes.text());
            process.exit(1);
        }

        const regData = await regRes.json();
        console.log('✅ Registration SUCCESS');

        // Manual DB Inspection
        const dbUser = await User.findById(regData.user.id);
        if (!dbUser) {
            console.error('❌ DB Verification Failed: User not found in DB');
            process.exit(1);
        }
        console.log('✅ User found in DB');
        console.log(`   Stored Password Hash: ${dbUser.password.substring(0, 15)}...`);

        // Check if password is actually hashed
        if (dbUser.password === password) {
            console.error('❌ DATA INTEGRITY ERROR: Password stored as plain text!');
        } else {
            console.log('✅ Password appears hashed');
        }

        // Verify hash manually here
        const isMatchLocal = await bcrypt.compare(password, dbUser.password);
        console.log(`✅ Local bcrypt verification: ${isMatchLocal}`);

        if (regData.token) {
            console.log('✅ Token received in register response');
            // Verify token content
            const decoded = jwt.verify(regData.token, process.env.JWT_SECRET as string) as any;
            if (decoded.id === regData.user.id) {
                console.log('✅ Token signature valid and ID matches');
            } else {
                console.error('❌ Token ID mismatch');
                process.exit(1);
            }
        } else {
            console.error('❌ Token MISSING in register response');
            process.exit(1);
        }

    } catch (e) {
        console.error('❌ Register Exception', e);
        process.exit(1);
    }

    // 2. Login & Check Token
    console.log(`\n🔹 Logging in user: ${testEmail}`);
    try {
        const loginRes = await fetch(`${BASE_URL}/api/auth?action=login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: testEmail, password })
        });

        if (loginRes.status !== 200) {
            console.error('❌ Login Failed', await loginRes.text());
            process.exit(1);
        }

        const loginData = await loginRes.json();
        console.log('✅ Login SUCCESS');

        if (loginData.token) {
            console.log('✅ Token received in login response');
            const decoded = jwt.verify(loginData.token, process.env.JWT_SECRET as string) as any;
            if (decoded.id === loginData.user.id) {
                console.log('✅ Token signature valid and ID matches');
            } else {
                console.error('❌ Token ID mismatch');
                process.exit(1);
            }
        } else {
            console.error('❌ Token MISSING in login response');
            process.exit(1);
        }

    } catch (e) {
        console.error('❌ Login Exception', e);
        process.exit(1);
    }

    console.log('\n✨ JWT Implementation Verified!');
    process.exit(0);
}

testJWT();
