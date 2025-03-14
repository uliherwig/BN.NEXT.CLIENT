import { authOptions } from '@/app/lib/auth';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {

    const session = await getServerSession(authOptions);  

    const endpoint = `${process.env.ALPACA_API_URL}/AlpacaTrading/assets`;
    const res = await fetch(endpoint, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session!.accessToken}`,
      }
    });
  
    if (res.ok) {
      const data = await res.json();
  
      return NextResponse.json(data);
    } else {
      return NextResponse.json({ error: res.statusText }, { status: res.status });
    }
}
