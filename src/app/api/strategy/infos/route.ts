import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import { ErrorCode } from "@/models/common/error-code";
import { NextRequest, NextResponse } from "next/server";
import { basicFetch } from "@/app/lib/fetchFunctions";
import { StrategyInfo } from "@/models/strategy/strategy-info";

// strategy infos
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.nextUrl);
  const strategyType = searchParams.get('strategyType');
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: ErrorCode.Unauthorized });
  }

  const endpoint = `${process.env.STRATEGY_API_URL}/strategy/infos/${strategyType}`;
  var dats = await basicFetch<StrategyInfo[]>(endpoint, session.accessToken);
  return NextResponse.json(dats);
}
