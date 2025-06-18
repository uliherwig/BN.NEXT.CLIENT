"use client";
import { createAlpacaBacktest } from "@/app/actions/alpaca";
import { useFormState } from "react-dom";
import { firstOrDefault } from "@/utilities";
import React, { useEffect, useState } from "react";
import SubmitButton from "@/components/common/buttons/submit-button";
import { format } from 'date-fns';
import { BreakoutPeriodEnum, StopLossTypeEnum, StrategyEnum } from "@/models/strategy/enums";
import { useDictionary } from "@/provider/dictionary-provider";
import WidgetButton from "@/components/common/buttons/widget-button";
import CheckboxSlate from "@/components/common/checkbox/checkbox-slate";
import { basicFetch } from "@/app/lib/fetchFunctions";
import { AlpacaAssetModel } from "@/models/alpaca/alpaca-asset-model";
import CircularLoader from "@/components/common/loader";
import StrategySettingsFormBreakout from "./strategy-settings-form-breakout";
import StrategySettingsFormSMA from "./strategy-settings-form-sma";
import OptimizerModal from "./optimizer-modal";

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

    const [state, storeAction] = useFormState<any, FormData>(createAlpacaBacktest, { message: '', success: false, errors: {} });
    const [pending, setPending] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const [strategy, setStrategy] = useState<string>('0');
    const [stopLossType, setStopLossType] = useState<string>('0');
    const today = new Date()
    const formattedDate = format(today, 'yyyy-MM-dd');
 

    useEffect(() => {
        getAssets();
    }, []);

    useEffect(() => {
        console.log(formState);
    }, [formState]);

    useEffect(() => {
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
                        <table className="w-full border-collapse">
                            <tbody>
                                <tr>
                                    <td className="pb-1 w-[30%]"><label>{dictionary.TEST_NAME}</label></td>
                                    <td className="pb-1">
                                        <input type="text" name="name" className="border border-slate-400 w-full p-1" defaultValue="test" disabled={pending} />
                                        <div className="error-message">{firstOrDefault(state?.errors?.name, '')}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="pb-1"><label>{dictionary.TEST_STRATEGY_TYPE}</label></td>
                                    <td className="pb-1">
                                        <select name="strategy" className="border border-slate-400 w-full p-1" title="Strategy" onChange={(e) => { setStrategy(e.target.value) }} disabled={pending}>
                                            <option value={StrategyEnum.None}>{dictionary.TEST_SELECT_STRATEGY}</option>
                                            <option value={StrategyEnum.Breakout}>{dictionary.TEST_BREAKOUT}</option>
                                            <option value={StrategyEnum.SMA}>{dictionary.TEST_SMA}</option>
                                        </select>
                                    </td>
                                </tr>
                                {strategy !== StrategyEnum.None.toString() && (
                                    <>
                                        <tr>
                                            <td className="pb-1"><label>{dictionary.TEST_ASSET}</label></td>
                                            <td className="pb-1">
                                                <select name="symbol" className="border border-slate-400 w-full p-1" title="Symbol" disabled={pending}>
                                                    {assets.map((asset) => (
                                                        <option key={asset.assetId} value={asset.symbol}>
                                                            <div className="truncate w-10">{asset.symbol} {asset.name}</div>
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="pb-1"><label>{dictionary.TEST_QUANTITY}</label></td>
                                            <td className="pb-1">
                                                <input type="number" name="quantity" className="border border-slate-400 w-full p-1" defaultValue="1" disabled={pending} />
                                                <div className="error-message">{firstOrDefault(state?.errors?.startDate, '')}</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="pb-1"><label>{dictionary.TEST_START_BACKTEST}</label></td>
                                            <td className="pb-1">
                                                <input type="date" name="startDate" className="border border-slate-400 w-full p-1" defaultValue="2024-01-01" disabled={pending} />
                                                <div className="error-message">{firstOrDefault(state?.errors?.startDate, '')}</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="pb-1"><label>{dictionary.TEST_END_BACKTEST}</label></td>
                                            <td className="pb-1">
                                                <input type="date" name="endDate" className="border border-slate-400 w-full p-1" defaultValue={formattedDate} disabled={pending} />
                                                <div className="error-message">{firstOrDefault(state?.errors?.endDate, '')}</div>
                                            </td>
                                        </tr>
                                        {strategy === StrategyEnum.Breakout.toString() && (
                                            <StrategySettingsFormBreakout pending={pending} state={state} />
                                        )}
                                        {strategy === StrategyEnum.SMA.toString() && (
                                            <StrategySettingsFormSMA pending={pending} state={state} />
                                        )}
                                        <tr>
                                            <td className="pb-1"><label>{dictionary.TEST_TAKE_PROFIT_PERCENT}</label></td>
                                            <td className="pb-1">
                                                <input type="text" name="takeProfitPercent" className="border border-slate-400 w-full p-1" defaultValue="1" disabled={pending} />
                                                <div className="error-message">{firstOrDefault(state?.errors?.takeProfitPercent, '')}</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="pb-1"><label>{dictionary.TEST_TRAILING_STOP}</label></td>
                                            <td className="pb-1">
                                                <input type="text" name="trailingStop" className="border border-slate-400 w-full p-1" defaultValue="0" disabled={pending} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="pb-1"><label>{dictionary.TEST_ALLOW_OVERNIGHT}</label></td>
                                            <td className="py-1">
                                                <CheckboxSlate name="allowOvernight" label="" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}>
                                                {pending && (
                                                    <div className="p-4 w-full flex justify-center">
                                                        <div className="text-orange-500">{dictionary.TEST_RUNNING_TEST}</div>
                                                        <p>{dictionary.TEST_RUNNING_TEST_MESSAGE}</p>
                                                    </div>
                                                )}
                                                <p className="mt-4">
                                                    {formState !== StrategySettingsFormState.Success && (
                                                        <>
                                                            <SubmitButton label={dictionary.TEST_RUN_BACKTEST} handleFormState={handleSubmit} />
                                                            <div className="flex flex-row gap-2 mt-2">
                                                                <WidgetButton  type="button" label="Optimiere Parameter" method={() => setIsModalOpen(true)} />
                                                            </div>
                                                            
                                                        </>
                                                    )}
                                                </p>
                                            </td>
                                        </tr>
                                    </>
                                )}
                            </tbody>
                        </table>
                    </form>

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
        <OptimizerModal  isOpen={isModalOpen} closeDialog={closeDialog} />
        </>
    );
};

export default StrategySettingsForm;