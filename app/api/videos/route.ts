import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Video from '@/models/Video';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

async function isAdmin(request: NextRequest) {
  const token = request.cookies.get('auth_token_v2')?.value;
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

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');

    let query: any = {};
    if (type) {
      query.type = type;
    }

    const videos = await Video.find(query).sort({ createdAt: -1 });
    
    // Map _id to id for frontend
    const videosWithId = videos.map((video) => {
      const v = video.toObject();
      return {
        ...v,
        id: v._id.toString(),
      };
    });

    return NextResponse.json(videosWithId);
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!(await isAdmin(request))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();
    const { title, description, youtubeId, type, category, isActive } = body;

    if (!title || !youtubeId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const video = await Video.create({
      title,
      description: description || '',
      youtubeId,
      type: type || 'video',
      category: category || 'Uncategorized',
      isActive: isActive !== undefined ? isActive : true,
    });

    return NextResponse.json(video, { status: 201 });
  } catch (error) {
    console.error('Error creating video:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
