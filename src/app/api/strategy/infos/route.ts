import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import { ErrorCode } from "@/models/common/error-code";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: ErrorCode.Unauthorized });
  }

  const userId = session.user?.id;
  if (!userId) {
    return NextResponse.json({ error: ErrorCode.Unauthorized });
  }
  const { searchParams } = new URL(req.nextUrl);
  const strategyType = searchParams.get('strategyType');

  // const strategyType = req.nextUrl.searchParams.get('strategyType') as string;

  const endpoint = `${process.env.STRATEGY_API_URL}/strategy/infos/${userId}/${strategyType}`;
  const res = await fetch(endpoint, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${session.accessToken}`,
    }
  });

  if (res.ok) {
    const data = await res.json();

    return NextResponse.json(data);
  } else {
    return NextResponse.json({ error: res.statusText }, { status: res.status });
  }

}
