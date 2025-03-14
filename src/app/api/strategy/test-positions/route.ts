import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const testId = req.nextUrl.searchParams.get('testId') as string;
    const session = await getServerSession(authOptions);

    const endpoint = `${process.env.STRATEGY_API_URL}/strategy/positions/${testId}`;
    const res = await fetch(endpoint, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session!.accessToken}`,
        }
    });

    if (res.ok) {
        const data = await res.json();

        return NextResponse.json(data);
    } else {
        return NextResponse.json({ error: res.statusText }, { status: res.status });
    }
}