"use client";
import { useState } from "react";
import TestPositions from "./test-results";
import StrategySettingsForm from "./strategy-settings-form";
import { useStrategy } from "@/app/provider/indicator-tests-provider";
import { StrategySettings } from "@/app/models/strategy/strategy-settings";
import { Group, Panel } from "react-resizable-panels";
import IndicatorTestList from "../indicator-test-list";
import { basicFetch } from "@/app/lib/fetchFunctions";
import { firstOrDefault } from "@/app/lib/utilities";
import { StrategyTypeEnum } from "@/app/models/strategy/enums";

const StrategyTest = () => {
    const [backtest, setBacktest] = useState<StrategySettings>({} as StrategySettings); 
    const { collection, updateCollection } = useStrategy();

    const updateStrategies = async () => {
        const strats = await basicFetch<StrategySettings[]>(`/api/strategy/list?strategyType=${StrategyTypeEnum.IndicatorBased}&showBookmarked=${false}`);
        updateCollection({
            items: strats
        });
    };

    const showResult = (e: StrategySettings) => {
        console.log("showResult", e);
        setBacktest(e)
    }

   




    return (
        <Group>
            <Panel defaultSize={33}>
                <StrategySettingsForm updateStrategies={updateStrategies} />
            </Panel>
            <div className="w-px h-full bg-slate-400" />
            <Panel defaultSize={33}>
                <IndicatorTestList strategies={collection.items} updateStrategies={updateStrategies} showResult={showResult} />
            </Panel>
            <div className="w-px h-full bg-slate-400" />
            <Panel defaultSize={33}>
                <TestPositions strategySettings={backtest} />
            </Panel>
        </Group>

    )
}
export default StrategyTest;