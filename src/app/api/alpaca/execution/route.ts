import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/app/lib/auth';
import { getServerSession } from 'next-auth';

export async function GET(req: NextRequest) {

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const res = await fetch(`${process.env.ALPACA_API_URL}/AlpacaTest/get-execution/${session.user.id}`);
  if (res.ok) {
    const data = await res.json();

    return NextResponse.json(data);
  } else {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  var userId = session.user.id;
  const strategyId = req.nextUrl.searchParams.get('strategyId') as string;

  var endpoint = `${process.env.ALPACA_API_URL}/AlpacaTest/start-execution/${userId}/${strategyId}`;

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.ok) {
    const data = await res.json();
    return NextResponse.json(data);
  } else {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  var endpoint = `${process.env.ALPACA_API_URL}/AlpacaTest/stop-execution/${session.user.id}`;

  const res = await fetch(endpoint, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.ok) {
    return NextResponse.json({ status: 200 });
  } else {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}