import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function GET(req: NextRequest) {


  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.json('No token found');
  }

  const endpoint = `${process.env.IDENTITY_API_URL}/Account/test-auth`;

  const res = await fetch(endpoint, {
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token.accessToken}`,
    },
  });


  if (res.ok) {
    const data = await res.json();

    return NextResponse.json(data);
  } else {
    return NextResponse.json({ error: res.statusText }, { status: res.status });

  }
}