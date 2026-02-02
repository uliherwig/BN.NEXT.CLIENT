import { authOptions } from "@/app/lib/auth";
import { authorizedFetch } from "@/app/lib/fetchFunctions";
import { getServerSession } from "next-auth";
import { ErrorCode } from "@/models/common/error-code";
import { NextRequest, NextResponse } from "next/server";
import { AiModel } from "@/models/strategy/ai-model";
import { parseExecutionParams } from "@/models/strategy/ai-model";
import { StrategySettings } from "@/models/strategy/strategy-settings";
import { cacheService } from "@/service/cache-service";


// get strategy by id
export async function GET(req: NextRequest) {
    const id = req.nextUrl.searchParams.get('id') as string | null;
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: ErrorCode.Unauthorized });
    }
    let endpoint: string;
    
    if (id) {
        // Get by id
        endpoint = `${process.env.STRATEGY_API_URL}/MachineLearning/${id}`;
        const data = await authorizedFetch<AiModel>(endpoint, session.accessToken);
        data.execution_params = parseExecutionParams(data.execution_params);
        return NextResponse.json(data);
    } else {
        const cacheKey = 'ai_models_list';
        const cachedData = cacheService.get<any>(cacheKey);
        if (cachedData) {
            return NextResponse.json(cachedData);
        }
        // Get all
        endpoint = `${process.env.STRATEGY_API_URL}/MachineLearning`;
        const data = await authorizedFetch<AiModel[]>(endpoint, session.accessToken);
        const parsedData = data.map(item => ({
            ...item,
            execution_params: parseExecutionParams(item.execution_params)
        }));
        cacheService.set(cacheKey, parsedData);
        return NextResponse.json(parsedData);
    }
}

