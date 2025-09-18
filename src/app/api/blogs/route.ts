import { blogData } from '@/db/blogData';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json(blogData, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch blogs', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
