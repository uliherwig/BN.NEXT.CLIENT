import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/app/lib/auth';
import { getServerSession } from 'next-auth';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user?.id;
    if (!userId) {
      return NextResponse.json({ error: 'User ID not found' }, { status: 400 });
    }

    const endpoint = `${process.env.ALPACA_API_URL}/AlpacaTrading/account/${userId}`;
    const res = await fetch(endpoint);
    if (res.status === 404) {

      const result = await res.json();
   
      if (result.message === 'WrongCredentials') {
        return NextResponse.json({ error: 'WrongCredentials' }, { status: 404 });
      }
      if (result.message === 'NoCredentials') {
        return NextResponse.json({ error: 'NoCredentials' }, { status: 404 });
      }
    }

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data);
    } else {
      return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }

  } catch (error) {
    console.error('Error fetching account data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}