"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { useTranslations } from 'next-intl';
import { Button, IconButton, Menu, MenuItem } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';


const LanguageSwitch = () => {

    const [bnLanguage, setLanguage] = useState<string>();
    const t = useTranslations('Header');

    useEffect(() => {
        const storedLanguage = Cookies.get('bn-trading-app-language');
        if (storedLanguage) {
            setLanguage(storedLanguage);
        } else {            
            setLanguage('en');
        }
    }, []);

    const handleLanguageChange = (lang: string) => {
        Cookies.set('bn-trading-app-language', lang);
       window.location.reload();
    };

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            {bnLanguage && (
                <div>
                    <IconButton aria-label="language"  color="primary" onClick={handleClick}>
                        <LanguageIcon className='text-slate-50' /> <span className='text-sm text-slate-50 ml-1'>{bnLanguage.toUpperCase()}</span> 
                    </IconButton>
            
                    <Menu
                    className='mt-5'
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <MenuItem onClick={() => handleLanguageChange('de')}>Deutsch</MenuItem>
                        <MenuItem onClick={() => handleLanguageChange('en')}>English</MenuItem>
                    </Menu>
                </div>
            )}
        </>
    );
}

export default LanguageSwitch;