
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function testCookieAuth() {
    console.log('🍪 Starting Cookie Auth Verification...');

    const { default: connectDB } = await import('../lib/db');
    const { default: User } = await import('../models/User');

    const BASE_URL = 'http://localhost:3000';
    const testEmail = `cookie-test-${Date.now()}@example.com`;
    const password = 'securePass123';

    await connectDB();

    // 1. Register & Check Cookie
    console.log(`\n🔹 Registering user: ${testEmail}`);
    try {
        const regRes = await fetch(`${BASE_URL}/api/auth?action=register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Cookie Tester', email: testEmail, password })
        });

        if (regRes.status !== 201) {
            console.error('❌ Registration Failed', await regRes.text());
            process.exit(1);
        }

        const regData = await regRes.json();
        console.log('✅ Registration SUCCESS');

        // Check Token Absence
        if (regData.token) {
            console.error('❌ FAILURE: Token FOUND in JSON body (Should be removed)');
            process.exit(1);
        } else {
            console.log('✅ Token absent from JSON body');
        }

        // Check Cookie Presence
        const cookieHeader = regRes.headers.get('set-cookie');
        if (cookieHeader && cookieHeader.includes('auth_token=')) {
            console.log('✅ Set-Cookie header present with auth_token');
            if (cookieHeader.includes('HttpOnly')) console.log('✅ HttpOnly flag present');
            if (cookieHeader.includes('Path=/')) console.log('✅ Path=/ flag present');
        } else {
            console.error('❌ FAILURE: Set-Cookie auth_token MISSING');
            console.log('Headers:', regRes.headers);
            process.exit(1);
        }

    } catch (e) {
        console.error('❌ Register Exception', e);
        process.exit(1);
    }

    // 2. Login & Check Cookie
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
            console.error('❌ FAILURE: Token FOUND in JSON body (Should be removed)');
            process.exit(1);
        }

        const cookieHeader = loginRes.headers.get('set-cookie');
        if (cookieHeader && cookieHeader.includes('auth_token=')) {
            console.log('✅ Set-Cookie header present with auth_token');
        } else {
            console.error('❌ FAILURE: Set-Cookie auth_token MISSING');
            process.exit(1);
        }

    } catch (e) {
        console.error('❌ Login Exception', e);
        process.exit(1);
    }

    // 3. Logout & Check Cookie Cleared
    console.log(`\n🔹 Logging out...`);
    try {
        const logoutRes = await fetch(`${BASE_URL}/api/auth?action=logout`, {
            method: 'POST'
        });

        if (logoutRes.status !== 200) {
            console.error('❌ Logout Failed');
            process.exit(1);
        }

        console.log('✅ Logout SUCCESS');
        const cookieHeader = logoutRes.headers.get('set-cookie');
        // Look for Max-Age=0 or empty value
        if (cookieHeader && (cookieHeader.includes('Max-Age=0') || cookieHeader.includes('auth_token=;'))) {
            console.log('✅ Set-Cookie header clears auth_token');
        } else {
            console.error('❌ FAILURE: Cookie not cleared correctly');
            console.log('Headers:', cookieHeader);
            process.exit(1);
        }

    } catch (e) {
        console.error('❌ Logout Exception', e);
        process.exit(1);
    }

    console.log('\n✨ HTTP-only Cookie Auth Verified!');
    process.exit(0);
}

testCookieAuth();
