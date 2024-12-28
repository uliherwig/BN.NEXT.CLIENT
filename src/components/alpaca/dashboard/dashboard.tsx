"use client";
import { useState } from "react";
import { StrategySettingsModel } from "@/models/strategy/strategy-settings-model";
import AlpacaAccount from "./alpaca-account";
import AlpacaPositions from "./alpaca-positions";
import StrategyExecution from "./strategy-execution";
import StrategyList from "../strategy-test/strategy-list";
import TestResults from "../strategy-test/test-results";

const Dashboard: React.FC = () => {

    const [strategySettings, setStrategySettings] = useState<StrategySettingsModel>({} as StrategySettingsModel);

    const updateComponents = (e: StrategySettingsModel) => {
        setStrategySettings(e);
    }

    return (
        <>
            <div className="content-container">
                <div className="flex-1">               
                    <StrategyList showResult={updateComponents} hasUpdate={false} showBookmarked={true} />
                </div>
                <div className="flex-1">
                    <TestResults strategySettings={strategySettings} />
                </div>
                <div className="flex-1">
                    <div className="h-[30%] bg-white">
                        <AlpacaAccount />
                        <StrategyExecution />
                        <AlpacaPositions />
                    </div>
                </div>
            </div>
        </>
    )
}
export default Dashboard;