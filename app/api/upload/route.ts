import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import jwt from 'jsonwebtoken';
import User from '@/models/User';
import connectDB from '@/lib/db';

async function isAdmin(request: NextRequest) {
    const token = request.cookies.get('auth_token')?.value;
    if (!token || !process.env.JWT_SECRET) return false;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string };
        await connectDB();
        const user = await User.findById(decoded.id);
        return user && user.role === 'admin';
    } catch (error) {
        return false;
    }
}

export async function POST(request: NextRequest) {
    try {
        if (!(await isAdmin(request))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create unique filename
        const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
        const uploadDir = join(process.cwd(), 'public', 'uploads');

        // Ensure upload directory exists
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (err) {
            // Ignore if exists
        }

        const path = join(uploadDir, filename);
        await writeFile(path, buffer);

        const imageUrl = `/uploads/${filename}`;

        return NextResponse.json({ url: imageUrl });
    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
