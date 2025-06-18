import { NextRequest, NextResponse } from 'next/server';
import { authorizedFetch } from '@/app/lib/fetchFunctions';
import { authOptions } from '@/app/lib/auth';
import { getServerSession } from 'next-auth';
import { ErrorCode } from '@/models/common/error-code';
import { AlpacaPositionModel } from '@/models/alpaca/alpaca-position-model';

export async function GET(req: NextRequest) {

      const session = await getServerSession(authOptions);
      if (!session) {
        return NextResponse.json({ error: ErrorCode.Unauthorized });
      }  
      const endpoint = `${process.env.ALPACA_API_URL}/AlpacaTrading/positions`;
      var dats = await authorizedFetch<AlpacaPositionModel[]>(endpoint, session.accessToken);
      return NextResponse.json(dats); 
}
