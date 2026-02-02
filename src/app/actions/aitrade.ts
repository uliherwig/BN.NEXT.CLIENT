'use server'

import { z } from 'zod';
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/lib/auth";
import { StrategySettings } from '@/models/strategy/strategy-settings';
import { IndicatorEnum } from '@/models/strategy/enums';


export async function runAiTest(prevState: any, formData: FormData) {
    // Convert formData to a plain object if it's FormData or already an object
    const form =
        typeof formData?.entries === "function"
            ? Object.fromEntries(formData.entries())
            : formData;

    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
        return {
            errors: { session: ['Session is not available'] },
        };
    }


  

    console.log('FORM DATA', form);

    const isStrategyNameAvailable = async (name: string): Promise<boolean> => {
        const url = `${process.env.STRATEGY_API_URL}/strategy/exists/${name}`;
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.accessToken}`
            },
        });
        // console.log('RES', res);
        const data = await res.json();
        return !data;
    };

    const backtestSchemaRegister = z.object({
        name: z.string()
            .min(3)
            .max(10)
            .regex(/^[a-zA-Z0-9 ]+$/, "Name must contain only alphabetic characters and numbers")
            .refine(async (name) => {
                return await isStrategyNameAvailable(name);
            }, {
                message: "Name already exists",
            }),

       
        takeProfitPercent: z.number().min(0.0001).max(0.1),
        stopLossPercent: z.number().min(0.0001).max(0.1),
        startDate: z.date().min(new Date(2024, 0, 0), 'Start date may not be before 2024').max(new Date(), 'Start date may not be after today'),
        endDate: z.date().min(new Date(2024, 0, 0), 'End date may not be before 2024').max(new Date(), 'End date may not be after today'),

    });


    const startDate = new Date(Date.parse(form['startDate']));
    const endDate = new Date(Date.parse(form['endDate']));

    const validatedFields = await backtestSchemaRegister.safeParseAsync({
        name: form['name'],       
        takeProfitPercent: parseFloat(form['takeProfitPercent']),
        stopLossPercent: parseFloat(form['stopLossPercent']),
        startDate: startDate,
        endDate: endDate
    });

    if (!validatedFields.success) {
        console.log('VALIDATION ERRORS', validatedFields.error.flatten().fieldErrors);
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
        }
    } else {
        

        const payload: StrategySettings = {
            "id": "00000000-0000-0000-0000-000000000000",
            "userId": session.user.id!,
            "broker": "Alpaca",
            "name": form['name'],
            "asset": form['asset'],
            "quantity": parseFloat(form['quantity']),
            "takeProfitPercent": parseFloat(form['takeProfitPercent']) || 0.0,
            "stopLossPercent": parseFloat(form['stopLossPercent']) || 0.0,
            "startDate": startDate.toISOString(),
            "endDate": endDate.toISOString(),
            "indicatorType": 0,
            "trailingStop": parseFloat(form['trailingStop']) || 0.0,
            "allowOvernight": false,
            "bookmarked": false,
            "testStamp": new Date().toISOString(),
            "strategyParams": `{"id": "${form['modelId']}", "name": ""}`,
            "strategyType": 2,
            "spreadPerTrade": 0,
            "overnightFeeRate": 0,
            "reverseTrade": false,
            "timeFrame": form['timeFrame'] || 4,
        };

        const endpoint = `${process.env.ALPACA_API_URL}/AlpacaTest/run-test` 
        console.log('PAYLOAD', payload);  

        const response = await fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.accessToken}`
            },
        });

        let result: any = { message: '', success: false, errors: {} }

        console.log('RESPONSE', response);

        if (response.ok) {
            result = { message: '', success: true, errors: {} }
        } 

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



