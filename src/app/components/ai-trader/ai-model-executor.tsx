"use client";
import { useEffect, useState } from 'react';
import { useDictionary } from '@/app/provider/dictionary-provider';
import CircularLoader from "@/app/components/common/loader";
import { basicFetch } from '@/app/lib/fetchFunctions';
import { firstOrDefault } from '@/app/lib/utilities';
import { TimeFrameEnum, StrategyTypeEnum } from '@/app/models/strategy/enums';
import { StrategySettingsDto } from '@/app/models/strategy/strategy-settings-dto';
import WidgetButton from '../common/buttons/widget-button';
import { exec } from 'child_process';
import CheckboxSlate from '../common/checkbox/checkbox-slate';

interface AiModelExecutorProps {
    selectedModel: StrategySettingsDto | null;
}

const AiModelExecutor: React.FC<AiModelExecutorProps> = ({ selectedModel }) => {
    // TODO get execution status from server


    const dictionary = useDictionary();

    const [loading, setLoading] = useState<boolean>(true);
    const [settings, setSettings] = useState<StrategySettingsDto | null>(null);
    const [executionRuns, setExecutionRuns] = useState<boolean>(false);



    const startAlpacaExecution = async () => {
        if (executionRuns) return;
        setLoading(true);


        setExecutionRuns(true);



        const res = await fetch(`/api/ai`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(settings)
        });

        // status 409 indicates conflict, e.g., execution already running
        if (res.status === 409) {
            console.log('AlpacaExec   ', { error: 'Execution already running' }, { status: 409 });
            setExecutionRuns(true);
        }   

        if (res.ok && res.status == 200) {
            const data = await res.json();
            console.log('AlpacaExec   ', data);
            setExecutionRuns(true);
        } else {
            console.log('AlpacaExec   ', { error: 'Server Error' }, { status: 500 });
        }
        setLoading(false);
    }

    const stopAlpacaExecution = async () => {
        setLoading(true);

        const res = await fetch(`/api/ai`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(settings)
        });

        console.log('Stopping Alpaca execution with settings: response:', res);

        if (res.ok) {
            setExecutionRuns(false);
        } else {
            console.log('AlpacaExec   ', { error: 'Server Error' }, { status: 500 });
        }
        setLoading(false);

    }

    const setTestExecution = (checked: boolean) => {
        console.log('Test Execution set to:', checked);

        const strategyType = checked ? StrategyTypeEnum.LocalTest : StrategyTypeEnum.PaperTrading;
        setSettings(prev => prev ? { ...prev, strategyType } : null);
    }


    useEffect(() => {

        setSettings(selectedModel);

    }, [selectedModel]);


    useEffect(() => {

        console.log('Settings changed:', settings);

    }, [settings]);


    useEffect(() => {

        setLoading(false);

    }, []);


    if (!dictionary) {
        return <div>Loading...</div>;
    }
    return (
        <div className="component-container">
            <div className="text-component-head mb-2">AI Model Executor</div>

            {selectedModel == null && (
                <>
                    <div>No model selected</div>
                    <div className="text-component-subhead mb-4">Please select a model to execute.</div>
                </>
            )}
            {selectedModel != null && (
                <div className="text-component-subhead mb-4">Selected Model: {selectedModel?.name} | Asset: {selectedModel?.asset}</div>
            )}
            <div className="mb-4">
                <CheckboxSlate name="testExecution" label="Enable Test Execution" onChangeFct={setTestExecution} />
            </div>

            <div className="h-[95%] w-full overflow-hidden">
                {loading && (
                    <CircularLoader />
                )}
                {!loading && (
                    <div className="h-full overflow-auto">

                        {executionRuns && <div>
                            <p className="mb-2">Execution is currently running...</p>
                            <WidgetButton type='button' label='Stop Alpaca Execution' method={stopAlpacaExecution} disabled={settings == null || !executionRuns} />

                        </div>}

                        {!executionRuns && <div>
                            <p className="mb-2">Execution is not running.</p>
                            <WidgetButton type='button' label='Start Alpaca Execution' method={startAlpacaExecution} disabled={settings == null || executionRuns} />
                        </div>}





                    </div>

                )}
            </div>
        </div>
    );

}

export default AiModelExecutor;