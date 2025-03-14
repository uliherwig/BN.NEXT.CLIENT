import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/app/lib/auth';
import { getServerSession } from 'next-auth';
import { cacheService } from '@/service/cache-service';

export async function GET(req: NextRequest) {
 
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const cacheKey = `account_${session.user?.id}`;
    const cachedData = cacheService.get<any>(cacheKey);
    if (cachedData) {
      return NextResponse.json(cachedData);
    }

    const endpoint = `${process.env.ALPACA_API_URL}/AlpacaTrading/account`;
    const res = await fetch(endpoint, {
      headers: {
        'Authorization': `Bearer ${session.accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (res.ok) {
      const data = await res.json();
      if (data.accountId)
        cacheService.set(cacheKey, data);
      return NextResponse.json(data);
    } else {
      return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
 
}