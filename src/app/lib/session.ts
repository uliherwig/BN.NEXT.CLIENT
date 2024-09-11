// if next-auth is not used in the project, you can use the following code to manage sessions in your Next.js app. 
// This code snippet demonstrates how to create, update, and delete sessions in a Next.js app using cookies and JWTs. The code also includes functions to encrypt and decrypt session data using the jose library. 
// The code uses a secret key to encrypt and decrypt the session data

import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { jwtDecode, JwtPayload } from "jwt-decode";


const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: any) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1d')
        .sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        })
        return payload
    } catch (error) {
        console.log('Failed to verify session')
    }
}

export async function createSession(accessToken: string) {

    const decoded: any = jwtDecode(accessToken);


    console.log('createSession:', decoded);
    const userId = decoded.preferred_username

    console.log('createSession:', userId);
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000)
    const session = await encrypt({ userId, expiresAt })

    cookies().set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })
}

export async function updateSession() {
    const session = cookies().get('session')?.value
    const payload = await decrypt(session)

    if (!session || !payload) {
        return null
    }

    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    cookies().set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expires,
        sameSite: 'lax',
        path: '/',
    })
}

// export async function updateSession(request: NextRequest) {
//     const session = request.cookies.get("session")?.value; // Retrieve the session cookie value from the request
//     if (!session) return; // If session is not found, return

//     // Refresh the session expiration time
//     const parsed = await decrypt(session); // Decrypt the session data
//     parsed.expires = new Date(Date.now() + 10 * 1000); // Set a new expiration time (10 seconds from now)
//     const res = NextResponse.next(); // Create a new response
//     res.cookies.set({
//       name: "session",
//       value: await encrypt(parsed), // Encrypt and set the updated session data
//       httpOnly: true,
//       expires: parsed.expires, // Set the expiration time
//     });
//     return res; // Return the response
//   }

export async function getSession() {

    console.log('getSession:');
    const session = cookies().get("session")?.value; // Retrieve the session cookie value
    if (!session) return null; // If session is not found, return null
    return await decrypt(session); // Decrypt and return the session payload
}

export function deleteSession() {
    cookies().delete('session')
}