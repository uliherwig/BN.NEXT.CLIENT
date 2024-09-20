"use client";

import { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import { signIn, signOut, useSession } from 'next-auth/react';
import BnButton from '../common/bn-button';
import fetchService, { basicFetch } from '@/app/lib/fetchFunctions';
import test from 'node:test';

const SignInDialog = ({ dict , isOpen, closeDialog }: { dict: Record<string, string> , isOpen: boolean , closeDialog : Function }) => {

    // const [isClient, setIsClient] = useState(false);
    // useEffect(() => {
    //     setIsClient(true);
    // }, []);

    
    
    


    // const [dialogOpen, setDialogOpen] = useState(false);
    const { data: session, status } = useSession()
    const [loading, setLoading] = useState(false);
    const [loginError, setLoginError] = useState('')

    useEffect(() => {
        console.log('session:', session);
        if (session && session.user) {
            console.log('session.user:', session.user?.name);
        }
    }, [session]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;
        const result = await signIn('bnprovider', {
            redirect: false,
            username,
            password,
        });

        console.log('Sign in result:', result);

        if (result?.error) {
            console.error('Error during sign in:', result.error);
            setLoginError('Login failed. Invalid credentials');
        } else {
            console.log('Sign in successful:', result);
            closeDialog(false);
        }
    };

    return (
        <>     
            <Dialog
                open={isOpen}
                onClose={() => closeDialog(false)} >
                <DialogTitle>{dict.AUTH_welcome}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {dict.AUTH_login}
                    </DialogContentText>
                    <form onSubmit={handleSubmit} className='my-2'>
                        <div className='flex flex-col'>
                            <label>Username</label>
                            <input type="text" className='border border-slate-400 w-full p-1' name="username" required onFocus={() => setLoginError('')} />
                            <label>{dict.AUTH_password}</label>
                            <input className='border border-slate-400 w-full p-1'
                                type="password"
                                name="password"
                                required />
                            <BnButton type='submit' label={dict.AUTH_login} />
                        </div>
                    </form>

                    <div className='text-red-800'>
                        {loginError}
                    </div>
                    <div>
                        {dict.AUTH_noaccount} <a href="/auth/account" className='text-blue-500'>{dict.AUTH_register}</a>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default SignInDialog;