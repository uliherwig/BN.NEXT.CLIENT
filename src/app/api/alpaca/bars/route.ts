import { NextRequest, NextResponse } from 'next/server';
import { alpacaDataService } from '../../../../service/alpacaDataService';
import { AlpacaAsset } from '@/model/AlpacaAsset';
import { alpacaTradingService } from '../../../../service/alpacaTradingService';


// API route handler
export async function GET(req: NextRequest) {
  try {

    console.log('fetching data');

    // console.log('req:', req);
    const data = await alpacaDataService.getHistoricalBars('SPY', '2024-02-01', '2024-02-02', '1Min'); 
  

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
