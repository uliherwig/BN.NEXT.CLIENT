import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/app/lib/auth';
import { getServerSession } from 'next-auth';
import { ErrorCode } from '@/models/common/error-code';

export async function GET(req: NextRequest) {

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user?.id;
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const endpoint = `${process.env.ALPACA_API_URL}/usersettings/${userId}`;
    const res = await fetch(endpoint);

    if (res.status === 404) {
      const result = await res.json();   
      if (result.message === ErrorCode.NotFound) {
        return NextResponse.json({ error: ErrorCode.NotFound }, { status: 404 });
      }
    }

    if (res.ok) {
      const data = await res.json();

      return NextResponse.json(data);
    } else {
      return NextResponse.json({ error: ErrorCode.InternalServerError }, { status: 500 });
    }


}