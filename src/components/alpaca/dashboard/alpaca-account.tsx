"use client";
import { useEffect, useState } from 'react';
import { basicFetch } from '@/app/lib/fetchFunctions';
import { AlpacaAccountModel } from '@/models/alpaca/alpaca-account-model';
import CircularLoader from '../../common/loader';
import { format, set } from 'date-fns';
import { formatUSD } from '@/utilities';
import AlpacaCredentialsModal from '../alpaca-credentials-modal';
import WidgetButton from '../../common/buttons/widget-button';
import { useDictionary } from '@/provider/dictionary-provider';

enum AccountStatus {
    None,
    NoCredentials,
    WrongCredentials,
    AccountLoaded
}

interface AlpacaAccountProps {
    updateAlpacaAccount: Function;
}

const AlpacaAccount : React.FC<AlpacaAccountProps> = ({ updateAlpacaAccount }) => {

    const dictionary = useDictionary();
    
    const [accountData, setAccountData] = useState<AlpacaAccountModel | null>(null);
    const [accountStatus, setAccountStatus] = useState<AccountStatus>(AccountStatus.None);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [buttonLabel, setButtonLabel] = useState('Strore Alpaca Credentials');

    const closeDialog = async () => {
        setIsModalOpen(false);
        await loadAccountData();
    }

    const loadAccountData = async () => {

        const account = await basicFetch<AlpacaAccountModel>(`/api/alpaca/account`);   
        switch (account.accountStatus) {
            case 0:
            case 1:
                setAccountStatus(AccountStatus.None);
                break;
            case 2:
                setAccountStatus(AccountStatus.NoCredentials);
                break;
            case 3:
                setAccountStatus(AccountStatus.WrongCredentials);
                break;
            case 4:
                setAccountStatus(AccountStatus.AccountLoaded);
                setAccountData(account);
                updateAlpacaAccount(account);
                break;
            default:
                break;
        }
        setLoading(false);
        return;
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
                    {loading ? (
                        <div className="p-10"><CircularLoader /></div>
                    ) : (
                        <>

                            {(accountStatus === AccountStatus.NoCredentials || accountStatus === AccountStatus.None) && (
                                <div className='w-full pb-4'>
                                    {dictionary.DASH_NO_CREDENTIALS_MESSAGE}
                                </div>
                            )}

                            {accountStatus === AccountStatus.WrongCredentials && (
                                <div className='w-full pb-4'>
                                    {dictionary.DASH_WRONG_CREDENTIALS_MESSAGE}
                                </div>
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
                        </>
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