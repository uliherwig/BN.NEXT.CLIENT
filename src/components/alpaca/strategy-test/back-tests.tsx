"use client";
import { useState } from "react";
import TestPositions from "./test-results";
import StrategySettingsForm from "./strategy-settings-form";
import StrategyList from "./strategy-list";
import { StrategySettings } from "@/models/strategy/strategy-settings";

const Backtests = () => {
    const [backtest, setBacktest] = useState<StrategySettings>({} as StrategySettings);
    const [hasUpdate, setHasUpdate] = useState<boolean>(false);

    const showResult = (e: StrategySettings) => {
        setBacktest(e)
    }
    const updateStrategies = (e: boolean) => {
        setHasUpdate(!hasUpdate);
    }

    return (
        <>
            <div className="flex flex-row gap-4 w-full content-container">
                <div className="flex-1">
                    <StrategySettingsForm updateStrategies={updateStrategies} />
                </div>
                <div className="flex-1">
                    <StrategyList  showResult={showResult} hasUpdate={hasUpdate} showBookmarked={false} />
                </div>
                <div className="flex-1">
                    <TestPositions strategySettings={backtest} />
                </div>
            </div>
        </>
    )
}
export default Backtests;