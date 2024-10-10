import { basicPost } from "../app/lib/fetchFunctions";
import { signOut } from 'next-auth/react';
import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const IdentityService = {

    baseURL: process.env.IDENTITY_API_URL,

    // async signIn(username: string, password: string) {
    //     // Implementation for sign-in
    //   },

    async signOut(req: NextRequest) {

        try {

            const endpoint = `${process.env.IDENTITY_API_URL}/Account/sign-out`;

            const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
            if (!token) {
                return
            }
            const body = {
                "refreshToken": token.refreshToken,
            }

            var result = await basicPost(endpoint, body);
     
            await signOut();
            
            return result;

        } catch (error) {
            return error;
        }
    },
    // async register(username: string, email: string, password: string) {
    //     // Implementation for registration
    //   },

};