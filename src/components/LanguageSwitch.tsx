"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { useTranslations } from 'next-intl';
import { Button, Menu, MenuItem } from '@mui/material';


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
                    <Button
                        id="demo-positioned-button"
                        aria-controls={open ? 'demo-positioned-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <Image
                            src={`/assets/${bnLanguage}.png`}
                            alt={t('language')}
                            width={20}
                            height={20}
                        />
                    </Button>
                    <Menu
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

                // <Menu>
                //     <MenuHandler>
                //         <Image
                //             src={`/assets/${bnLanguage}.png`}
                //             alt={t('language')}
                //             width={20}
                //             height={20}
                //         />

                //     </MenuHandler>
                //     <MenuList>
                //         <MenuItem onClick={() => handleLanguageChange('de')}>Deutsch</MenuItem>
                //         <MenuItem onClick={() => handleLanguageChange('en')}>English</MenuItem>

                //     </MenuList>
                // </Menu>
            )}
        </>
    );
}

export default LanguageSwitch;