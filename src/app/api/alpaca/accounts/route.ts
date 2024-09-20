import { NextRequest, NextResponse } from 'next/server';
import { alpacaTradingService } from '@/service/alpacaTradingService';



export async function GET(req: NextRequest) {
  try {
    const data = await alpacaTradingService.getAccount();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

