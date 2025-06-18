import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/app/lib/auth';
import { getServerSession } from 'next-auth';
import { basicFetch } from '@/app/lib/fetchFunctions';
import { ErrorCode } from '@/models/common/error-code';

// get active execution
// export async function GET(req: NextRequest) {
//     const session = await getServerSession(authOptions);
//     if (!session) {
//       return NextResponse.json({ error: ErrorCode.Unauthorized });
//     }
  
//     const endpoint = `${process.env.ALPACA_API_URL}/alpacatrading/get-execution`;
//     var dats = await basicFetch<any>(endpoint, session.accessToken);
//     return NextResponse.json(dats);
// }

// start execution
export async function POST(req: NextRequest) {

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }


  const strategyId = req.nextUrl.searchParams.get('strategyId') as string;
  console.log('strategyId', strategyId);
  var endpoint = `${process.env.ALPACA_API_URL}/alpacatest/start-execution/${strategyId}`;

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.accessToken}`,
    },
  });

  if (res.ok) {
    const data = await res.json();
    return NextResponse.json(data);
  } else {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}

// stop execution
export async function PUT(req: NextRequest) {

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  var endpoint = `${process.env.ALPACA_API_URL}/alpacatrading/stop-execution`;

  console.log('endpoint', endpoint);

  const res = await fetch(endpoint, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.accessToken}`,
    },
  });

  if (res.ok) {
    return NextResponse.json({ status: 200 });
  } else {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}