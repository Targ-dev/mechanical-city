
import dotenv from 'dotenv';
import path from 'path';
import readline from 'readline';

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (query: string): Promise<string> => {
    return new Promise((resolve) => rl.question(query, resolve));
};

async function createAdmin() {
    // Dynamic imports to ensure env vars are loaded first
    const { default: connectDB } = await import('../lib/db');
    const { default: User } = await import('../models/User');

    try {
        await connectDB();
        console.log('🔐 Admin User Setup');
        console.log('-------------------');

        const email = await question('Enter Admin Email: ');
        const password = await question('Enter Admin Password: ');

        if (!email || !password) {
            console.error('❌ Email and password are required.');
            process.exit(1);
        }

        const existingUser = await User.findOne({ email: email.toLowerCase() });

        if (existingUser) {
            console.log(`⚠️  User ${email} already exists.`);
            const confirm = await question('Do you want to update this user to Admin role? (y/n): ');
            if (confirm.toLowerCase() === 'y') {
                existingUser.password = password; // Will be hashed by pre-save hook
                existingUser.role = 'admin';
                await existingUser.save();
                console.log('✅ User updated to Admin successfully!');
            } else {
                console.log('❌ Operation cancelled.');
            }
        } else {
            console.log('🆕 Creating new Admin user...');
            await User.create({
                name: 'Admin User',
                email,
                password,
                role: 'admin'
            });
            console.log('✅ Admin user created successfully!');
        }

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        rl.close();
        process.exit(0);
    }
}

createAdmin();
