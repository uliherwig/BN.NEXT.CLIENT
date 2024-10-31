import * as React from 'react';
import "@/app/globals.css";
import AlpacaAssets from '@/components/alpaca/assets/AlpacaAssets';
import KeySecretsForm from '@/components/alpaca/key-secrets-form';
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/lib/auth";
import { getDictionary } from '@/app/lib/dictionaries/dictionaries';
import { LanguageProps } from '@/models/common/language-props';
import { AlpacaUserSettings } from '@/models/alpaca/alpaca-user-settings';
import { AlpacaUserSettingsService } from '@/service/alpaca/user-settings-service';
import MyAccount from '@/components/alpaca/my-account';


export default async function AlpacaSettingsPage({ params }: LanguageProps) {

    let userSettings: AlpacaUserSettings = {
        email: "",
        alpacaKey: "",
        alpacaSecret: "",
        symbols: ""
    };

    const dict = await getDictionary(params.language)
    const session = await getServerSession(authOptions) 

    if (session !== null) {
        if (session.user) {
            const email = session.user.email ?? "";
            const result : any = await AlpacaUserSettingsService.getAlpacaUserSettings(email);
            if (result.status === 404) {
                userSettings.email = session.user.email ?? "";
         
            } else {
                userSettings = {
                    email: result.email,
                    alpacaKey: result.alpacaKey,
                    alpacaSecret: result.alpacaSecret,
                    symbols: result.symbols
                };
            }          
        }
    }

    return (

        <div className="flex flex-row gap-4 w-full">
            <div className="flex-1 content-container">
                <KeySecretsForm userSettings={userSettings} dict={dict} />
            </div>
            <div className="flex-1 content-container">
                <AlpacaAssets />
            </div>
            <div className="flex-1 content-container">
                <MyAccount />
            </div>
         
        </div>

    );
}