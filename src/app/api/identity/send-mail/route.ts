import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function GET(req: NextRequest) { 

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

    return NextResponse.json({ error: res.statusText }, { status: res.status });

  }
}