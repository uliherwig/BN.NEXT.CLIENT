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
        const connectSignalR = async () => {

            const endpoint = process.env.NEXT_PUBLIC_NOTIFICATION_HUB?.toString() || "";
            await signalRService.startConnection(endpoint);

            const connection = signalRService.getConnection();

            connection.on('ReceiveNotification', (message) => {

                console.log("Received notification:", message);

                const notification: NotificationMessage = JSON.parse(message);
                const date = new Date(notification.Timestamp);
                const formatted = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

                const toPascalCase = (str: string) =>
                    str.charAt(0).toUpperCase() + str.slice(1);

                const test1 = notification.NotificationType;
                const notificationType = NotificationEnum[toPascalCase(notification.NotificationType.toString()) as keyof typeof NotificationEnum];
                const id = new Date().getTime().toString();
         
                console.log("Notification Type:", notificationType);

                switch (notificationType) {
                    case NotificationEnum.BacktestStart:
                        setIsTestRunning(true);
                        break;
                    case NotificationEnum.BacktestStop:
                        updateStrategies();
                        setIsTestRunning(false);
                        break;
                    case NotificationEnum.OptimizeStart:
                        setIsTestRunning(true);
                        break;
                    case NotificationEnum.OptimizeStop:
                        updateStrategies();
                        setIsTestRunning(false);
                        break;
                    default:
                        break;
                }






                
            });
        }
        connectSignalR();

        return () => {
            // Clean up the effect
            if (signalRService.getConnection()?.state === 'Connected') {
                signalRService.getConnection().stop();
            }
        };
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
                                        </td>
                                    </tr>
                                    {indicator !== IndicatorEnum.NONE.toString() && (
                                        <>
                                            <tr>
                                                <td className="pb-1"><label>Action</label></td>
                                                <td className="pb-1">
                                                    <select name="strategyAction" className="border border-slate-400 w-full p-1" title="strategyAction" onChange={(e) => { setIndicatorAction(e.target.value) }} disabled={pending}>
                                                        <option value={StrategyActionEnum.Backtest}>Test with my Parameters</option>
                                                        <option value={StrategyActionEnum.Optimization}>Find best Fit</option>

                                                    </select>
                                                </td>
                                            </tr>
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
                                                    <input type="date" name="startDate" className="border border-slate-400 w-full p-1" defaultValue="2025-01-01" disabled={pending} />
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
                               
                                            {(indicator === IndicatorEnum.SMA.toString() || indicator === IndicatorEnum.EMA.toString() || indicator === IndicatorEnum.WMA.toString()) && (
                                                <StrategySettingsFormSMA pending={pending} state={state} />
                                            )}

                                            <tr>
                                                <td className="pb-1"><label>{dictionary.TEST_ALLOW_OVERNIGHT}</label></td>
                                                <td className="py-1">
                                                    <CheckboxSlate name="allowOvernight" label="" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>

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
                                                </td>
                                            </tr>
                                        </>
                                    )}
                                </tbody>
                            </table>
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