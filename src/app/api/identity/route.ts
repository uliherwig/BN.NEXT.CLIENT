import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

//
// Get User Account
//
export async function GET(req: NextRequest) {

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
  }
  return NextResponse.json({ error: res.statusText }, { status: res.status });
}

//
// Signout User Account
//
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
  }
  return NextResponse.json({ error: res.statusText }, { status: res.status });
}

//
// Update User Account - Confirm Email
//
export async function PUT(req: NextRequest) {
  const body = await req.json();
  const params = {
    "token": body.token,
  }

  const response = await fetch(`${process.env.IDENTITY_API_URL}/Account/confirm`, {
    method: 'PUT',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const res: any = await response.json();
  return NextResponse.json(res);
}

