import { authOptions } from "@/app/lib/auth";
import { authorizedFetch } from "@/app/lib/fetchFunctions";
import { getServerSession } from "next-auth";
import { ErrorCode } from "@/app/models/common/error-code";
import { NextRequest, NextResponse } from "next/server";
import { AlpacaStrategyTracking } from "@/app/models/alpaca/alpaca-strategy-tracking";
import { parseExecutionParams } from "@/app/models/strategy/ai-model";




// get strategies
export async function GET(req: NextRequest) {
    const id = req.nextUrl.searchParams.get('id') as string | null;
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: ErrorCode.Unauthorized });
    }
    let endpoint: string;
 
    // Get all
    endpoint = `${process.env.ALPACA_API_URL}/AlpacaTest/running-execution`;

    const data = await authorizedFetch<AlpacaStrategyTracking[]>(endpoint, session.accessToken);
    return NextResponse.json(data);

}



