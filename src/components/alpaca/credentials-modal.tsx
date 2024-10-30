"use client";

import { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import { signIn, signOut, useSession } from 'next-auth/react';

import { addOrUpdateKeyAndSecret } from '@/app/actions/alpaca';
import { firstOrDefault } from '@/utilities';
import { useFormState } from 'react-dom';
import BNButton from '../common/buttons/bn-button';
import CloseIcon from '@mui/icons-material/Close';
import { basicFetch } from '@/app/lib/fetchFunctions';
import { useDictionary } from '@/provider/dictionary-provider';
import SubmitButton from '@/components/common/buttons/submit-button';
import CancelButton from '../common/buttons/cancel-button';

interface AlpacaCredentialsModalProps {
    isOpen: boolean;
    closeDialog: Function;
    isUpdate: boolean;

}

const AlpacaCredentialsModal: React.FC<AlpacaCredentialsModalProps> = (params) => {

    const dictionary = useDictionary();

    const [alpacaKey, setAlpacaKey] = useState('');
    const [alpacaSecret, setAlpacaSecret] = useState('');
    const [pending, setPending] = useState(false);

    const [state, storeAction] = useFormState<any, FormData>(addOrUpdateKeyAndSecret, { message: '', success: false, errors: {} });


    useEffect(() => {

        console.log('Alpaca MODAL ##################################################################', params.isOpen);
        if (!params.isOpen) {
            return;
        }

        if (params.isOpen && params.isUpdate) {
            loadAlpacaCredentials();
        }

        if (state.success) {
            setPending(false)
            params.closeDialog();
        }
        if (state.errors) {
            setPending(false)
        }
    }, [state, params, params.isOpen, params.isUpdate]);

    const loadAlpacaCredentials = async () => {
        console.log('Alpaca MODAL ##################################################################');
        const res = await basicFetch<any>(`/api/alpaca/get-credentials`);

        console.log('Credentials data:', res);
        if (res.error) {
            console.log('Account data:', res.error);
        } else {


            setAlpacaKey(res.alpacaKey);
            setAlpacaSecret(res.alpacaSecret);
        }
    }
    const handleSubmit = (e: any) => {
        console.log('submitting form', e);
        setPending(e)
    }


    const btnLabel = params.isUpdate ? 'Update Alpaca Credentials' : 'Add Alpaca Credentials';

    if (!dictionary) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Dialog
                open={params.isOpen}
                onClose={() => params.closeDialog()} >
                <DialogTitle>
                    <div className="flex justify-between items-center">
                        <span>Alpaca Zugangsdaten für Testkonto</span>
                        <IconButton onClick={() => params.closeDialog()}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        Die Daten werden nur benötigt wenn man eine Strategie auf einem Alpaca Testkonto ausführen möchte.
                    </DialogContentText>

                    <form action={storeAction} className='flex flex-col gap-2'>
                        <label>Key ID</label>
                        <input type="text" name="keyId" className='border border-slate-400 w-full p-1' value={alpacaKey} onChange={(e) => setAlpacaKey(e.target.value)} />
                        <div className="error-message">{firstOrDefault(state?.errors?.keyId, '')}</div>
                        <label>Key Secret</label>
                        <input type="password" name="keySecret" className='border border-slate-400 w-full p-1' value={alpacaSecret} onChange={(e) => setAlpacaSecret(e.target.value)} />
                        <div className="error-message">{firstOrDefault(state?.errors?.keySecret, '')}</div>
                        <input type="hidden" name="isUpdate" className='border border-slate-400 w-full p-1' value={params.isUpdate.toString()} />
                        <div className="flex justify-between gap-2 mt-4">
                            <CancelButton label={dictionary.COMMON_CANCEL} onCancel={() => params.closeDialog()} />
                            <SubmitButton label={btnLabel} handleFormState={handleSubmit} />
                        </div>


                    </form>

                </DialogContent>
            </Dialog>
        </>
    );
}

export default AlpacaCredentialsModal;