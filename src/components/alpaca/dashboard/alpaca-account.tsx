"use client";
import { useEffect, useState } from 'react';
import { basicFetch } from '@/app/lib/fetchFunctions';
import { AccountData } from '@/models/AlpacaAccount';
import CircularLoader from '../../common/loader';
import { format } from 'date-fns';
import { formatUSD } from '@/utilities';
import AlpacaCredentialsModal from '../credentials-modal';
import WidgetButton from '../../common/buttons/widget-button';


enum AccountStatus {
    None,
    Loading,
    NoCredentials,
    WrongCredentials,
    AccountLoaded

}

const AlpacaAccount = () => {

    const [accountData, setAccountData] = useState<AccountData | null>(null);
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
            }
            else if (res.error === 'WrongCredentials') {
                setAccountStatus(AccountStatus.WrongCredentials);
            }
            else {
                setAccountStatus(AccountStatus.None);
            }

        } else {

            var accData: AccountData = {
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

    return (
        <>
            <div className="component-container">
                <div className="component-head">Alpaca Test Account</div>
                <div className="w-full h-[68%] ">
                    {accountStatus === AccountStatus.Loading && (
                        <CircularLoader />
                    )}


                    {accountStatus === AccountStatus.NoCredentials && (

                        <table className='w-full'>
                            <tbody>
                                <tr>
                                    <td colSpan={2} className='pb-4'>
                                        Tragen Sie Ihre Alpaca Credentials für den Test Account ein.
                                        Sie können dann Ihre Strategien direkt auf Ihrem Test Account ausführen lassen.
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
                                        Ihre hinterlegten Alpaca Credentials sind nicht korrekt.
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    )}

                    {accountStatus === AccountStatus.AccountLoaded && accountData && (

                        <table className='w-full'>
                            <tbody>
                                <tr>
                                    <td>Account ID</td>
                                    <td>{accountData.accountId}</td>
                                </tr>
                                <tr>
                                    <td>Account Number</td>
                                    <td>{accountData.accountNumber}</td>
                                </tr>
                                <tr>
                                    <td>Accrued Fees</td>
                                    <td>{accountData.accruedFees}</td>
                                </tr>
                                <tr>
                                    <td>Buying Power</td>
                                    <td>{formatUSD.format(accountData.buyingPower)}</td>
                                </tr>
                                <tr>
                                    <td>Created At</td>
                                    <td>{format(new Date(accountData.createdAtUtc), 'yyyy-MM-dd')}</td>
                                </tr>

                            </tbody>
                        </table>
                    )}

                </div>
                <div className="float-right">

                    <WidgetButton type='button' label='Store Alpaca Credentials' method={() => setIsModalOpen(true)} />
                </div>
            </div>
            <AlpacaCredentialsModal isOpen={isModalOpen} closeDialog={closeDialog} isUpdate={(accountStatus === AccountStatus.WrongCredentials || accountStatus === AccountStatus.AccountLoaded)} />
        </>
    );
};

export default AlpacaAccount;