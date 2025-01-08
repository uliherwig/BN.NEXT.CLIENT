import { NextRequest, NextResponse } from 'next/server';
import { basicFetch } from '@/app/lib/fetchFunctions';


// API route handler
export async function GET(req: NextRequest) {
  try {
    const symbol = req.nextUrl.searchParams.get('symbol') as string;
    const startDate = req.nextUrl.searchParams.get('startDate') as string;
    const endDate = req.nextUrl.searchParams.get('endDate') as string;
    const timeFrame = req.nextUrl.searchParams.get('timeFrame') as string;


    const url = `${process.env.ALPACA_API_URL}/AlpacaTest/historical-bars/${symbol}?startDate=${startDate}&endDate=${endDate}`
    const data = await basicFetch<any[]>(url);
    return NextResponse.json(data);
  } catch (error) {

    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
