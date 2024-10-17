import { NextRequest, NextResponse } from 'next/server';
import { alpacaDataService } from '../../../../service/alpacaDataService';
import { basicFetch } from '@/app/lib/fetchFunctions';
import { BacktestSettings } from '@/models/strategy/test-settings';


// API route handler
export async function GET(req: NextRequest) {
  try {
    const symbol = req.nextUrl.searchParams.get('symbol') as string;
    const startDate = req.nextUrl.searchParams.get('startDate') as string;
    const endDate = req.nextUrl.searchParams.get('endDate') as string;
    const timeFrame = req.nextUrl.searchParams.get('timeFrame') as string;

    console.log('params:', symbol, startDate, endDate, timeFrame);

    const url = `${process.env.ALPACA_API_URL}/AlpacaTest/historical-bars/${symbol}?startDate=${startDate}&endDate=${endDate}`
    const data = await basicFetch<any[]>(url);
    return NextResponse.json(data);
  } catch (error) {
    console.log('error:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
