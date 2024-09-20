import * as React from 'react';
import "@/app/globals.css";
import AlpacaAssets from '@/components/alpaca/assets/AlpacaAssets';
import AlpacaSecretsForm from '@/components/alpaca/alpaca-secrets-form';


export default function AlpacaSettings() {

    return (

        <div className="flex flex-row gap-4 w-full">
            <div className="flex-1 content-container">
                <AlpacaSecretsForm />
            </div>
            <div className="flex-1 content-container">
                <AlpacaAssets />
            </div>
        </div>

    );
}