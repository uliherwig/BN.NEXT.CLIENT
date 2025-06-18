"use client";
import { use, useEffect, useState } from 'react';
import { AlpacaAccountModel } from '@/models/alpaca/alpaca-account-model';
import CircularLoader from '../../common/loader';
import { format } from 'date-fns';
import { formatUSD } from '@/utilities';
import AlpacaCredentialsModal from '../alpaca-credentials-modal';
import WidgetButton from '../../common/buttons/widget-button';
import { AccountStatusEnum } from '@/models/alpaca/enums';
import { useDictionary } from '@/provider/dictionary-provider';

interface AlpacaAccountDetailsProps {
    alpacaAccount: AlpacaAccountModel;
}

const AlpacaAccountDetails: React.FC<AlpacaAccountDetailsProps> = ({ alpacaAccount }) => {

    const dictionary = useDictionary();
    const [isLoading, setIsLoading] = useState(true);



    useEffect(() => {
 
            setIsLoading(false);
      
    }, [alpacaAccount]);

    if (!dictionary) {
        return <div>Loading...</div>;
    }

    return (
        <>
           
                <div className="component-head">Alpaca Test Account</div>
                <div className="w-full pb-4">
                    {isLoading && (

                        <CircularLoader />
                    )}
                    {!isLoading && (
                        <>
                            {alpacaAccount?.accountStatus === AccountStatusEnum.NoCredentials && (

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
                            {alpacaAccount?.accountStatus === AccountStatusEnum.WrongCredentials && (

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

                            {alpacaAccount?.accountStatus === AccountStatusEnum.AccountLoaded && (

                                <table className='w-full mb-2'>
                                    <tbody>
                                        <tr>
                                            <td>Account ID</td>
                                            <td>{alpacaAccount?.accountId}</td>
                                        </tr>
                                        <tr>
                                            <td>Account Number</td>
                                            <td>{alpacaAccount?.accountNumber}</td>
                                        </tr>
                                        <tr>
                                            <td>Accrued Fees</td>
                                            <td>{alpacaAccount?.accruedFees}</td>
                                        </tr>
                                        <tr>
                                            <td>Buying Power</td>
                                            <td>{formatUSD.format(alpacaAccount?.buyingPower)}</td>
                                        </tr>
                                        <tr>
                                            <td>Created At</td>
                                            <td>{format(new Date(alpacaAccount?.createdAtUtc), 'yyyy-MM-dd')}</td>
                                        </tr>

                                    </tbody>
                                </table>
                            )}

                        </>)}

                </div>


        </>
    );
};

export default AlpacaAccountDetails;