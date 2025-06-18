import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/app/lib/auth';
import { getServerSession } from 'next-auth';
import { AlpacaOrderModel } from '@/models/alpaca/alpaca-order-model';
import { authorizedFetch } from '@/app/lib/fetchFunctions';
import { ErrorCode } from '@/models/common/error-code';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: ErrorCode.Unauthorized });
  }
  const endpoint = `${process.env.ALPACA_API_URL}/AlpacaTrading/orders?orderStatusFilter=2`;

  var dats = await authorizedFetch<AlpacaOrderModel>(endpoint, session.accessToken);
  return NextResponse.json(dats);
}
