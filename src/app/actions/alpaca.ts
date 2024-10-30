'use server'

import { z } from 'zod';
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/lib/auth";
import { BacktestSettings } from '@/models/strategy/test-settings';
import { start } from 'repl';
import { basicFetch } from '../lib/fetchFunctions';

const schemaRegister = z.object({
    keyId: z.string().min(6, { message: "Input required" }),
    keySecret: z.string().min(6, { message: "Input required" }),

});

export async function addOrUpdateKeyAndSecret(prevState: any, formData: FormData) {

    console.log('formData:', formData);

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

        console.log('json:', method);
        var endpoint = `${process.env.ALPACA_API_URL}/UserSettings`;
        const options: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
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


const backtestSchemaRegister = z.object({
    name: z.string()
        .min(3)
        .max(10)
        .regex(/^[a-zA-Z0-9]+$/, "Username must contain only alphabetic characters and numbers")
        .refine(async (name) => {
            const response = await fetch(`${process.env.STRATEGY_API_URL}/Strategy/test/${name}`);
            const exists = await response.json();
            return !exists;
          }, {
            message: "Name already exists",
          }),

    symbol: z.string(),
    takeProfitPercent: z.number().min(1).max(25),
    // stopLossPercent: z.number().min(0.001).max(0.5),
    startDate: z.date().min(new Date(2024, 0, 0), 'Start date may not be before 2024').max(new Date(), 'Start date may not be after today'),
    endDate: z.date().min(new Date(2024, 0, 0), 'End date may not be before 2024').max(new Date(), 'End date may not be after today'),

});

export async function createAlpacaBacktest(prevState: any, formData: FormData) {

    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
        return {
            errors: { session: ['Session is not available'] },
        };
    }
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
        allowOvernight: formData.get('allowOvernight') === 'true',
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }

    } else {

        const payload: BacktestSettings = {
            "id": "00000000-0000-0000-0000-000000000000",
            "userId": session.user.id!,
            "broker": "Alpaca",
            "name": formData.get('name') as string,
            "symbol": formData.get('symbol') as string,
            "takeProfitPercent": parseFloat(formData.get('takeProfitPercent') as string),
            "stopLossPercent": 0.0,
            "startDate": startDate.toISOString(),
            "endDate": endDate.toISOString(),
            "strategy": parseInt(formData.get('strategy') as string),
            "breakoutPeriod": parseInt(formData.get('breakoutPeriod') as string),
            "trailingStop": parseFloat(formData.get('trailingStop') as string),
            "allowOvernight": formData.get('allowOvernight') === 'on',
            "bookmarked": false,
            "stopLossStrategy": parseInt(formData.get('stopLossStrategy') as string),
            "testStamp": new Date().toISOString()
        };

        const response = await fetch(`${process.env.ALPACA_API_URL}/Backtest`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('response:', response);
        let success = false;


        console.log('response:', response.status);

        if (response.ok) {

            success = await response.json();
        }
        const message = success ? 'BacktestCreated' : 'BacktestCreationFailed';

        const result: any = { message: message, success: success, errors: {} }
        return result;
    }
}