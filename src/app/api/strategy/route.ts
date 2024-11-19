import { authOptions } from "@/app/lib/auth";
import { basicFetch } from "@/app/lib/fetchFunctions";
import { StrategySettingsModel } from "@/models/strategy/strategy-settings-model";
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
        var data = await basicFetch<StrategySettingsModel[]>(endpoint);
        return NextResponse.json(data);
    } catch (error) {
        console.log('error:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: ApiError.Unauthorized });
        }

        const userId = session.user?.id;
        if (!userId) {
            return NextResponse.json({ error: ApiError.Unauthorized });
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
        console.log('error:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: ApiError.Unauthorized });
        }

        const userId = session.user?.id;
        if (!userId) {
            return NextResponse.json({ error: ApiError.Unauthorized });
        }

        const testId = req.nextUrl.searchParams.get('testId') as string;
        console.log('testId:', testId);

        var endpoint = `${process.env.STRATEGY_API_URL}/strategy/${testId}`;

        console.log('endpoint:', endpoint);
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
        console.log('error:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}