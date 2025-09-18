import { NextResponse } from 'next/server';
import { menuList } from '@/db/menuList';

export async function GET() {
  try {
    return NextResponse.json(menuList, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch menu', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
