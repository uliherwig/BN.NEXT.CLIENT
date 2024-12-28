import { authOptions } from "@/app/lib/auth";
import { basicFetch } from "@/app/lib/fetchFunctions";
import { StrategySettingsModel } from "@/models/strategy/strategy-settings-model";
import { getServerSession } from "next-auth";
import { ApiError } from "@/models/common/api-error";
import { NextRequest, NextResponse } from "next/server";
import { StrategyInfo } from "@/models/strategy/strategy-info";

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
          return NextResponse.json({ error: ApiError.Unauthorized });
        }
    
        const userId = session.user?.id;
        if (!userId) {
            return NextResponse.json({ error: ApiError.Unauthorized });
        }

        const strategyType = req.nextUrl.searchParams.get('strategyType') as string;
        
        const endpoint = `${process.env.STRATEGY_API_URL}/strategy/infos/${userId}/${strategyType}`;
        var data = await basicFetch<StrategyInfo[]>(endpoint);

        return NextResponse.json(data);
    } catch (error) {
        console.log('error:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}
