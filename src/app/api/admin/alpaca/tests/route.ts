import { authOptions } from "@/app/lib/auth";
import { authorizedFetch } from "@/app/lib/fetchFunctions";
import { getServerSession } from "next-auth";
import { ErrorCode } from "@/app/models/common/error-code";
import { NextRequest, NextResponse } from "next/server";
import { PositionModel } from "@/app/models/strategy/position-model";
import { TestResult } from "@/app/models/strategy/test-result";


// get strategies
export async function GET(req: NextRequest) {

    console.log(req.url)
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: ErrorCode.Unauthorized });
    }
    let endpoint: string;
    const id = req.nextUrl.searchParams.get('id') as string | null;
    const method = req.nextUrl.searchParams.get('method') as string | null;

    if (method === 'positions') {
        // Get by id
        endpoint = `${process.env.ALPACA_API_URL}/AlpacaTest/positions/${id}`;
        console.log(endpoint)


        const data = await authorizedFetch<PositionModel[]>(endpoint, session.accessToken);
        console.log(data)
     
        return NextResponse.json(data);
    }   
    if (method === 'results') {
        // Get by id
        endpoint = `${process.env.ALPACA_API_URL}/AlpacaTest/results/${id}`;
        const data = await authorizedFetch<TestResult[]>(endpoint, session.accessToken);
        console.log(data)

        return NextResponse.json(data);
    } 
}





