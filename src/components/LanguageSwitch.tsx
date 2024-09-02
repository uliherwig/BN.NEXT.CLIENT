"use client";

import { useEffect, useState } from 'react';
import { Button, IconButton, Menu, MenuItem } from '@mui/material';
import Link from 'next/link';
import LanguageIcon from '@mui/icons-material/Language';
import { getURL } from 'next/dist/shared/lib/utils';
import { cookies } from 'next/headers'


const LanguageSwitch = () => {

    const [currentUrl, setCurrentUrl] = useState('');

    useEffect(() => {
        setCurrentUrl(getURL());
    }, []);


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

            <div>
                <IconButton aria-label="language" color="primary" onClick={handleClick}>
                    <LanguageIcon className='text-slate-50' /> <span className='text-sm text-slate-50 ml-1'>{currentUrl.substring(1,3)}</span>
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
                    <MenuItem className='w-[100px]'>
                        <Link href={currentUrl.replace("en", "de")} className="grid grid-cols-[20px_auto] items-center gap-2" title="Deutsch"
                        >
                            Deutsch
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link href={currentUrl.replace("de", "en")} className="grid grid-cols-[20px_auto] items-center gap-2" title="English">
                            English
                        </Link>
                    </MenuItem>
                </Menu>
            </div>

        </>
    );
}

export default LanguageSwitch;