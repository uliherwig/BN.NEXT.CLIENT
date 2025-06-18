import { NextRequest, NextResponse } from 'next/server';
import { authorizedFetch } from '@/app/lib/fetchFunctions';
import { authOptions } from '@/app/lib/auth';
import { ErrorCode } from '@/models/common/error-code';
import { getServerSession } from 'next-auth';


// API route handler
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: ErrorCode.Unauthorized });
  }

  const symbol = req.nextUrl.searchParams.get('symbol') as string;
  const startDate = req.nextUrl.searchParams.get('startDate') as string;
  const endDate = req.nextUrl.searchParams.get('endDate') as string;
  const timeFrame = req.nextUrl.searchParams.get('timeFrame') as string;

  const endpoint = `${process.env.ALPACA_API_URL}/AlpacaTest/historical-bars/${symbol}?startDate=${startDate}&endDate=${endDate}`
  var dats = await authorizedFetch<any[]>(endpoint, session.accessToken);
  return NextResponse.json(dats);

}
