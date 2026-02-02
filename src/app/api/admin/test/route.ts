import { authOptions } from "@/app/lib/auth";
import { authorizedFetch } from "@/app/lib/fetchFunctions";
import { getServerSession } from "next-auth";
import { ErrorCode } from "@/models/common/error-code";
import { NextRequest, NextResponse } from "next/server";

// get strategy by id
export async function GET(req: NextRequest) {

    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: ErrorCode.Unauthorized });
    }
    const endpoint = `${process.env.NOTIFICATION_API_URL}/Notification/test?notificationType=1`;

    console.log('ENDPOINT', endpoint);
    var dats = await authorizedFetch<string>(endpoint, session.accessToken);
    console.log('DATS', dats);
    return NextResponse.json(dats);
}
