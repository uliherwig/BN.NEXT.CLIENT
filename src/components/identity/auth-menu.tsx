"use client";

import { useEffect, useRef, useState } from 'react';
import { IconButton } from '@mui/material';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import { signIn, signOut, useSession } from 'next-auth/react';
import BnButton from '../common/bn-button';
import { basicFetch } from '@/app/lib/fetchFunctions';
import SignInDialog from './signin-dialog';
import { fetchService } from '@/service/fetch-service';

const AuthenticationMenu = ({ dict }: { dict: Record<string, string> }) => {

    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

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

    useEffect(() => {
        console.log('session:', session);
        if (session && session.user) {
            console.log('session.user:', session.user?.name);
        }
    }, [session]);

    const closeDialog = () => {
        setDialogOpen(false);
    };

    const handleSignOut = async () => {
        try {

          const result =   await fetchService.nextJsPost('/api/identity/signout', {});     
          console.log('Sign out result:', result);    
            await signOut();
        } catch (error) {
            console.error('Error during sign out:', error);
        }
    };

    useEffect(() => {
        const testAuth = async () => {
            const res = await basicFetch<any>(`/api/identity`);
            if (res.error && res.error === 'RefreshAccessTokenError') {
                await signOut();
            }
        }
        testAuth();
    }, []);

    return (
        <>
            <div className="relative inline-block mr-2">
                <IconButton aria-label="language" color="primary" onClick={toggleMenu}>
                    <ManageAccountsRoundedIcon className='text-slate-50' />
                    <span className='text-sm text-slate-50 ml-1 min-w-fit'>{session && session.user?.name}</span>
                </IconButton>

                {isClient && menuOpen && (
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

            <SignInDialog dict={dict} isOpen={dialogOpen} closeDialog={closeDialog} /> 
        </>
    );
}

export default AuthenticationMenu;