"use client";

import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CircularLoader from '@/components/common/loader';
import CloseIcon from '@mui/icons-material/Close';
import { useDictionary } from '@/provider/dictionary-provider';
import WidgetButton from '@/components/common/buttons/widget-button';
import CancelButton from '@/components/common/buttons/cancel-button';

interface Props {
    isOpen: boolean;
    closeDialog: Function;
}

const OptimizerModal: React.FC<Props> = (params) => {

    const [loading, setLoading] = useState(true);
    const dictionary = useDictionary();

    useEffect(() => {

        console.log('OptimizerModal useEffect', params.isOpen);
        if (params.isOpen) {
            // get data
        }
        setLoading(false);
    }, [params.isOpen]);

    const optimize = () => {
        setLoading(true);
        // Perform optimization logic here
        // Simulate a delay for the optimization process
        setTimeout(() => {
            setLoading(false);
            params.closeDialog(true); // Close the dialog after optimization
        }, 2000); // Adjust the delay as needed

    }

    if (!dictionary) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Dialog
                maxWidth='sm'
                fullWidth={true}
                open={params.isOpen}
                onClose={() => params.closeDialog(false)} >
                <DialogTitle>
                    <div className="flex justify-between items-center">
                        <span>Optimiere Parameter</span>
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
                        <div className='flex flex-col h-full w-full gap-2'>
                            Starten Sie die automatische Optimierung der Parameter für Ihre Strategie.
                            <p className='text-sm text-gray-500'>
                                Die Optimierung kann einige Zeit in Anspruch nehmen, abhängig von der Komplexität der Strategie und der Anzahl der zu testenden Parameter. 
                                Sobald die Optimierung abgeschlossen ist, werden die besten Parameterwerte angezeigt.
                            </p>

                            <div className="grid grid-cols-2 gap-2 mt-4">
                                <CancelButton label={dictionary.COMMON_CANCEL} onCancel={() => params.closeDialog()} />
                                <WidgetButton label="Run Optimization" type="button" method={optimize} />
                            </div>
                        </div>
                    )}

                </DialogContent>
            </Dialog>
        </>
    );
}

export default OptimizerModal;