
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function testSessionPersistence() {
    console.log('🧪 Testing Session Persistence API...');
    const BASE_URL = 'http://localhost:3000';

    // 1. Register/Login to get cookie
    const email = `session-test-${Date.now()}@test.com`;
    console.log(`\n🔹 Registering user: ${email}`);
    const regRes = await fetch(`${BASE_URL}/api/auth?action=register`, {
        method: 'POST', body: JSON.stringify({ name: 'Session User', email, password: 'password123' })
    });
    const cookie = regRes.headers.get('set-cookie');
    if (!cookie) {
        console.error('❌ Failed to get cookie during registration');
        process.exit(1);
    }
    console.log('✅ Got Auth Cookie');

    // 2. Verify Session (GET /api/auth)
    console.log('\n🔹 Verifying Session (GET /api/auth)...');
    const sessionRes = await fetch(`${BASE_URL}/api/auth`, {
        headers: { 'Cookie': cookie }
    });

    if (sessionRes.status === 200) {
        const data = await sessionRes.json();
        console.log('✅ Session Valid:', data.user.email);
        if (data.user.email === email.toLowerCase()) {
            console.log('✅ User data matches');
        } else {
            console.error('❌ User mismatch');
            process.exit(1);
        }
    } else {
        console.error(`❌ Session verification failed: ${sessionRes.status}`);
        console.error(await sessionRes.text());
        process.exit(1);
    }

    // 3. Verify No Session (No Cookie)
    console.log('\n🔹 Verifying No Session (No Cookie)...');
    const noSessionRes = await fetch(`${BASE_URL}/api/auth`);
    if (noSessionRes.status === 401) {
        console.log('✅ correctly rejected without cookie');
    } else {
        console.error(`❌ Should have returned 401, got ${noSessionRes.status}`);
        process.exit(1);
    }

    console.log('\n✨ Session Persistence API Verified!');
}

testSessionPersistence();
