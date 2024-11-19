import { NextRequest, NextResponse } from 'next/server';
import fetchWithCache from '@/app/lib/fetchFunctions';

export async function GET(req: NextRequest) {
  try {
    const url = `${process.env.ALPACA_API_URL}/AlpacaTrading/assets`;
    const data =  await fetchWithCache(url);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
