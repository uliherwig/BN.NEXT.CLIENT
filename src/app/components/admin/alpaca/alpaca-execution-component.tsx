"use client";
import { useEffect, useState } from 'react';
import { useDictionary } from '@/app/provider/dictionary-provider';
import { Group, Panel } from 'react-resizable-panels';
import { StrategySettingsDto } from '@/app/models/strategy/strategy-settings-dto';

import { AlpacaStrategyTracking } from '@/app/models/alpaca/alpaca-strategy-tracking';
import AlpacaModels from './alpaca-models';
import AlpacaExecutor from './alpaca-executor';
import AlpacaStrategies from './alpaca-strategies';
import AlpacaPositions from './alpaca-positions';



const AlpacaExecutionComponent: React.FC = () => {
    const dictionary = useDictionary();

    const [selectedModel, setSelectedModel] = useState<StrategySettingsDto | null>(null);
    const [strategyTrackings, setStrategyTrackings] = useState<AlpacaStrategyTracking[] | null>(null);
    const [selectedStrategy, setSelectedStrategy] = useState<AlpacaStrategyTracking | null>(null);





    useEffect(() => {

    }, []);

    return (

        <Group>
            <Panel defaultSize={20}>

                <div className=" w-full flex flex-col h-full  gap-0.5">
                    <div className="h-25">
                        <div className="component-container"><div className="text-component-head mb-2">AI Model Executor</div></div>
                    </div>
                    <div className="h-1/3">
                        <AlpacaModels setModel={setSelectedModel} setStrategyTrackings={setStrategyTrackings} />
                    </div>
                    <div className="h-2/3 w-full">
                        <AlpacaExecutor selectedModel={selectedModel} strategyTrackings={strategyTrackings} />
                    </div>
                </div>

            </Panel>
            <div className="w-px h-full bg-slate-400" />
            <Panel defaultSize={30}>
                <AlpacaStrategies strategyTrackings={strategyTrackings} setSelectedStrategy={setSelectedStrategy} />
            </Panel>
            <div className="w-px h-full bg-slate-400" />
            <Panel defaultSize={50}>
               <AlpacaPositions selectedStrategy={selectedStrategy} />
            </Panel>
        </Group>

    );

}

export default AlpacaExecutionComponent;