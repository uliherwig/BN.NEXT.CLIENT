import * as React from 'react';
import KeySecretsForm from '@/app/components/alpaca/key-secrets-form';
import { getDictionary } from '@/app/lib/dictionaries/dictionary';
import { LanguageProps } from '@/app/models/common/language-props';
import { AlpacaUserSettings } from '@/app/models/alpaca/alpaca-user-settings';
import MyAccount from '@/app/components/alpaca/my-account';


export default async function AlpacaSettingsPage({ params }: LanguageProps) {

    let userSettings: AlpacaUserSettings = {
        email: "",
        alpacaKey: "",
        alpacaSecret: "",
        symbols: ""
    };

    const dict = getDictionary(params.language)


    return (

        <div className="flex flex-row gap-4 w-full">
            <div className="flex-1 content-container">
                <KeySecretsForm userSettings={userSettings} dict={dict} />
            </div>
       
            <div className="flex-1 content-container">
                <MyAccount />
            </div>
         
        </div>

    );
}