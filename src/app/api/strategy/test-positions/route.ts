import { authOptions } from "@/app/lib/auth";
import { basicFetch } from "@/app/lib/fetchFunctions";
import { ErrorCode } from "@/models/common/error-code";
import { PositionModel } from "@/models/strategy/position-model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: ErrorCode.Unauthorized });
        }
        const testId = req.nextUrl.searchParams.get('testId') as string;
        const endpoint = `${process.env.STRATEGY_API_URL}/strategy/positions/${testId}`;

        var dats = await basicFetch<PositionModel>(endpoint, session.accessToken);
        return NextResponse.json(dats);
}