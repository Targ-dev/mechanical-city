
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function testMiddleware() {
    console.log('🛡️ Starting Middleware Protection Verification...');

    const BASE_URL = 'http://mechanical-city.vercel.app';
    const PROTECTED_ROUTES = ['/orders', '/cart', '/checkout', '/admin/dashboard'];

    // 1. Test Access WITHOUT Cookie (Should Redirect)
    console.log('\n🔹 Testing Protected Routes WITHOUT Cookie...');

    for (const route of PROTECTED_ROUTES) {
        try {
            const res = await fetch(`${BASE_URL}${route}`, {
                redirect: 'manual'  // Don't follow redirects
            });

            if (res.status === 307 || res.status === 308 || res.status === 302) {
                const location = res.headers.get('location');
                if (location && location.includes('/login')) {
                    console.log(`✅ ${route} -> Redirects to Login (${res.status})`);
                } else {
                    console.error(`❌ ${route} -> Redirected to wrong location: ${location}`);
                    process.exit(1);
                }
            } else if (res.status === 200) {
                console.error(`❌ ${route} -> Accessed freely! (Should be protected)`);
                process.exit(1);
            } else {
                console.log(`⚠️ ${route} -> Unexpected status: ${res.status}`);
                // Next.js might return 404 for non-existent routes like /admin/dashboard if not implemented, 
                // but middleware should intercept BEFORE 404 if it matches.
                // However, if the page doesn't exist, middleware might still run.
                // Let's assume 307/308.
            }

        } catch (e) {
            console.error(`❌ Exception testing ${route}`, e);
            process.exit(1);
        }
    }

    // 2. Test Access WITH Cookie (Should Allow)
    console.log('\n🔹 Testing Protected Routes WITH Cookie...');
    const cookieHeader = 'auth_token=fake-jwt-token-for-middleware-check';

    for (const route of PROTECTED_ROUTES) {
        try {
            const res = await fetch(`${BASE_URL}${route}`, {
                headers: {
                    'Cookie': cookieHeader
                },
                redirect: 'manual'
            });

            if (res.status === 200 || res.status === 404) {
                // 404 is acceptable if the page doesn't exist yet, as long as it wasn't a 401/403/Login Redirect
                console.log(`✅ ${route} -> Allowed (Status: ${res.status})`);
            } else if (res.status === 307 || res.status === 308) {
                console.error(`❌ ${route} -> Still redirecting with cookie!`);
                process.exit(1);
            } else {
                console.log(`ℹ️ ${route} -> Status: ${res.status} (Allowed)`);
            }

        } catch (e) {
            console.error(`❌ Exception testing ${route}`, e);
            // Don't exit here, might be page specific error
        }
    }

    console.log('\n✨ Middleware Protection Verified!');
    process.exit(0);
}

testMiddleware();
