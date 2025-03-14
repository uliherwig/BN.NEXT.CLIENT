import { authOptions } from "@/app/lib/auth";
import { basicFetch } from "@/app/lib/fetchFunctions";
import { StrategySettings } from "@/models/strategy/strategy-settings";
import { getServerSession } from "next-auth";
import { ApiError } from "@/models/common/api-error";
import { NextRequest, NextResponse } from "next/server";

// TODO split this to 2 endpoints

export async function GET(req: NextRequest) {
    const strategyId = req.nextUrl.searchParams.get('strategyId') as string;     
    const bookmarked = req.nextUrl.searchParams.get('bookmarked') as string;

    try {
        const session = await getServerSession(authOptions);
        if (!session) {
          return NextResponse.json({ error: ApiError.Unauthorized });
        }
    
        const userId = session.user?.id;
        if (!userId) {
            return NextResponse.json({ error: ApiError.Unauthorized });
        }
        // console.log('session:', session);
        // console.log('session:', session.accessToken);
        // console.log('session:', authOptions.jwt);

        if (strategyId) {
            const endpoint = `${process.env.STRATEGY_API_URL}/strategy/${strategyId}`;          
            var data = await basicFetch<StrategySettings>(endpoint, session.accessToken);        
            return NextResponse.json(data);
        } else {           
            const endpoint = `${process.env.STRATEGY_API_URL}/strategy/settings/${userId}?bookmarked=${bookmarked}`;
            var dats = await basicFetch<StrategySettings[]>(endpoint, session.accessToken);
            return NextResponse.json(dats);
        }        

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
    const testId = req.nextUrl.searchParams.get('testId') as string;

    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: ApiError.Unauthorized });
        }

        const userId = session.user?.id;
        if (!userId) {
            return NextResponse.json({ error: ApiError.Unauthorized });
        }

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