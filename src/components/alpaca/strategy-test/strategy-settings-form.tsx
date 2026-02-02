"use client";
import { runStrategy } from "@/app/actions/alpaca";
import { useFormState } from "react-dom";
import { firstOrDefault } from "@/utilities";
import React, { useEffect, useState } from "react";
import SubmitButton from "@/components/common/buttons/submit-button";
import { format } from 'date-fns';
import { BreakoutPeriodEnum, IndicatorEnum, StopLossTypeEnum, StrategyActionEnum } from "@/models/strategy/enums";
import { useDictionary } from "@/provider/dictionary-provider";
import WidgetButton from "@/components/common/buttons/widget-button";
import CheckboxSlate from "@/components/common/checkbox/checkbox-slate";
import { basicFetch } from "@/app/lib/fetchFunctions";
import { AlpacaAssetModel } from "@/models/alpaca/alpaca-asset-model";
import CircularLoader from "@/components/common/loader";
import StrategySettingsFormBreakout from "./strategy-settings-form-breakout";
import StrategySettingsFormSMA from "./strategy-settings-form-sma";
import OptimizerModal from "./optimizer-modal";
import signalRService from '@/service/signalr-service';
import { NotificationEnum, NotificationMessage } from '@/models/common/notification-message';

enum StrategySettingsFormState {
    None,
    Loading,
    Idle,
    Success,
    Error
}

interface StrategySettingsFormProps {
    updateStrategies: any;
}

const StrategySettingsForm: React.FC<StrategySettingsFormProps> = ({ updateStrategies }) => {
    const dictionary = useDictionary();
    const [formState, setFormState] = useState<StrategySettingsFormState>(StrategySettingsFormState.None);
    const [assets, setAssets] = useState<AlpacaAssetModel[]>([]);

    const [state, storeAction] = useFormState<any, FormData>(runStrategy, { message: '', success: false, errors: {} });
    const [pending, setPending] = useState<boolean>(false);
    const [isTestRunning, setIsTestRunning] = useState<boolean>(false);

    const [indicator, setIndicator] = useState<string>('0');
    const [strategyAction, setIndicatorAction] = useState<string>('1');

    const [stopLossType, setStopLossType] = useState<string>('0');
    const today = new Date()
    const formattedDate = format(today, 'yyyy-MM-dd');


    useEffect(() => {
        getAssets();
    }, []);

    useEffect(() => {
        console.log('STATE CHANGED', state);
        if (state.success) {
            setFormState(StrategySettingsFormState.Success);
        }
    }, [state]);

    const getAssets = async () => {
        const assets = await basicFetch<any>(`/api/alpaca/assets`);
        setAssets(assets);
    }

    const handleSubmit = (e: boolean) => {
        setPending(e);
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeDialog = () => {
        setIsModalOpen(false);
    }



    if (!dictionary) {
        return <div>{"Loading..."}</div>;
    }


    return (
        <>
            <div className="component-container overflow-hidden">
                <div className="text-component-head">{dictionary.TEST_CREATE_NEW_STRATEGY}</div>
                <div className="h-full w-full overflow-hidden">
                    <div className="w-full">
                        <div className="text-slate-800 text-lg mb-4">{dictionary.TEST_STRATEGY_SETTINGS}</div>
                        <form action={storeAction} className='flex flex-col gap-2'>
                            <div className="w-full flex flex-col gap-2">
                                <div className="flex items-start mb-1">
                                    <div className="w-[30%] pb-1 flex-shrink-0">
                                        <label>{dictionary.TEST_NAME}</label>
                                    </div>
                                    <div className="flex-1 pb-1">
                                        <input type="text" name="name" className="border border-slate-400 w-full p-1" defaultValue="test" disabled={pending} />
                                        <div className="error-message">{firstOrDefault(state?.errors?.name, '')}</div>
                                    </div>
                                </div>
                                <div className="flex items-start mb-1">
                                    <div className="w-[30%] pb-1 flex-shrink-0">
                                        <label>{dictionary.TEST_STRATEGY_TYPE}</label>
                                    </div>
                                    <div className="flex-1 pb-1">
                                        <select
                                            name="indicator"
                                            className="border border-slate-400 w-full p-1"
                                            title="Strategy"
                                            onChange={(e) => { setIndicator(e.target.value); }}
                                            disabled={pending}
                                        >
                                            <option value={IndicatorEnum.NONE}>{dictionary.INDICATOR_NONE}</option>
                                            {Object.entries(IndicatorEnum)
                                                .filter(([key, value]) => typeof value === "number" && value !== IndicatorEnum.NONE)
                                                .map(([key, value]) => (
                                                    <option key={value} value={value}>
                                                        {dictionary[`INDICATOR_${key}`] || key}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                </div>
                                {indicator !== IndicatorEnum.NONE.toString() && (
                                    <>
                                        <div className="flex items-start mb-1">
                                            <div className="w-[30%] pb-1 flex-shrink-0">
                                                <label>Action</label>
                                            </div>
                                            <div className="flex-1 pb-1">
                                                <select name="strategyAction" className="border border-slate-400 w-full p-1" title="strategyAction" onChange={(e) => { setIndicatorAction(e.target.value) }} disabled={pending}>
                                                    <option value={StrategyActionEnum.Backtest}>Test with my Parameters</option>
                                                    <option value={StrategyActionEnum.Optimization}>Find best Fit</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex items-start mb-1">
                                            <div className="w-[30%] pb-1 flex-shrink-0">
                                                <label>{dictionary.TEST_ASSET}</label>
                                            </div>
                                            <div className="flex-1 pb-1">
                                                <select name="symbol" className="border border-slate-400 w-full p-1" title="Symbol" disabled={pending}>
                                                    {assets.map((asset) => (
                                                        <option key={asset.assetId} value={asset.symbol}>
                                                            {/* No div inside option, just text */}
                                                            {asset.symbol} {asset.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex items-start mb-1">
                                            <div className="w-[30%] pb-1 flex-shrink-0">
                                                <label>{dictionary.TEST_QUANTITY}</label>
                                            </div>
                                            <div className="flex-1 pb-1">
                                                <input type="number" name="quantity" className="border border-slate-400 w-full p-1" defaultValue="1" disabled={pending} />
                                                <div className="error-message">{firstOrDefault(state?.errors?.startDate, '')}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-start mb-1">
                                            <div className="w-[30%] pb-1 flex-shrink-0">
                                                <label>{dictionary.TEST_START_BACKTEST}</label>
                                            </div>
                                            <div className="flex-1 pb-1">
                                                <input type="date" name="startDate" className="border border-slate-400 w-full p-1" defaultValue="2025-01-01" disabled={pending} />
                                                <div className="error-message">{firstOrDefault(state?.errors?.startDate, '')}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-start mb-1">
                                            <div className="w-[30%] pb-1 flex-shrink-0">
                                                <label>{dictionary.TEST_END_BACKTEST}</label>
                                            </div>
                                            <div className="flex-1 pb-1">
                                                <input type="date" name="endDate" className="border border-slate-400 w-full p-1" defaultValue={formattedDate} disabled={pending} />
                                                <div className="error-message">{firstOrDefault(state?.errors?.endDate, '')}</div>
                                            </div>
                                        </div>
                                        {(indicator === IndicatorEnum.SMA.toString() || indicator === IndicatorEnum.EMA.toString() || indicator === IndicatorEnum.WMA.toString()) && (
                                            <StrategySettingsFormSMA pending={pending} state={state} />
                                        )}
                                        <div className="flex items-start mb-1">
                                            <div className="w-[30%] pb-1 flex-shrink-0">
                                                <label>{dictionary.TEST_ALLOW_OVERNIGHT}</label>
                                            </div>
                                            <div className="flex-1 py-1">
                                                <CheckboxSlate name="allowOvernight" label="" />
                                            </div>
                                        </div>
                                        <div className="flex">
                                            <div className="flex-1" />
                                            <div className="flex-1">
                                                <p className="mt-4">
                                                    {pending && (
                                                        <div className="w-full">
                                                            <div className="text-orange-500  my-2">{dictionary.TEST_RUNNING_TEST}</div>
                                                        </div>
                                                    )}
                                                    {formState !== StrategySettingsFormState.Success && (
                                                        <SubmitButton label={strategyAction === StrategyActionEnum.Backtest.toString() ? dictionary.TEST_RUN_BACKTEST : "Opimize Parameter"} handleFormState={handleSubmit} />
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </form>
                        <div className="text-green-500 my-2">{isTestRunning ? dictionary.TEST_RUNNING_TEST : ""}</div>
                        {formState === StrategySettingsFormState.Success && (
                            <>
                                <div className="text-green-500 my-2">{dictionary.TEST_TEST_COMPLETED}</div>
                                <div className="flex flex-row gap-2">
                                    <WidgetButton type="button" label={dictionary.TEST_UPDATE_TEST_RESULT_LIST} method={updateStrategies} /> 
                                    <WidgetButton type="button" label={dictionary.TEST_CREATE_NEW_STRATEGY} method={() => { setFormState(StrategySettingsFormState.None) }} />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <OptimizerModal isOpen={isModalOpen} closeDialog={closeDialog} />
        </>
    );
};

export default StrategySettingsForm;