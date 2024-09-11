import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';


export async function POST(req: NextRequest) {
  try {

    console.log('req: identity/signout');

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if(!token) {
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
      },
      body: JSON.stringify(body),
    });   
    if(!res.ok) {
      throw new Error('Failed to sign out');
    }

    return NextResponse.json(true, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
