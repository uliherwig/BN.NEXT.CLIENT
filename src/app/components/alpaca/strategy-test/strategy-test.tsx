"use client";
import { useState } from "react";
import TestPositions from "./test-results";
import StrategySettingsForm from "./strategy-settings-form";
import StrategyList from "./strategy-list";
import { StrategySettings } from "@/app/models/strategy/strategy-settings";
import { Group, Panel } from "react-resizable-panels";

const StrategyTest = () => {
    const [backtest, setBacktest] = useState<StrategySettings>({} as StrategySettings);
    const [hasUpdate, setHasUpdate] = useState<boolean>(false);

    const showResult = (e: StrategySettings) => {
        console.log("showResult", e);
        setBacktest(e)
    }
    const updateStrategies = (e: boolean) => {
        console.log("updateStrategies", e);
        setHasUpdate(!hasUpdate);
    }

    return (
        <Group>
            <Panel defaultSize={33}>
                <StrategySettingsForm updateStrategies={updateStrategies}  />
            </Panel>
            <div className="w-px h-full bg-slate-400" />
            <Panel defaultSize={33}>
                <StrategyList showResult={showResult} hasUpdate={hasUpdate} showBookmarked={false} />
            </Panel>
            <div className="w-px h-full bg-slate-400" />
            <Panel defaultSize={33}>
                <TestPositions strategySettings={backtest} />
            </Panel>
        </Group>

    )
}
export default StrategyTest;