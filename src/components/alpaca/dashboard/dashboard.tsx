"use client";
import { useState } from "react";
import { StrategySettings } from "@/models/strategy/strategy-settings";
import AlpacaPositions from "./alpaca-positions";
import StrategyExecution from "./strategy-execution";
import StrategyList from "../strategy-test/strategy-list";
import TestResults from "../strategy-test/test-results";
import AlpacaAccount from "./alpaca-account";

const Dashboard: React.FC = () => {

    const [strategySettings, setStrategySettings] = useState<StrategySettings>({} as StrategySettings);

    const updateComponents = (e: StrategySettings) => {
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