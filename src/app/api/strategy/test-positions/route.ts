import { basicFetch } from "@/app/lib/fetchFunctions";
import { PositionModel } from "@/models/strategy/position-model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const testId = req.nextUrl.searchParams.get('testId') as string;

    try {
        const endpoint = `${process.env.STRATEGY_API_URL}/strategy/positions/${testId}`;
        var data = await basicFetch<PositionModel[]>(endpoint);
        return NextResponse.json(data);
    } catch (error) {
        console.log('error:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}