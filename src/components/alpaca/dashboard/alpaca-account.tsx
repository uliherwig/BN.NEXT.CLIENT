"use client";
import { useEffect, useState } from 'react';
import { basicFetch } from '@/app/lib/fetchFunctions';
import { AlpacaAccountModel } from '@/models/alpaca/alpaca-account-model';
import CircularLoader from '../../common/loader';
import { format } from 'date-fns';
import { formatUSD } from '@/utilities';
import AlpacaCredentialsModal from '../credentials-modal';
import WidgetButton from '../../common/buttons/widget-button';
import { useDictionary } from '@/provider/dictionary-provider';

enum AccountStatus {
    None,
    Loading,
    NoCredentials,
    WrongCredentials,
    AccountLoaded
}

const AlpacaAccount = () => {
    const dictionary = useDictionary();
    const [accountData, setAccountData] = useState<AlpacaAccountModel | null>(null);
    const [accountStatus, setAccountStatus] = useState<AccountStatus>(AccountStatus.None);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeDialog = () => {
        setIsModalOpen(false);
        console.log('closeDialog');
        loadAccountData();
    }

    const loadAccountData = async () => {
        setAccountStatus(AccountStatus.Loading);
        const res = await basicFetch<any>(`/api/alpaca/account`);

        console.log('Account data:', res.error);
        if (res.error) {
            if (res.error === 'NoCredentials') {
                setAccountStatus(AccountStatus.NoCredentials);
            } else if (res.error === 'WrongCredentials') {
                setAccountStatus(AccountStatus.WrongCredentials);
            } else {
                setAccountStatus(AccountStatus.None);
            }
        } else {
            var accData: AlpacaAccountModel = {
                userId: res.userId,
                accountStatus: res.accountStatus,
                accountId: res.accountId,
                accountNumber: res.accountNumber,
                accruedFees: res.accruedFees,
                buyingPower: res.buyingPower,
                createdAtUtc: res.createdAtUtc
            };
            setAccountData(accData);
            setAccountStatus(AccountStatus.AccountLoaded);
        }
        console.log('Account Status:', accountStatus);
    }

    useEffect(() => {
        loadAccountData();
    }, []);

    if (!dictionary) {
        return <div>{"Loading..."}</div>;
    }

    return (
        <>
            <div className="component-container">
                <div className="component-head">{dictionary.DASH_ALPACA_TEST_ACCOUNT}</div>
                <div className="w-full h-[68%] ">
                    {accountStatus === AccountStatus.Loading && (
                        <CircularLoader />
                    )}

                    {accountStatus === AccountStatus.NoCredentials && (
                        <table className='w-full'>
                            <tbody>
                                <tr>
                                    <td colSpan={2} className='pb-4'>
                                        {dictionary.DASH_NO_CREDENTIALS_MESSAGE}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                    {accountStatus === AccountStatus.WrongCredentials && (
                        <table className='w-full'>
                            <tbody>
                                <tr>
                                    <td colSpan={2} className='pb-4'>
                                        {dictionary.DASH_WRONG_CREDENTIALS_MESSAGE}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    )}

                    {accountStatus === AccountStatus.AccountLoaded && accountData && (
                        <table className='w-full'>
                            <tbody>
                                <tr>
                                    <td>{dictionary.DASH_ACCOUNT_ID}</td>
                                    <td>{accountData.accountId}</td>
                                </tr>
                                <tr>
                                    <td>{dictionary.DASH_ACCOUNT_NUMBER}</td>
                                    <td>{accountData.accountNumber}</td>
                                </tr>
                                <tr>
                                    <td>{dictionary.DASH_ACCRUED_FEES}</td>
                                    <td>{accountData.accruedFees}</td>
                                </tr>
                                <tr>
                                    <td>{dictionary.DASH_BUYING_POWER}</td>
                                    <td>{formatUSD.format(accountData.buyingPower)}</td>
                                </tr>
                                <tr>
                                    <td>{dictionary.DASH_CREATED_AT}</td>
                                    <td>{format(new Date(accountData.createdAtUtc), 'yyyy-MM-dd')}</td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                </div>
                <div className="float-right">
                    <WidgetButton type='button' label={dictionary.DASH_STORE_ALPACA_CREDENTIALS} method={() => setIsModalOpen(true)} />
                </div>
            </div>
            <AlpacaCredentialsModal isOpen={isModalOpen} closeDialog={closeDialog} isUpdate={(accountStatus === AccountStatus.WrongCredentials || accountStatus === AccountStatus.AccountLoaded)} />
        </>
    );
};

export default AlpacaAccount;