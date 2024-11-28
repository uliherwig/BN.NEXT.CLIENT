"use client";
import { useState } from "react";
import TestPositions from "./test-results";
import StrategySettingsForm from "./strategy-settings-form";
import StrategyList from "./strategy-list";
import { StrategySettingsModel } from "@/models/strategy/strategy-settings-model";

const Backtests = () => {
    const [backtest, setBacktest] = useState<StrategySettingsModel>({} as StrategySettingsModel);
    const [hasUpdate, setHasUpdate] = useState<boolean>(false);

    const showResult = (e: StrategySettingsModel) => {
        setBacktest(e)
    }
    const updateStrategies = (e: boolean) => {
        console.log('updateStrategies', e);
        setHasUpdate(!hasUpdate);
    }

    return (
        <>
            <div className="flex flex-row gap-4 w-full content-container">
                <div className="flex-1">
                    <StrategySettingsForm updateStrategies={updateStrategies} />
                </div>
                <div className="flex-1">
                    <StrategyList  showResult={showResult} hasUpdate={hasUpdate} />
                </div>
                <div className="flex-1">
                    <TestPositions test={backtest} />
                </div>
            </div>
        </>
    )
}
export default Backtests;