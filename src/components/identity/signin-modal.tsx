"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { signIn, useSession } from 'next-auth/react';
import BnButton from '../common/buttons/bn-button';
import { useDictionary } from '@/provider/dictionary-provider';

const SignInDialog = ({  isOpen, closeDialog }: { isOpen: boolean , closeDialog : Function }) => { 

    const { data: session, status } = useSession()
    const [loading, setLoading] = useState(false);
    const [loginError, setLoginError] = useState('')


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

        if (result?.error) {
            console.error('Error during sign in:', result.error);
            setLoginError('Login failed. Invalid credentials');
        } else {
            location.reload();
            closeDialog(false);
        }
    };
    const dictionary = useDictionary();
    if (!dictionary) {
        return <div>Loading...</div>;
    }

    return (
        <>     
            <Dialog
                open={isOpen}
                onClose={() => closeDialog(false)} >
                <DialogTitle>{dictionary.AUTH_welcome}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {dictionary.AUTH_login}
                    </DialogContentText>
                    <form onSubmit={handleSubmit} className='my-2'>
                        <div className='flex flex-col'>
                            <label>Username</label>
                            <input type="text" className='border border-slate-400 w-full p-1' name="username" required onFocus={() => setLoginError('')} />
                            <label>{dictionary.AUTH_password}</label>
                            <input className='border border-slate-400 w-full p-1'
                                type="password"
                                name="password"
                                required />
                            <BnButton type='submit' label={dictionary.AUTH_login} />
                        </div>
                    </form>

                    <div className='text-red-800'>
                        {loginError}
                    </div>
                    <div>
                        {dictionary.AUTH_noaccount} <a href="/auth/account?register=true" className='text-blue-500'>{dictionary.AUTH_register}</a>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default SignInDialog;