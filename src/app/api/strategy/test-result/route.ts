import { authOptions } from "@/app/lib/auth";
import { authorizedFetch } from "@/app/lib/fetchFunctions";
import { ErrorCode } from "@/models/common/error-code";
import { TestResult } from "@/models/strategy/test-result";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: ErrorCode.Unauthorized });
    }
    const testId = req.nextUrl.searchParams.get('testId') as string;
    const endpoint = `${process.env.STRATEGY_API_URL}/strategy/results/${testId}`;
    var dats = await authorizedFetch<TestResult>(endpoint, session.accessToken);
    return NextResponse.json(dats);
}