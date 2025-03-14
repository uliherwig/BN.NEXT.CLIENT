"use client";

import { useEffect, useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import { signOut, useSession } from 'next-auth/react';
import { basicFetch, basicPost } from '@/app/lib/fetchFunctions';
import SignInDialog from './signin-modal';
import { useDictionary } from '@/provider/dictionary-provider';

interface AuthMenuProps {
    language: string;
}
const AuthenticationMenu: React.FC<AuthMenuProps> = (props) => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const menuOpen = Boolean(anchorEl);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const [dialogOpen, setDialogOpen] = useState(false);
    const { data: session, status } = useSession();

    useEffect(() => {
        if (session && session.user) {
            // console.log('session.user:', session.user?.name);
        }
    }, [session]);

    const closeDialog = () => {
        setDialogOpen(false);
    };

    const handleSignOut = async () => {
        try {
            const result = await basicPost('/api/identity/signout', {});

            const options = {
              callbackUrl: '/auth/account',
              redirect: false,
            };
      
           await signOut(options);
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
        };
        //testAuth();
    }, []);

    const dict = useDictionary();
    if (!dict) {
        return <div>Loading...</div>;
    }

    return (

        <div className="relative mr-2 z-100">
            <IconButton aria-label="account" color="primary" onClick={handleMenuOpen}>
                <ManageAccountsRoundedIcon className='text-slate-50' />
                <span className='text-sm text-slate-50 ml-1 min-w-fit'>{session && session.user?.username}</span>
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleMenuClose}
                MenuListProps={{
                    'aria-labelledby': 'account-button',
                }}
                sx={{
                    '& .MuiPaper-root': {
                        backgroundColor: 'rgb(51 65 85)', // Tailwind's bg-slate-700
                        color: 'rgb(226 232 240)', // Tailwind's text-slate-200
                    },
                }} >
                <MenuItem key="myaccount" onClick={handleMenuClose}>
                    <a className="text-slate-200 hover:text-white" href={`/${props.language}/auth/account`}>{dict.AUTH_myaccount}</a>
                </MenuItem>
                {status === 'authenticated' ? [

                    <MenuItem key="logout" onClick={() => { handleSignOut(); handleMenuClose(); }}>
                        {dict.AUTH_logout}
                    </MenuItem>
                ] : [
                    <MenuItem key="register" onClick={handleMenuClose}>
                        <a className="text-slate-200 hover:text-white" href={`/${props.language}/auth/account?register=true`}>{dict.AUTH_register}</a>
                    </MenuItem>,
                    <MenuItem key="login" onClick={() => { setDialogOpen(true); handleMenuClose(); }}>
                        {dict.AUTH_login}
                    </MenuItem>
                ]}
            </Menu>
            <SignInDialog isOpen={dialogOpen} closeDialog={closeDialog} />
        </div>



    );
};

export default AuthenticationMenu;