import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import {IdentityService} from '@/service/identity-service';

export async function GET(req: NextRequest) {
  try {

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json('No token found');
    }

    // console.log('req:', req);
    const endpoint = `${process.env.IDENTITY_API_URL}/Account/test-auth`;

    const data = await fetch(endpoint, {
      headers: {
        'Authorization': `Bearer ${token.accessToken}`,
      },
    });
    console.log('data:', token);
    // console.log('data:', data);

    if (token.error === 'RefreshAccessTokenError') {
      IdentityService.signOut(req);
      return NextResponse.json({ error: 'RefreshAccessTokenError' });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}