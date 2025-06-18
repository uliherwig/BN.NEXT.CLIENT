import { authOptions } from '@/app/lib/auth';
import { authorizedFetch } from '@/app/lib/fetchFunctions';
import { AlpacaAssetModel } from '@/models/alpaca/alpaca-asset-model';
import { ErrorCode } from '@/models/common/error-code';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
   if (!session) {
      return NextResponse.json({ error: ErrorCode.Unauthorized }, { status: 401 });
    }
    const endpoint = `${process.env.ALPACA_API_URL}/AlpacaTrading/assets`;
    var dats = await authorizedFetch<AlpacaAssetModel[]>(endpoint, session.accessToken);
    return NextResponse.json(dats);

}
