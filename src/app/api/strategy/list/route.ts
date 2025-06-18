import { authOptions } from "@/app/lib/auth";
import { authorizedFetch } from "@/app/lib/fetchFunctions";
import { StrategySettings } from "@/models/strategy/strategy-settings";
import { getServerSession } from "next-auth";
import { ErrorCode } from "@/models/common/error-code";
import { NextRequest, NextResponse } from "next/server";

// TODO split this to 2 endpoints

export async function GET(req: NextRequest) {

    const bookmarked = req.nextUrl.searchParams.get('bookmarked') as string;
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: ErrorCode.Unauthorized });
    }

    const endpoint = `${process.env.STRATEGY_API_URL}/strategy/settings?bookmarked=${bookmarked}`;
    var dats = await authorizedFetch<StrategySettings[]>(endpoint, session.accessToken);
    return NextResponse.json(dats);
}

export async function PUT(req: NextRequest) {
    try {
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
            },
            body: JSON.stringify(json)
        };

        const res = await fetch(endpoint, options);
        const success = await res.json();

        const result = { message: '', success: success, errors: {} }
        return NextResponse.json(result);

    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: ErrorCode.Unauthorized });
        }

        const userId = session.user?.id;
        if (!userId) {
            return NextResponse.json({ error: ErrorCode.Unauthorized });
        }

        const testId = req.nextUrl.searchParams.get('testId') as string;
        var endpoint = `${process.env.STRATEGY_API_URL}/strategy/${testId}`;

        const options: RequestInit = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const res = await fetch(endpoint, options);
        const success = await res.json();
        const message = success ? '' : 'Not found';

        const result = { message: message, success: success, errors: {} }
        return NextResponse.json(result);

    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}