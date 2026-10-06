"use client";
import { useEffect, useState } from 'react';
import { useDictionary } from '@/app/provider/dictionary-provider';
import { Group, Panel } from 'react-resizable-panels';
import AiModelsList from './ai-models-list';
import { StrategySettingsDto } from '@/app/models/strategy/strategy-settings-dto';
import AiModelTest from './ai-model-test';
import AiModelExecutor from './ai-model-executor';



const AiExecutionComponent: React.FC = () => {
    const dictionary = useDictionary();

    const [selectedModel, setSelectedModel] = useState<StrategySettingsDto | null>(null);

    useEffect(() => {

    }, []);

    return (
       
        <Group>
            <Panel defaultSize={30}>
                <AiModelsList setModel={(model) => { setSelectedModel(model) }} />
            </Panel>
            <div className="w-px h-full bg-slate-400" />
            <Panel defaultSize={40}>
                <AiModelExecutor selectedModel={selectedModel} />
            </Panel>
            <div className="w-px h-full bg-slate-400" />
            <Panel defaultSize={30}>123</Panel>
        </Group>
      
    );

}

export default AiExecutionComponent;