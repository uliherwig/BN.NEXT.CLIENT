"use client";
import { useEffect, useMemo, useState } from 'react';
import { useDictionary } from '@/app/provider/dictionary-provider';
import CircularLoader from "@/app/components/common/loader";
import CheckboxSlate from '../../common/checkbox/checkbox-slate';
import WidgetButton from '../../common/buttons/widget-button';
import { AlpacaTradeModel } from '@/app/models/alpaca/alpaca-trade-model';
import { basicFetch, fetcher } from '@/app/lib/fetchFunctions';
import useSWR from 'swr';
import { createOrder } from '@/app/actions/alpaca';
import { FormConfig } from '@/app/models/forms/standard';
import IndicatorConfForm from '../../forms/indicator-conf-form';
import { CreateOrderForm } from '@/app/lib/form-configs/create-order-form';
import CommonConfForm from '../../forms/common-conf-form';


interface AlpacaCreateOrderProps {
    assetOptions: any[]
}

const AlpacaCreateOrder: React.FC<AlpacaCreateOrderProps> = ({ assetOptions }) => {
    const dictionary = useDictionary();

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(false);
    }, []);


    if (!dictionary) {
        return <div>Loading...</div>;
    }
    return (
        <div className="component-container" >
            <div className="text-component-head mb-2" >Create Alpaca Order </div>
            < div className="h-[95%] w-full overflow-hidden" >
                {loading && (
                    <CircularLoader />
                )}
                {
                    !loading && (
                        <div className="h-full overflow-auto" >
        
                            <div className="mt-4">
                                <CommonConfForm config={CreateOrderForm} action={createOrder} />
                            </div>
                        </div>
                    )}
            </div>
        </div >
    );

}

export default AlpacaCreateOrder;
