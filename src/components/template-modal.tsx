"use client";

import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CircularLoader from './common/loader';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
    isOpen: boolean;
    closeDialog: Function;
}

const TemplateModal: React.FC<Props> = (params) => {

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (params.isOpen) {
            // get data
        }
        setLoading(false);
    }, [params.isOpen]);

    return (
        <>
            <Dialog
                maxWidth='lg'
                open={params.isOpen}
                onClose={() => params.closeDialog(false)} >
                <DialogTitle>
                    <div className="flex justify-between items-center">
                        <span>HEAD</span>
                        <IconButton onClick={() => params.closeDialog(false)}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent>
                    {loading && (
                        <CircularLoader />
                    )}
                    {!loading && (
                        <div className='flex flex-col h-full w-full'>
                            Content here
                        </div>
                    )}

                </DialogContent>
            </Dialog>
        </>
    );
}

export default TemplateModal;