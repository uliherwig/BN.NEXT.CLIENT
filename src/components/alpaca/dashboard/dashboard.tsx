"use client";
import { useState } from "react";
import { StrategySettingsModel } from "@/models/strategy/strategy-settings-model";
import AlpacaAccount from "./alpaca-account";
import Strategies from "./strategies";
import AlpacaPositions from "./alpaca-positions";
import StrategyExecution from "./strategy-execution";
import StrategyTestResult from "./strategy-test-result";

const Dashboard: React.FC = () => {

    const [testSettings, setTestSettings] = useState<StrategySettingsModel>({} as StrategySettingsModel);

    const updateComponents = (e: StrategySettingsModel) => {
        setTestSettings(e);
    }

    return (
        <>
            <div className="content-container">
                <div className="flex-1 flex flex-col gap-2">
                    <div className="h-[310px]">
                        <AlpacaAccount />
                    </div>
                    <Strategies showResult={updateComponents} />
                </div>
                <div className="flex-1">
                    <StrategyTestResult strat={testSettings} />
                </div>
                <div className="flex-1">
                    <div className="h-[30%] bg-white">
                        <StrategyExecution />
                        <AlpacaPositions />
                    </div>
                </div>
            </div>
        </>
    )
}
export default Dashboard;