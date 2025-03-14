import { authOptions } from "@/app/lib/auth";
import { basicFetch } from "@/app/lib/fetchFunctions";
import { getServerSession } from "next-auth";
import { ApiError } from "@/models/common/api-error";
import { NextRequest, NextResponse } from "next/server";
import { StrategyInfo } from "@/models/strategy/strategy-info";

export async function GET(req: NextRequest) {

        const session = await getServerSession(authOptions);
        if (!session) {
          return NextResponse.json({ error: ApiError.Unauthorized });
        }
    
        const userId = session.user?.id;
        if (!userId) {
            return NextResponse.json({ error: ApiError.Unauthorized });
        }
        const { searchParams } = new URL(req.nextUrl);
        const strategyType = searchParams.get('strategyType');

        // const strategyType = req.nextUrl.searchParams.get('strategyType') as string;
        
        const endpoint = `${process.env.STRATEGY_API_URL}/strategy/infos/${userId}/${strategyType}`;
        var data = await basicFetch<StrategyInfo[]>(endpoint);

        return NextResponse.json(data);

}
