"use client";
import { useEffect, useState } from 'react';
import { alpacaTradingService } from '@/service/alpacaTradingService';
import Cookies from 'js-cookie';
import { SubmitHandler, useForm } from "react-hook-form"
import { basicFetch } from '@/app/api/fetchFunctions';
import { AccountData } from '@/model/AlpacaAccount';

type FormData = {
    keyId: string
    keySecret: string
}



const AlpacaLogon = () => {

    const [accountData, setAccountData] = useState<AccountData | null>(null);

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>()
    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data);
        Cookies.set('alpaca-key-id', data.keyId);
        Cookies.set('alpaca-key-secret', data.keySecret);
    }


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
                <div className="w-[50%]  border-r border-slate-400">

                    <div className="text-slate-800 text-lg mb-4">Eingabe Alpaca Key und Secret Key</div>

                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
                        <label>Key ID</label>
                        <input defaultValue="" {...register("keyId", { required: true })} className='border border-slate-400 w-[250px] p-1' />
                        {errors.keyId && <span className='text-red-700'>This field is required</span>}
                        <label>Key Secret</label>
                        <input type="password" defaultValue="" {...register("keySecret", { required: true })} className='border border-slate-400 w-[250px] p-1' />
                        {errors.keySecret && <span className='text-red-700'>This field is required</span>}

                        <input type="submit" value="Store Data" className='border border-slate-400 w-[250px] mt-4 bg-slate-600 text-slate-50 p-1 cursor-pointer' />
                    </form>
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

export default AlpacaLogon;