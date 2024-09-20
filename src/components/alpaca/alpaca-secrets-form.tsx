"use client";
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import { basicFetch } from '@/app/lib/fetchFunctions';
import { AccountData } from '@/models/AlpacaAccount';
import BNButton from '@/components/common/bn-button';
import { errors } from 'jose';
import { useFormState, useFormStatus } from "react-dom";
import { storeAlpacaCredentials } from "@/app/actions/alpaca";

const errorMessageClass = 'text-red-500 text-sm';

function firstOrDefault<T>(array: T[], defaultValue: T): T {
    if (!array) {
        return defaultValue;
    }
    return array.length > 0 ? array[0] : defaultValue;
}

const AlpacaSecretsForm = () => {

    const [accountData, setAccountData] = useState<AccountData | null>(null);

    const [state, formAction] = useFormState<any, FormData>(storeAlpacaCredentials, { message: '', success: false, errors: {} });

    useEffect(() => {
        console.log('state:', state);
    }, [state]);

    console.log('state:', state);

    const testAccount = async () => {
        var keyId = Cookies.get('alpaca-key-id');
        var keySecret = Cookies.get('alpaca-key-secret');
        const res = await basicFetch<AccountData>(`/api/alpaca/accounts`);


        var accData: AccountData = {
            accountId: res.accountId,
            accountNumber: res.accountNumber,
            accruedFees: res.accruedFees,
            buyingPower: res.buyingPower,
            createdAtUtc: res.createdAtUtc
        };

        setAccountData(accData);

        console.log(accData);
    }

    useEffect(() => {
    }, [accountData]);


    const selectedAssets: string[] = Cookies.get('asset-selection')?.split(',') || [];

    return (
        <div className="h-full bg-white p-3 px-5">
            <div className="text-slate-800 text-lg font-bold mb-4">Settings</div>
            <div className="flex flex-row gap-4 w-full">
                <div className="w-[50%] pr-5  border-r border-slate-400">

                    <div className="text-slate-800 text-lg mb-4">Eingabe Alpaca Key und Secret Key</div>
                    {state.success && (
                        <form action={formAction} className='flex flex-col gap-2'>
                            <label>Key ID</label>
                            <input type="text" name="keyId" className='border border-slate-400 w-full p-1' />
                            <div className={errorMessageClass}>{firstOrDefault(state?.errors?.keyId, '')}</div>
                            <label>Key Secret</label>
                            <input type="password" name="keySecret" className='border border-slate-400 w-full p-1' />
                            <div className={errorMessageClass}>{firstOrDefault(state?.errors?.keySecret, '')}</div>

                            <BNButton type='submit' label='Store Data' />
                        </form>
                    )}

                </div>
                <div className="w-[50%]  border-r border-slate-400">

                    <div className="text-slate-800 text-lg mb-4">Account</div>

                    {accountData && (
                        <div>
                            <div>Account ID: {accountData.accountId}</div>
                            <div>Account Number: {accountData.accountNumber}</div>
                            <div>Accrued Fees: {accountData.accruedFees}</div>
                            <div>Buying Power: {accountData.buyingPower}</div>
                            <div>Created At: {accountData.createdAtUtc.toString()}</div>
                        </div>
                    )}

                    <input type="button" value="Test Account" className='border border-slate-400 w-[250px] mt-4 bg-slate-600 text-slate-50 p-1 cursor-pointer' onClick={testAccount} />
                </div>
            </div>
            <div className="text-slate-800 text-lg mb-4 mt-4">Liste gewählte Assets</div>

            {selectedAssets.map((asset) => (
                <div key={asset} className="flex justify-between items-center p-2 border-b border-gray-300">
                    <span>{asset}</span>
                    <button className="bg-slate-500 text-white p-1 rounded">Löschen</button>
                </div>
            ))}

        </div>
    );
};

export default AlpacaSecretsForm;