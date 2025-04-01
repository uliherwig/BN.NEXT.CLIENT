import { authOptions } from "@/app/lib/auth";
import { basicFetch } from "@/app/lib/fetchFunctions";
import { StrategySettings } from "@/models/strategy/strategy-settings";
import { getServerSession } from "next-auth";
import { ErrorCode } from "@/models/common/error-code";
import { NextRequest, NextResponse } from "next/server";

// get strategy by id
export async function GET(req: NextRequest) {
    const strategyId = req.nextUrl.searchParams.get('strategyId') as string;
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: ErrorCode.Unauthorized });
    }
    const endpoint = `${process.env.STRATEGY_API_URL}/strategy/${strategyId}`;
    var dats = await basicFetch<StrategySettings>(endpoint, session.accessToken);
    return NextResponse.json(dats);
}

// update strategy 
export async function PUT(req: NextRequest) {

    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: ErrorCode.Unauthorized });
    }

    const userId = session.user?.id;
    if (!userId) {
        return NextResponse.json({ error: ErrorCode.Unauthorized });
    }

    const json = await req.json();
    var endpoint = `${process.env.STRATEGY_API_URL}/strategy`;

    const options: RequestInit = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${session.accessToken}`,

        },
        body: JSON.stringify(json)
    };


    const res = await fetch(endpoint, options);

    const success = await res.json();

    const result = { message: '', success: success, errors: {} }
    return NextResponse.json(result);


}

// delete strategy by id
export async function DELETE(req: NextRequest) {
    const strategyId = req.nextUrl.searchParams.get('testId') as string;


    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: ErrorCode.Unauthorized });
    }

    const userId = session.user?.id;
    if (!userId) {
        return NextResponse.json({ error: ErrorCode.Unauthorized });
    }

    var endpoint = `${process.env.STRATEGY_API_URL}/strategy/${strategyId}`;

    const options: RequestInit = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${session!.accessToken}`,
        },
    };

    const res = await fetch(endpoint, options);
    const success = await res.json();
    const message = success ? '' : 'Not found';

    const result = { message: message, success: success, errors: {} }
    return NextResponse.json(result);


}