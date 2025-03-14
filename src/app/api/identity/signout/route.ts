import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { authOptions } from '@/app/lib/auth';
import { getServerSession } from 'next-auth';

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json('No token found');
    }

    console.log('token:', token);

    const endpoint = `${process.env.IDENTITY_API_URL}/Account/sign-out`;

    const body = {
      "refreshToken": token.refreshToken,
    }

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token.accessToken}`,
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      return NextResponse.json(true, { status: 200 });
    } else {
      throw new Error('Failed to sign out');
    }

  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
