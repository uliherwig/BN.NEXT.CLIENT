"use client";
import { useEffect, useState } from 'react';

import BNButton from '@/components/common/buttons/bn-button';
import { useFormState } from "react-dom";
import { addOrUpdateKeyAndSecret } from "@/app/actions/alpaca";
import { AlpacaUserSettings } from '@/models/alpaca/alpaca-user-settings';

const errorMessageClass = 'text-red-500 text-sm';

function firstOrDefault<T>(array: T[], defaultValue: T): T {
    if (!array) {
        return defaultValue;
    }
    return array.length > 0 ? array[0] : defaultValue;
}

interface AlpacaSecretsFormProps {
    userSettings: AlpacaUserSettings;
    dict: Record<string, string>;
}

const KeySecretsForm = (props: AlpacaSecretsFormProps) => {

    const [btnLabel, setBtnLabel] = useState('Store Data');
    const [alpacaKey, setAlpacaKey] = useState(props.userSettings.alpacaKey);
    const [alpacaSecret, setAlpacaSecret] = useState(props.userSettings.alpacaSecret);

    const [state, storeAction] = useFormState<any, FormData>(addOrUpdateKeyAndSecret, { message: '', success: false, errors: {} });

    useEffect(() => {
        console.log('props:', props.userSettings);
        setBtnLabel(props.userSettings.alpacaKey !== '' ? 'Update Data' : 'Store Data');

    }, [props]);

    useEffect(() => {
        console.log('state:', state);
    }, [state]);

    if (props.userSettings.email === '') {
        return <div>Please login</div>;
    }

    return (
        <div className="h-full bg-white p-3 px-5">
            <div className="text-slate-800 text-lg font-bold mb-4">Settings</div>
            <div className="flex flex-row gap-4 w-full">
                <div className="w-full">

                    <div className="text-slate-800 text-lg mb-4">Eingabe Alpaca User Settings</div>
                    {!state.success && (
                        <form action={storeAction} className='flex flex-col gap-2'>
                            <label>Key ID</label>
                            <input type="text" name="keyId" className='border border-slate-400 w-full p-1' value={alpacaKey} onChange={(e) => setAlpacaKey(e.target.value)} />
                            <div className={errorMessageClass}>{firstOrDefault(state?.errors?.keyId, '')}</div>
                            <label>Key Secret</label>
                            <input type="password" name="keySecret" className='border border-slate-400 w-full p-1' value={alpacaSecret} onChange={(e) => setAlpacaSecret(e.target.value)} />
                            <div className={errorMessageClass}>{firstOrDefault(state?.errors?.keySecret, '')}</div>
                            <input type="hidden" name="AddOrUpdate" className='border border-slate-400 w-full p-1' value={(props.userSettings.alpacaKey === '').toString()} />
                            <BNButton type='submit' label={btnLabel} />
                        </form>
                    )}

                    <div className="text-green-500">{state.message}</div>
                </div>        
            </div> 
        </div>
    );
};

export default KeySecretsForm;