


import { signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';

export const AuthServices = {

    signOut: async () => {
        try {
            const options = {
                callbackUrl: '/auth/account',
                redirect: false,
            };
            await signOut(options);
        } catch (error) {
            console.error('Error during sign out:', error);
        }
    },

    handleAuthStatus: (status: string) => {
        switch (status) {
            case 'loading':
                // Handle loading state if needed
                break;

            case 'authenticated':
                // Handle authenticated state if needed
                break;

            case 'unauthenticated': 
                redirect('/auth/account?redirect=true');

            default:
                break;
        }
    },


}