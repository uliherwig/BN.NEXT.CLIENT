import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import { ErrorCode } from "@/models/common/error-code";
import { NextRequest, NextResponse } from "next/server";
import { authorizedFetch } from "@/app/lib/fetchFunctions";
import { StrategyInfo } from "@/models/strategy/strategy-info";
import webpush from 'web-push';

const vapidKeys = {
  publicKey: process.env.NEXT_PUBLIC_VAPID_KEY!,
  privateKey: process.env.VAPID_PRIVATE_KEY!,
};

webpush.setVapidDetails('mailto:your-email@example.com', vapidKeys.publicKey, vapidKeys.privateKey);

export async function POST(request: Request) {
  const subscription = await request.json();
  // Save subscription to your database
  console.log('Subscription saved:', subscription);
  return NextResponse.json({ message: 'Subscription saved.' });
}

// strategy infos
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.nextUrl);
  const strategyType = searchParams.get('strategyType');
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: ErrorCode.Unauthorized });
  }

  const endpoint = `${process.env.STRATEGY_API_URL}/strategy/infos/${strategyType}`;
  var dats = await authorizedFetch<StrategyInfo[]>(endpoint, session.accessToken);
  return NextResponse.json(dats);
}