'use server'

import { z } from 'zod';

const schemaRegister = z.object({
    keyId: z.string(),
    keySecret: z.string(),

});


export async function storeAlpacaCredentials(prevState: any, formData: FormData) {

    console.log('formData:', formData);

    const validatedFields = schemaRegister.safeParse({
        keyId: formData.get('keyId'),
        keySecret: formData.get('keySecret')            
    }) 

    if (!validatedFields.success) {
        console.log('validatedFields.error.flatten().fieldErrors:', validatedFields.error.flatten().fieldErrors);
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    } else {

        const json = 
        {
            "userId": "4bc49854-1a7a-4154-89c5-848c94c04fad",
            "symbols": "SPY",
            "alpacaKey":  formData.get('keyId'),
            "alpacaSecret": formData.get('keySecret')
          }

        // check form data against the identity API
        const response = await fetch(`${process.env.ALPACA_API_URL}/UserSettings`, {
            method: 'POST',
            body: JSON.stringify(json),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const res = await response.json();

        const result: any  =  { message: '', success: res, errors: {} }

        console.log('result:', result);

        // if (!result.success && result.errors) {
        //     const jsonObject = JSON.parse(result.errors);

        //     if (jsonObject.errorMessage) {
        //         result.errorMessage = jsonObject.errorMessage;
        //     }
        // }
        return result;
    }
}