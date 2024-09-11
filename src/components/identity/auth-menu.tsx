"use client";

import { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import { signIn, signOut, useSession } from 'next-auth/react';
import BnButton from '../common/bn-button';

const AuthMenu = ({ dict }: { dict: Record<string, string> }) => {

    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleClickOutside = (event: any) => {
        if (menuRef.current && !(menuRef.current as HTMLElement).contains(event.target)) {
            setMenuOpen(false);
        }
    };
    useEffect(() => {
        if (typeof window !== "undefined") {
            if (menuOpen) {
                window.addEventListener('mousedown', handleClickOutside);
            } else {
                window.removeEventListener('mousedown', handleClickOutside);
            }
            return () => {
                window.removeEventListener('mousedown', handleClickOutside);
            };
        }
    }, [menuOpen]);


    const [dialogOpen, setDialogOpen] = useState(false);
    const { data: session, status } = useSession()
    const [loading, setLoading] = useState(false);
    const [loginError, setLoginError] = useState('')

    useEffect(() => {
        if (session) {
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
            setDialogOpen(false);
        }
    };

    const handleSignOut = async () => {
        try {
            // Define the endpoint URL
            const endpoint = '/api/identity/signout';

            // Make the POST request
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),
            });

            console.log('Sign out response:', response);

            // Check if the response is successful
            if (!response.ok) {
                throw new Error('Failed to sign out');
            }

            // Handle the response (optional)
            const data = await response.json();
            console.log('Sign out response:', data);

            // Call the signOut function
            await signOut();
        } catch (error) {
            console.error('Error during sign out:', error);
        }
    };



    return (
        <>
            <div className="relative inline-block">
                <IconButton aria-label="language" color="primary" onClick={toggleMenu}>
                    <ManageAccountsRoundedIcon className='text-slate-50' />
                    <span className='text-sm text-slate-50 ml-1'>{session && session.user?.name}</span>
                </IconButton>

                {menuOpen && (
                    <div ref={menuRef} className="absolute left-[-20px] mt-0 w-36 bg-slate-800 border border-gray-200 rounded shadow-lg z-50">
                        {status === 'authenticated' ? (
                            <ul className="flex flex-col p-2">
                                <li className="mb-2 text-slate-200">
                                    Hi {session && session.user?.name}
                                    <div></div>
                                </li>
                                <li className="mb-2">
                                    <a className="text-slate-200 hover:text-white" href="/auth/account">{dict.AUTH_myaccount}</a>
                                </li>
                                <li className="mb-2">
                                    <a className="text-slate-200 hover:text-white" href="#" onClick={() => { handleSignOut() }}>{dict.AUTH_logout}</a>
                                </li>
                            </ul>
                        ) : (
                            <ul className="flex flex-col p-2">
                                <li className="mb-2 text-slate-200">
                                    {dict.AUTH_welcome}
                                    <div></div>
                                </li>
                                <li className="mb-2">
                                    <a className="text-slate-200 hover:text-white" href="/auth/account">{dict.AUTH_register}</a>
                                </li>
                                <li className="mb-2">
                                    <a className="text-slate-200 hover:text-white" href="#" onClick={() => { setDialogOpen(true); setMenuOpen(false) }}>{dict.AUTH_login}</a>
                                </li>
                            </ul>
                        )}
                    </div>
                )}
            </div>

            <Dialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)} >
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
            <Dialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)} >
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

export default AuthMenu;