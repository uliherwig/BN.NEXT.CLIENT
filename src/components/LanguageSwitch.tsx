"use client";
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { HomeIcon, InformationCircleIcon, RectangleGroupIcon, ChartBarIcon, ChevronDoubleRightIcon, ChevronDoubleLeftIcon } from '@heroicons/react/20/solid';
import { useTranslations } from 'next-intl';
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
} from "@material-tailwind/react";

const LanguageSwitch = () => {

    const [bnLanguage, setLanguage] = useState('en');
    const t = useTranslations('Header');

    useEffect(() => {
        const storedLanguage = localStorage.getItem('bn-trading-app-language');
        if (storedLanguage) {
            setLanguage(storedLanguage);
        }
    }, []);

    const handleLanguageChange = (lang: string) => {
        setLanguage(lang);
        Cookies.set('bn-trading-app-language', lang, { expires: 365 });
        window.location.reload();
    };
    return (
        <Menu>
            <MenuHandler>
                <Button className='bg-gray-500 p-2'>{t('language')}</Button>
            </MenuHandler>
            <MenuList>
                <MenuItem onClick={() => handleLanguageChange('en')}>English</MenuItem>
                <MenuItem onClick={() => handleLanguageChange('de')}>Deutsch</MenuItem>
            </MenuList>
        </Menu>
    );
}

export default LanguageSwitch;