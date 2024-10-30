import { authOptions } from "@/app/lib/auth";
import { basicFetch } from "@/app/lib/fetchFunctions";
import { BacktestSettings } from "@/models/strategy/test-settings";
import { getServerSession } from "next-auth";
import { ApiError } from "@/models/common/api-error";
import { NextRequest, NextResponse } from "next/server";

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
        
        const bookmarked = req.nextUrl.searchParams.get('bookmarked') as string;
        const endpoint = `${process.env.STRATEGY_API_URL}/strategy/settings/${userId}?bookmarked=${bookmarked}`;
        var data = await basicFetch<BacktestSettings[]>(endpoint);
        return NextResponse.json(data);
    } catch (error) {
        console.log('error:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}