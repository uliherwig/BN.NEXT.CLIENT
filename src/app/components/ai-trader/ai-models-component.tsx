"use client";
import { useEffect, useState } from 'react';
import { useDictionary } from '@/app/provider/dictionary-provider';
import 'react-toastify/dist/ReactToastify.css';
import { Group, Panel } from 'react-resizable-panels';
import AiModelsList from './ai-models-list';
import { AiModel } from '@/app/models/strategy/ai-model';
import AiModelTest from './ai-model-test';



const AiModelsComponent: React.FC = () => {
    const dictionary = useDictionary();

    const [selectedModel, setSelectedModel] = useState<AiModel | null>(null);

    useEffect(() => {

    }, []);

    return (
        <Group>
            <Panel defaultSize={20}>
                <AiModelsList setModel={(model) => { setSelectedModel(model) }} />
            </Panel>
            <div className="w-px h-full bg-slate-400" />
            <Panel defaultSize={40}>
                <AiModelTest model={selectedModel} />
            </Panel>
            <div className="w-px h-full bg-slate-400" />
            <Panel defaultSize={40}></Panel>
        </Group>
    );

}

export default AiModelsComponent;