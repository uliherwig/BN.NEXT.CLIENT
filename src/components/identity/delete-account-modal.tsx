"use client";

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import { basicPost } from '@/app/lib/fetchFunctions';
import { useDictionary } from '@/provider/dictionary-provider';
import CancelButton from '../common/buttons/cancel-button';
import SubmitButton from '../common/buttons/submit-button';
import { useFormState } from 'react-dom';
import { deleteAccount } from "@/app/actions/auth";

const DeleteAccountModal = ({ isOpen, closeDialog }: { isOpen: boolean, closeDialog: Function }) => {

    const { data: session, status } = useSession()
    const [loading, setLoading] = useState(false);
    const [loginError, setLoginError] = useState('')


    const [state, deleteAction] = useFormState<any, FormData>(deleteAccount, { message: '', success: false, errors: {} });
    const [pending, setPending] = useState<boolean>(false);


    useEffect(() => {
        if (!isOpen) {
            return;
        }
        const signOutUser = async () => {
            const result = await basicPost('/api/identity', {});

            const options = {
                callbackUrl: '/auth/account',
                redirect: false,
            };
            await signOut(options);
        }

        if (state.success) {
            setPending(false)
            signOutUser();
           // closeDialog();
        }
        if (state.errors) {
            setPending(false)
            setLoginError(state.errors.message);
        }


    }, [state, isOpen]);

    const handleSubmit = (e: boolean) => {
        setPending(e);
    }

    const dictionary = useDictionary();
    if (!dictionary) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Dialog
                open={isOpen}
                onClose={() => closeDialog(false)} >
                <DialogTitle>Konto löschen</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Wollen Sie Ihr Konto wirklich löschen?
                    </DialogContentText>
                    <form action={deleteAction} className='my-2'>
                        Alle Daten und Informationen werden gelöscht. Dieser Vorgang kann nicht rückgängig gemacht werden.
                        <div className="flex justify-between gap-2 mt-4">
                            <CancelButton label={dictionary.COMMON_CANCEL} onCancel={() => closeDialog()} />
                            <SubmitButton label="Konto jetzt löschen." handleFormState={handleSubmit} />
                        </div>
                    </form>

                    <div className='text-red-800'>
                        {loginError}
                    </div>

                </DialogContent>
            </Dialog>
        </>
    );
}

export default DeleteAccountModal;