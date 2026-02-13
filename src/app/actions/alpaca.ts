'use server'

import { z } from 'zod';
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/lib/auth";
import { StrategySettings } from '@/app/models/strategy/strategy-settings';
import { IndicatorEnum, TimeFrameEnum } from '@/app/models/strategy/enums';

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


export async function runStrategy(prevState: any, formData: FormData) {

    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
        return {
            errors: { session: ['Session is not available'] },
        };
    } 
    console.log('FORM DATA', formData);
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
            .regex(/^[a-zA-Z0-9]+$/, "Username must contain only alphabetic characters and numbers")
            .refine(async (name) => {
                return await isStrategyNameAvailable(name);
            }, {
                message: "Name already exists",
            }),
      
        takeProfitPercent: z.number().min(0.01).max(2.5),
        stopLossPercent: z.number().min(0.01).max(1.5),
        startDate: z.date().min(new Date(2024, 0, 0), 'Start date may not be before 2024').max(new Date(), 'Start date may not be after today'),
        endDate: z.date().min(new Date(2024, 0, 0), 'End date may not be before 2024').max(new Date(), 'End date may not be after today'),

    });
   


    const startDate = new Date(Date.parse(formData.get('startDate') as string));
    const endDate = new Date(Date.parse(formData.get('endDate') as string));

    const validatedFields = await backtestSchemaRegister.safeParseAsync({
        name: formData.get('name'),
        asset: formData.get('asset'),
        takeProfitPercent: parseFloat(formData.get('takeProfitPercent') as string),
        stopLossPercent: parseFloat(formData.get('stopLossPercent') as string),
        startDate: startDate,
        endDate: endDate,
        indicator: formData.get('indicator'),
        timeFrame: formData.get('timeFrame'),
        closePositionEod: formData.get('closePositionEod') === 'on',
    });

    console.log('VALIDATION RESULT', validatedFields);
    console.log('VALIDATION ERRORS', validatedFields.error?.flatten());

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
        }

    } else {

        let strategyParams = GetStrategyParams(formData);

        const payload: StrategySettings = {
            id: "00000000-0000-0000-0000-000000000000",
            userId: session.user.id!,
            broker: "Alpaca",
            name: formData.get('name') as string,
            asset: formData.get('asset') as string,
            quantity: parseFloat(formData.get('quantity') as string),
            takeProfitPercent: parseFloat(formData.get('takeProfitPercent') as string) || 0.0,
            stopLossPercent: parseFloat(formData.get('takeProfitPercent') as string) || 0.0,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            indicatorType: parseInt(formData.get('indicator') as string),
            trailingStop: parseFloat(formData.get('trailingStop') as string) || 0.0,
            closePositionEod: formData.get('closePositionEod') === 'on',
            bookmarked: false,     
            strategyParams: strategyParams,
            strategyType: 1,
            spreadPerTrade: 0,
            overnightFeeRate: 0,
            reverseTrade: false,
            timeFrame: parseInt(formData.get('timeFrame') as string) || TimeFrameEnum.Minute
        };

        let strategyAction = formData.get('action') as string;
   
        // optimize option currently disabled
        strategyAction = '0'
        const endpoint = (strategyAction === '0') ?
            `${process.env.ALPACA_API_URL}/AlpacaTest/run-test` :
            `${process.env.ALPACA_API_URL}/AlpacaTest/optimize`;

        console.log('ENDPOINT', endpoint);
        console.log('PAYLOAD', payload);

  
   

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.accessToken}`
                },
            });

            if (!response.ok) {
                return { success: false, message: "Error", errors: {} };
            }

            return { success: true, message: "", errors: {} };

        } catch (err) {
            return { success: false, message: "Exception", errors: {} };
        }
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

    // extract keys with indicatorParams. prefix and create a new object without the prefix

    const strategyParamsObj: Record<string, any> = {};
    formData.forEach((value, key) => {
        if (key.startsWith('indicatorParams.')) {   
            const newKey = key.replace('indicatorParams.', '');
            strategyParamsObj[newKey] = value;
        }
    });  

    return JSON.stringify(strategyParamsObj);
}