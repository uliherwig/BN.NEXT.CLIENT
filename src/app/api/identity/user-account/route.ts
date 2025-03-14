import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function GET(req: NextRequest) {

  console.log('API IDENTITY GET:', req);

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.json('No token found');
  }

  const endpoint = `${process.env.IDENTITY_API_URL}/account/my-account`;

  const options: RequestInit = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token.accessToken}`,
      'Content-Type': 'application/json',
    },
  };

  const res = await fetch(endpoint, options);
  if (res.ok) {
    const data = await res.json();
    return NextResponse.json(data);
  } else {

    switch (res.status) {
      case 401:
        return NextResponse.json({ error: res.statusText }, { status: 401 });
      default:
        return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
  }
}