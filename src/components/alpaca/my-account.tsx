"use client";
import { useEffect, useState } from 'react';
import { basicFetch } from '@/app/lib/fetchFunctions';
import { AccountData } from '@/models/AlpacaAccount';

const MyAccount = () => {

    const [accountData, setAccountData] = useState<AccountData | null>(null); 

    const testAccount = async () => {  
        const res = await basicFetch<AccountData>(`/api/alpaca/accounts`);
        var accData: AccountData = {
            accountId: res.accountId,
            accountNumber: res.accountNumber,
            accruedFees: res.accruedFees,
            buyingPower: res.buyingPower,
            createdAtUtc: res.createdAtUtc
        };
        setAccountData(accData);
    }

    useEffect(() => {
    }, [accountData]);

    return (
        <div className="h-full bg-white p-3 px-5">
            <div className="text-slate-800 text-lg font-bold mb-4">My Account</div>
            <div className="flex flex-row gap-4 w-full">
  
                <div className="w-full">        

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
        </div>
    );
};

export default MyAccount;