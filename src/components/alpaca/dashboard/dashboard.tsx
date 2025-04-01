"use client";
import { useEffect, useState } from "react";
import { StrategySettings } from "@/models/strategy/strategy-settings";
import AlpacaPositions from "./alpaca-positions";
import StrategyList from "../strategy-test/strategy-list";
import TestResults from "../strategy-test/test-results";
import AlpacaAccount from "./alpaca-account";
import { useSession } from "next-auth/react";
import { AlpacaAccountModel } from "@/models/alpaca/alpaca-account-model";
import  { AuthServices }  from "@/service/auth-service";
import { toast } from "react-toastify";

const Dashboard: React.FC = () => {

    const { data: session, status } = useSession();

    const [strategySettings, setStrategySettings] = useState<StrategySettings>({} as StrategySettings);
    const [alpacaAccount, setAlpacaAccount] = useState<AlpacaAccountModel>({} as AlpacaAccountModel);


    const updateComponents = (e: StrategySettings) => {
        setStrategySettings(e);
    }

    const updateAlpacaAccount = (e: AlpacaAccountModel) => {
        setAlpacaAccount(e);
    }

    useEffect(() => {
        AuthServices.handleAuthStatus(status); // Use the service function
      }, [status]);

    return (
        <>
            <div className="content-container">

                <div className="w-1/3">
                    <StrategyList showResult={updateComponents} hasUpdate={false} showBookmarked={true} />
                </div>
                <div className="w-1/3">
                    <TestResults strategySettings={strategySettings} />
                </div>
                <div className="w-1/3 flex flex-col h-full  gap-0.5">
                    <div className="h-1/3">
                        <AlpacaAccount updateAlpacaAccount={updateAlpacaAccount} />
                    </div>
                    <div className="h-2/3 w-full">

                        <AlpacaPositions alpacaAccountStatus={alpacaAccount.accountStatus} />
                    </div>

                </div>
            </div>
        </>
    )
}
export default Dashboard;


