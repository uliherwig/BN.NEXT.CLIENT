"use client";
import { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import Link from 'next/link';
import LanguageIcon from '@mui/icons-material/Language';
import { getURL } from 'next/dist/shared/lib/utils';

interface LanguageSwitchProps {
    language: string;
}

const LanguageSwitch: React.FC<LanguageSwitchProps> = (props) => {  

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div>
            <IconButton aria-label="language" color="primary" onClick={handleClick}>
                <LanguageIcon className='text-slate-50' /> <span className='text-sm text-slate-50 ml-1'>{props.language}</span>
            </IconButton>

            <Menu
                className='mt-5'
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
                sx={{
                    '& .MuiPaper-root': {
                        backgroundColor: 'rgb(51 65 85)', // Tailwind's bg-slate-700
                        color: 'rgb(226 232 240)', // Tailwind's text-slate-200
                    },
                }}>
                <MenuItem id='de' className='w-[100px]' >
                    <Link href={getURL().replace("en", "de")} className="grid grid-cols-[20px_auto] items-center gap-2" title="Deutsch" >
                        Deutsch
                    </Link>
                </MenuItem>
                <MenuItem id='en'>
                    <Link href={getURL().replace("de", "en")} className="grid grid-cols-[20px_auto] items-center gap-2" title="English">
                        English
                    </Link>
                </MenuItem>
            </Menu>
        </div>
    );
}

export default LanguageSwitch;