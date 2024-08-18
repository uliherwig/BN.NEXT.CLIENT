import { useTranslations } from 'next-intl';
import * as React from 'react';
import "@/app/globals.css";
import AlpacaAssets from '@/components/alpaca/assets/AlpacaAssets';
import AlpacaLogon from '@/components/alpaca/AlpacaLogon';


export default function AlpacaSettings() {

    const t = useTranslations('Alpaca');
    return (


        <div className="flex flex-row gap-4 w-full">
            <div className="flex-1 content-container">
                <AlpacaLogon />
            </div>
            <div className="flex-1 content-container">
                <AlpacaAssets />
            </div>
        </div>

    );
}