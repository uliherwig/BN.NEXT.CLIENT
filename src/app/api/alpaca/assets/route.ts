import { NextRequest, NextResponse } from 'next/server';
import { alpacaTradingService } from '@/service/alpacaTradingService';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const symbol = body.symbol;
    const data = await alpacaTradingService.toggleAssetSelection(symbol ?? '');
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {

    console.log('fetching data');

    // console.log('req:', req);
    const data = await alpacaTradingService.getAssets();
  

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
