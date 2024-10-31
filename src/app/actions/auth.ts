'use server'

import { z } from 'zod';

const schemaRegister = z.object({
    username: z.string()
        .min(3)
        .max(10)
        .regex(/^[a-zA-Z]+$/, "Username must contain only alphabetic characters"),
    email: z.string().email(),
    password: z.string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one digit" })
    .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" }),

    firstName: z.string().min(3).regex(/^[a-zA-Z]+$/, "Username must contain only alphabetic characters"),
    lastName: z.string().min(3).regex(/^[a-zA-Z]+$/, "Username must contain only alphabetic characters"),
    passwordReEnter: z.string(),

}).refine(data => data.password === data.passwordReEnter, {
    message: "Passwords must match",
    path: ["passwordReEnter"],
  });


export async function register(prevState: any, formData: FormData) {

 

    const validatedFields = schemaRegister.safeParse({
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        passwordReEnter: formData.get('passwordReEnter')
            
    }) 

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    } else {

        const json = {
            "username": formData.get('username'),
            "password": formData.get('password'),
            "email": formData.get('email'),
            "firstName": formData.get('firstName'),
            "lastName": formData.get('lastName')
        }

        // check form data against the identity API
        const response = await fetch(`${process.env.IDENTITY_API_URL}/Account/sign-up`, {
            method: 'POST',
            body: JSON.stringify(json),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result: any = await response.json();

        if (!result.success && result.errors) {
            const jsonObject = JSON.parse(result.errors);

            if (jsonObject.errorMessage) {
                result.errorMessage = jsonObject.errorMessage;
            }
        }
        return result;
    }
}