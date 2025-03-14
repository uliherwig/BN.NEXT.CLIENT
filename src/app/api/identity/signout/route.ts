import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function POST(req: NextRequest) {

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.json('No token found');
  }

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

    return NextResponse.json({ error: res.statusText }, { status: res.status });

  }


}
