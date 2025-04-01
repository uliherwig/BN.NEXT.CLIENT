import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/app/lib/auth';
import { getServerSession } from 'next-auth';
import { ErrorCode } from '@/models/common/error-code';
import { basicFetch } from '@/app/lib/fetchFunctions';
import { AlpacaUserSettings } from '@/models/alpaca/alpaca-user-settings';

export async function GET(req: NextRequest) {
     const session = await getServerSession(authOptions);
      if (!session) {
        return NextResponse.json({ error: ErrorCode.Unauthorized });
      }  
      const endpoint = `${process.env.ALPACA_API_URL}/usersettings`;
      var dats = await basicFetch<AlpacaUserSettings>(endpoint, session.accessToken);
      return NextResponse.json(dats);
}