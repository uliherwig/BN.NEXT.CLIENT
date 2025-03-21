import { NextRequest, NextResponse } from 'next/server';
import { basicFetch } from '@/app/lib/fetchFunctions';


// API route handler
export async function GET(req: NextRequest) {

  try {
    const endpoint = `${process.env.IDENTITY_API_URL}/account/test-call?email=testuser@mail.local`;

    const data = await basicFetch<any>(endpoint);
    return NextResponse.json(data);
  } catch (error) {

    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
