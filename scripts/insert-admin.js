const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = "mongodb+srv://mernsachil:mechanicalcity2026@cluster0.y8tsgso.mongodb.net/?appName=Cluster0"

async function insertAdmin() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to DB');

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('sup@dmin@2026', salt);

        // Access the User collection directly
        const db = mongoose.connection.db;
        const usersCollection = db.collection('users');

        // Check if admin already exists
        const existingAdmin = await usersCollection.findOne({ email: 'alapat@mechanicalcity.com' });

        if (existingAdmin) {
            console.log('Admin user already exists!');
            console.log(existingAdmin);
        } else {
            console.log('Creating new admin user...');
            const result = await usersCollection.insertOne({
                name: 'System Admin',
                email: 'alapat@mechanicalcity.com',
                password: hashedPassword,
                role: 'admin',
                createdAt: new Date(),
                updatedAt: new Date()
            });
            console.log('Admin user successfully created!');
            console.log(result);
        }

    } catch (e) {
        console.error('Error inserting admin', e);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from DB');
    }
}

insertAdmin();
