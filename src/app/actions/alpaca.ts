'use server'

import { z } from 'zod';
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/lib/auth";
import { BacktestSettings } from '@/models/alpaca/test-settings';
import { start } from 'repl';

const schemaRegister = z.object({
    keyId: z.string().min(6, { message: "Input required" }),
    keySecret: z.string().min(6, { message: "Input required" }),

});

export async function addOrUpdateKeyAndSecret(prevState: any, formData: FormData) {

    const session = await getServerSession(authOptions)

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
            "email": session.user.email,
            "symbols": "SPY",
            "alpacaKey": formData.get('keyId'),
            "alpacaSecret": formData.get('keySecret')
        }

        var addOrUpdate = formData.get('AddOrUpdate') === 'true' ? 'POST' : 'PUT';


        const response = await fetch(`${process.env.ALPACA_API_URL}/UserSettings`, {
            method: addOrUpdate,
            body: JSON.stringify(json),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const success = await response.json();
        const message = success ? 'AlpaceCredentialsStored' : 'AlpaceCredentialsStorageFailed';

        const result: any = { message: message, success: success, errors: {} }
        return result;
    }
}


const backtestSchemaRegister = z.object({
    name: z.string()
        .min(3)
        .max(10)
        .regex(/^[a-zA-Z0-9]+$/, "Username must contain only alphabetic characters and numbers"),

    symbol: z.string(),
    takeProfitFactor: z.number().min(0.001).max(0.5),
    stopLossFactor: z.number().min(0.001).max(0.5),
    startDate: z.date().min(new Date(2024,0,0), 'Start date may not be before 2024').max(new Date(), 'Start date may not be after today'),
    endDate: z.date().min(new Date(2024,0,0), 'End date may not be before 2024').max(new Date(), 'End date may not be after today'),
    strategy: z.string(),
    timeFrame: z.string(),
});

export async function createAlpacaBacktest(prevState: any, formData: FormData) {

    console.log('settings   ', formData)

    const session = await getServerSession(authOptions)
    const startDate = new Date(Date.parse(formData.get('startDate') as string));
    const endDate = new Date(Date.parse(formData.get('endDate') as string));
    const validatedFields = backtestSchemaRegister.safeParse({
        name: formData.get('name'),
        symbol: formData.get('symbol'),
        takeProfitFactor: parseFloat(formData.get('takeProfitFactor') as string),
        stopLossFactor: parseFloat(formData.get('stopLossFactor') as string),
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

        const json: any = {
            id: "00000000-0000-0000-0000-000000000000",
            name: formData.get('name') as string,
            symbol: formData.get('symbol') as string,
            takeProfitFactor: parseFloat(formData.get('takeProfitFactor') as string),
            stopLossFactor: parseFloat(formData.get('stopLossFactor') as string),
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            strategy: parseInt(formData.get('strategy') as string),
            timeFrame: parseInt(formData.get('timeFrame') as string),
            allowOvernight: true,
            userEmail: session.user.email,
            testStamp: new Date().toISOString()
        }

    
        // console.log('json:', json);

        // //   00000000-0000-0000-0000000000000000000000
        // //   id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",

        // json = {
        //     id: "00000000-0000-0000-0000-000000000000",
        //     name: "string",
        //     symbol: "string",
        //     takeProfitFactor: 0,
        //     stopLossFactor: 0,
        //     startDate: "2024-10-10T06:37:27.722Z",
        //     endDate: "2024-10-10T06:37:27.722Z",
        //     strategy: 0,
        //     timeFrame: 0,
        //     allowOvernight: true,
        //     userEmail: "string",
        //     testStamp: "2024-10-10T06:37:27.722Z"
        //   }

 console.log('json:', json);

        const response = await fetch(`http://localhost:5130/Backtest`, {
            method: 'POST',
            body: JSON.stringify(json),
            headers: {
                'Content-Type': 'application/json',
            },
        });



        const success = await response.json();
        const message = success ? 'BacktestCreated' : 'BacktestCreationFailed';

        const result: any = { message: message, success: success, errors: {} }
        return result;

    }


}