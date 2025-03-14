import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/app/lib/auth';
import { getServerSession } from 'next-auth';
import { cacheService } from '@/service/cache-service';

export async function GET(req: NextRequest) {

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const endpoint = `${process.env.ALPACA_API_URL}/AlpacaTrading/orders?userId=${session.user?.id}&orderStatusFilter=2`;

  const res = await fetch(endpoint, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${session.accessToken}`,
    }
  });

  if (res.ok) {
    const data = await res.json();

    return NextResponse.json(data);
  } else {
    return NextResponse.json({ error: res.statusText }, { status: res.status });
  }
}
