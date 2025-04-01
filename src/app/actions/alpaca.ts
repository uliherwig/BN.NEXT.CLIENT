'use server'

import { z } from 'zod';
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/lib/auth";
import { StrategySettings } from '@/models/strategy/strategy-settings';
import { StrategyEnum } from '@/models/strategy/enums';

const schemaRegister = z.object({
    keyId: z.string().min(6, { message: "Input required" }),
    keySecret: z.string().min(6, { message: "Input required" }),

});

export async function addOrUpdateKeyAndSecret(prevState: any, formData: FormData) {

    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
        return {
            errors: { session: ['Session is not available'] },
        };
    }

    const validatedFields = schemaRegister.safeParse({
        keyId: formData.get('keyId'),
        keySecret: formData.get('keySecret')
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }

    } else {

        const json =
        {
            "userId": session.user.id,
            "alpacaKey": formData.get('keyId'),
            "alpacaSecret": formData.get('keySecret')
        }
        const method = formData.get('isUpdate') === 'true' ? 'PUT' : 'POST';

        var endpoint = `${process.env.ALPACA_API_URL}/UserSettings`;
        const options: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.accessToken}`,
            },
        };
        options.body = JSON.stringify(json);

        const res = await fetch(endpoint, options);
        const success = await res.json();
        const message = success ? 'AlpaceCredentialsStored' : 'AlpaceCredentialsStorageFailed';

        const result = { message: message, success: success, errors: {} }
        return result;
    }
}


export async function createAlpacaBacktest(prevState: any, formData: FormData) {

    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
        return {
            errors: { session: ['Session is not available'] },
        };
    }

    console.log('FORM DATA', session);

    const isStrategyNameAvailable = async (name: string): Promise<boolean> => {
        const url = `${process.env.STRATEGY_API_URL}/strategy/exists/${name}`;
        const res = await fetch(url,{
            method: 'GET',   
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.accessToken}`
            },
        });
        console.log('RES', res);
        const data = await res.json();
        return !data;
    };

    const backtestSchemaRegister = z.object({
        name: z.string()
            .min(3)
            .max(10)
            .regex(/^[a-zA-Z0-9]+$/, "Username must contain only alphabetic characters and numbers")
            .refine(async (name) => {
                return await isStrategyNameAvailable(name);
            }, {
                message: "Name already exists",
            }),

        symbol: z.string(),
        takeProfitPercent: z.number().min(1).max(25),
        // stopLossPercent: z.number().min(0.001).max(0.5),
        startDate: z.date().min(new Date(2024, 0, 0), 'Start date may not be before 2024').max(new Date(), 'Start date may not be after today'),
        endDate: z.date().min(new Date(2024, 0, 0), 'End date may not be before 2024').max(new Date(), 'End date may not be after today'),

    });


    const startDate = new Date(Date.parse(formData.get('startDate') as string));
    const endDate = new Date(Date.parse(formData.get('endDate') as string));

    const validatedFields = await backtestSchemaRegister.safeParseAsync({
        name: formData.get('name'),
        symbol: formData.get('symbol'),
        takeProfitPercent: parseFloat(formData.get('takeProfitPercent') as string),
        // stopLossPercent: parseFloat(formData.get('stopLossPercent') as string),
        startDate: startDate,
        endDate: endDate,
        strategy: formData.get('strategy'),
        timeFrame: formData.get('timeFrame'),
        allowOvernight: formData.get('allowOvernight') === 'on',
    });

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
        }

    } else {

        let strategyParams = GetStrategyParams(formData);

        const payload: StrategySettings = {
            "id": "00000000-0000-0000-0000-000000000000",
            "userId": session.user.id!,
            "broker": "Alpaca",
            "name": formData.get('name') as string,
            "asset": formData.get('symbol') as string,
            "quantity": parseFloat(formData.get('quantity') as string),
            "takeProfitPercent": parseFloat(formData.get('takeProfitPercent') as string),
            "stopLossPercent": 0.0,
            "startDate": startDate.toISOString(),
            "endDate": endDate.toISOString(),
            "strategyType": parseInt(formData.get('strategy') as string),
            "trailingStop": parseFloat(formData.get('trailingStop') as string),
            "allowOvernight": formData.get('allowOvernight') === 'on',
            "bookmarked": false,
            "testStamp": new Date().toISOString(),
            "strategyParams": strategyParams,
        };

        const response = await fetch(`${process.env.ALPACA_API_URL}/AlpacaTest/run-test`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.accessToken}`
            },
        });

        let success = false;

        console.log('RESPONSE', response);

        if (response.ok) {
            success = await response.json();
        }

        const result: any = { message: '', success: success, errors: {} }
        return result;
    }

}

export async function alpacaExecutionAction(prevState: any, formData: FormData) {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
        return {
            errors: { session: ['Session is not available'] },
        };
    }

    var userId = session.user.id;
    var strategyId = formData.get('strategyId');
    var isExecuting = formData.get('isExecuting');

    var endpoint = (isExecuting === 'false') ?
        `${process.env.ALPACA_API_URL}/AlpacaTest/start-execution/${userId}/${strategyId}` :
        `${process.env.ALPACA_API_URL}/AlpacaTest/stop-execution/${userId}`;

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.accessToken}`,
        },
    });

    return response.ok;

}



const GetStrategyParams = (formData: FormData) => {
    var strategyType = parseInt(formData.get('strategy') as string);
    let strategyParams: string;

    switch (strategyType) {
        case StrategyEnum.SMA:
            strategyParams = JSON.stringify({
                shortPeriod: parseInt(formData.get('shortPeriod') as string),
                longPeriod: parseInt(formData.get('longPeriod') as string),
                stopLossType: parseInt(formData.get('stopLossStrategy') as string),
                intersectionThreshold: parseFloat(formData.get('intersectionThreshold') as string),
            });
            break;
        case StrategyEnum.Breakout:
            strategyParams = JSON.stringify({
                breakoutPeriod: parseInt(formData.get('breakoutPeriod') as string),
                stopLossType: parseInt(formData.get('stopLossStrategy') as string),
            });
            break;
        default:
            throw new Error('Unknown strategy type');
    }

    return strategyParams;
}