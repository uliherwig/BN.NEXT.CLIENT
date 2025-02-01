import { NextRequest, NextResponse } from 'next/server';
import fetchWithCache, { basicFetch } from '@/app/lib/fetchFunctions';
import { authOptions } from '@/app/lib/auth';
import { getServerSession } from 'next-auth';
import { cacheService } from '@/service/cache-service';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const cacheKey = `orders_${session.user?.id}`;
    const cachedData = cacheService.get<any>(cacheKey);

    if (cachedData) {
      return NextResponse.json(cachedData);
    }
    const endpoint = `${process.env.ALPACA_API_URL}/AlpacaTrading/orders?userId=${session.user?.id}&orderStatusFilter=2`;

    const data = await basicFetch(endpoint);
    cacheService.set(cacheKey, data);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
