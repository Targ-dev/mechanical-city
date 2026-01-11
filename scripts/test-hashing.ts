
import dotenv from 'dotenv';
import path from 'path';

// Load env vars immediately
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function testHashing() {
    console.log('🔒 Starting Password Hashing Verification...');

    // Dynamic imports to ensure env vars are loaded first
    const { default: connectDB } = await import('../lib/db');
    const { default: User } = await import('../models/User');
    const { default: bcrypt } = await import('bcryptjs');

    try {
        await connectDB();

        const testEmail = `hash-test-${Date.now()}@example.com`;
        const plainPassword = 'securePassword123';

        // 1. Create User
        console.log(`\n🔹 Creating user: ${testEmail}`);
        const user = await User.create({
            name: 'Hash Tester',
            email: testEmail,
            password: plainPassword
        });

        console.log('✅ User created successfully');

        // 2. Verify Hashing
        console.log('\n🔹 Verifying password hashing...');
        if (user.password === plainPassword) {
            console.error('❌ FAILURE: Password was NOT hashed!');
            process.exit(1);
        } else {
            console.log('✅ SUCCESS: Password is not plain text');
            console.log(`   Hash: ${user.password.substring(0, 20)}...`);
        }

        // 3. Verify Comparison
        console.log('\n🔹 Verifying bcrypt comparison...');
        const isMatch = await bcrypt.compare(plainPassword, user.password);
        if (isMatch) {
            console.log('✅ SUCCESS: bcrypt.compare returned true');
        } else {
            console.error('❌ FAILURE: bcrypt.compare returned false');
            process.exit(1);
        }

        // 4. Verify Re-save (Idempotency)
        console.log('\n🔹 Verifying re-save (should not re-hash)...');
        user.name = 'Hash Tester Updated';
        await user.save();

        // Fetch fresh from DB to be sure
        const updatedUser = await User.findById(user._id);
        if (!updatedUser) throw new Error('User not found after update');

        const isMatchAfterUpdate = await bcrypt.compare(plainPassword, updatedUser.password);

        if (isMatchAfterUpdate) {
            console.log('✅ SUCCESS: Password still valid after update');
        } else {
            console.error('❌ FAILURE: Password invalid after update (Double Hashing occurred?)');
            process.exit(1);
        }

        console.log('\n✨ All Hashing Checks Passed!');
        process.exit(0);

    } catch (error) {
        console.error('❌ An error occurred:', error);
        process.exit(1);
    }
}

testHashing();
