
const BASE_URL = 'http://mechanical-city.vercel.app';

async function testAuth() {
    console.log('🧪 Starting Auth API Verification...');
    let hasError = false;

    // 1. Register New User
    const testUser = {
        name: 'Test User',
        email: `test-${Date.now()}@example.com`,
        password: 'password123'
    };

    try {
        console.log(`\n🔹 Testing Registration: ${testUser.email}`);
        const regRes = await fetch(`${BASE_URL}/api/auth?action=register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testUser)
        });

        if (regRes.status === 201) {
            console.log('✅ Registration SUCCESS');
            const data = await regRes.json();
            console.log('   Response:', data);
        } else {
            console.error('❌ Registration FAILED', regRes.status);
            console.error('   ', await regRes.text());
            hasError = true;
        }
    } catch (e) {
        console.error('❌ Registration Request Failed', e);
        hasError = true;
    }

    // 2. Register Duplicate User
    try {
        console.log(`\n🔹 Testing Duplicate Registration: ${testUser.email}`);
        const dupRes = await fetch(`${BASE_URL}/api/auth?action=register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testUser)
        });

        if (dupRes.status === 400) {
            console.log('✅ Duplicate Blocked SUCCESS (Expected 400)');
        } else {
            console.error('❌ Duplicate Block FAILED', dupRes.status);
            console.error('   ', await dupRes.text());
            hasError = true;
        }
    } catch (e) {
        console.error('❌ Duplicate Request Failed', e);
        hasError = true;
    }

    // 3. Login Valid Credentials
    try {
        console.log(`\n🔹 Testing Valid Login: ${testUser.email}`);
        const loginRes = await fetch(`${BASE_URL}/api/auth?action=login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: testUser.email, password: testUser.password })
        });

        if (loginRes.status === 200) {
            console.log('✅ Login SUCCESS');
            const data = await loginRes.json();
            console.log('   Response:', data);
        } else {
            console.error('❌ Login FAILED', loginRes.status);
            console.error('   ', await loginRes.text());
            hasError = true;
        }
    } catch (e) {
        console.error('❌ Login Request Failed', e);
        hasError = true;
    }

    // 4. Login Invalid Credentials
    try {
        console.log(`\n🔹 Testing Invalid Login (Wrong Password)`);
        const failRes = await fetch(`${BASE_URL}/api/auth?action=login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: testUser.email, password: 'wrongpassword' })
        });

        if (failRes.status === 401) {
            console.log('✅ Invalid Login Rejected SUCCESS (Expected 401)');
        } else {
            console.error('❌ Invalid Login Rejection FAILED', failRes.status);
            console.error('   ', await failRes.text());
            hasError = true;
        }
    } catch (e) {
        console.error('❌ Invalid Login Request Failed', e);
        hasError = true;
    }

    if (hasError) {
        console.log('\n❌ Verification Completed with ERRORS');
        process.exit(1);
    } else {
        console.log('\n✅ Verification Completed SUCCESSFULLY');
        process.exit(0);
    }
}

testAuth();
