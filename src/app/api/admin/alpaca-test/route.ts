import { authOptions } from "@/app/lib/auth";
import { authorizedFetch } from "@/app/lib/fetchFunctions";
import { getServerSession } from "next-auth";
import { ErrorCode } from "@/app/models/common/error-code";
import { NextRequest, NextResponse } from "next/server";
import { StrategySettingsDto } from '@/app/models/strategy/strategy-settings-dto';

// get strategies
export async function GET(req: NextRequest) {

    console.log(req.url)
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: ErrorCode.Unauthorized });
    }
    let endpoint: string;
    const method = req.nextUrl.searchParams.get('method') as string | null;
    const asset = req.nextUrl.searchParams.get('asset') as string | null;

    if (method === 'alpaca-trade') {
        // Get by id
        endpoint = `${process.env.ALPACA_API_URL}/AlpacaData/latest-trade/${asset}`;
        const data = await authorizedFetch<StrategySettingsDto[]>(endpoint, session.accessToken);
        return NextResponse.json(data);
    } 
}




