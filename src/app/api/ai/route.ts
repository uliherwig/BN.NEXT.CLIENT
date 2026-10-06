import { authOptions } from "@/app/lib/auth";
import { authorizedFetch } from "@/app/lib/fetchFunctions";
import { getServerSession } from "next-auth";
import { ErrorCode } from "@/app/models/common/error-code";
import { NextRequest, NextResponse } from "next/server";
import { AiModel } from "@/app/models/strategy/ai-model";
import { parseExecutionParams } from "@/app/models/strategy/ai-model";
import { cacheService } from "@/app/service/cache-service";
import { StrategySettingsDto } from '@/app/models/strategy/strategy-settings-dto';
import { StrategyTypeEnum } from "@/app/models/strategy/enums";



// get strategies
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
        endpoint = `${process.env.ALPACA_API_URL}/AlpacaTest/ai-strategies`;

        const data = await authorizedFetch<AiModel[]>(endpoint, session.accessToken);
        const parsedData = data.map(item => ({
            ...item,
            execution_params: parseExecutionParams(item.execution_params)
        }));
        cacheService.set(cacheKey, parsedData);
        return NextResponse.json(parsedData);
    }
}

// start strategy execution
export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: ErrorCode.Unauthorized });
    }

    // Parse the request body as JSON and convert to StrategySettingsDto
    const body = await req.json();
    const strategySettings = body as StrategySettingsDto;

    if (!strategySettings) {    
        return NextResponse.json({ error: ErrorCode.BadRequest });
    }
    let endpoint = `${process.env.ALPACA_API_URL}/AlpacaTest/start-execution`;
    if (strategySettings.strategyType == StrategyTypeEnum.LocalTest) {
         endpoint = `${process.env.ALPACA_API_URL}/AlpacaTest/test-execution`;
    }
    console.log('Starting Alpaca execution with endpoint:', endpoint, 'and body:', body);   
    const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify(strategySettings),
    });

    let responseData = {
        message: '',
        status: 0,
    };    


    // status 409 indicates conflict, e.g., execution already running
    if (res.status === 409) {
        console.log('AlpacaExec   ', { error: 'Execution already running' }, { status: 409 });
        responseData = {
            message: 'Execution already running',
            status: 409,
        }
        return NextResponse.json(responseData);
    }
    console.log('Starting Alpaca execution with endpoint:', endpoint, 'and body:', body);
    console.log('Response status:', res.status);
    const responseText = await res.text();
    console.log('Response text:', responseText);

    if (res.ok && res.status == 200) {
        responseData = {
            message: 'Execution started successfully',
            status: 200,
        }
        return NextResponse.json(responseData);

  
    } else {
        console.log('AlpacaExec   ', { error: 'Server Error' }, { status: 500 });
        responseData = {
            message: 'Server Error',
            status: 500,
        }
    }


    return NextResponse.json(responseData);
}

// stop strategy execution
export async function PUT(req: NextRequest) {
    const strategyName = req.nextUrl.searchParams.get('strategyName') as string | null;

    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: ErrorCode.Unauthorized });
    }
    const body = await req.json();

    const endpoint = `${process.env.ALPACA_API_URL}/AlpacaTest/stop-execution?strategyName=${strategyName}`;

    const res = await fetch(endpoint, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify(body),
    });

    console.log('Stopping Alpaca execution with endpoint:', endpoint, 'and body:', body);
    let responseData = {
        message: '',
        status: 0,
    };   

    if(res.ok) {
        responseData = {
            message: 'Execution stopped successfully',
            status: 200,
        }
        return NextResponse.json(responseData);
    }
    responseData = {
        message: 'Server Error',
        status: 500,
    }
    return NextResponse.json(responseData);
}



