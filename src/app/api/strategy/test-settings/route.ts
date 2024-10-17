import { basicFetch } from "@/app/lib/fetchFunctions";
import { BacktestSettings } from "@/models/strategy/test-settings";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const email = req.nextUrl.searchParams.get('email') as string;
        const endpoint = `${process.env.STRATEGY_API_URL}/strategy/settings/${email}`;
        var data = await basicFetch<BacktestSettings[]>(endpoint);
        return NextResponse.json(data);
    } catch (error) {
        console.log('error:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}