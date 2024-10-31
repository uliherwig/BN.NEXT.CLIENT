"use client";
import { createAlpacaBacktest } from "@/app/actions/alpaca";
import { useFormState } from "react-dom";
import { firstOrDefault } from "@/utilities";
import { useEffect, useState } from "react";
import SubmitButton from "@/components/common/buttons/submit-button";
import { format } from 'date-fns';
import { BreakoutPeriod, StopLossStrategy } from "@/models/strategy/enums";
import { useDictionary } from "@/provider/dictionary-provider";
import { useForm } from "react-hook-form";

import WidgetButton from "@/components/common/buttons/widget-button";
import CheckboxSlate from "@/components/common/checkbox/checkbox-slate";

enum StrategySettingsFormState {
    None,
    Loading,
    Idle,
    Success,
    Error
}


const StrategySettingsForm = () => {
    const dictionary = useDictionary();
    const [formState, setFormState] = useState<StrategySettingsFormState>(StrategySettingsFormState.None);

    const [state, storeAction] = useFormState<any, FormData>(createAlpacaBacktest, { message: '', success: false, errors: {} });
    const [pending, setPending] = useState(false);

    const [strategy, setStrategy] = useState<string>('0');
    const [stopLossStrategy, setStopLossStrategy] = useState<string>('0');
    const today = new Date()
    const formattedDate = format(today, 'yyyy-MM-dd');


    useEffect(() => {
        console.log(formState);
    }, [formState]);


    useEffect(() => {
        console.log('state:', state);
        if (state.success) {
            setFormState(StrategySettingsFormState.Success);
        }

    }, [state]);

    const handleSubmit = (e: any) => {
        setPending(e);
        console.log('pending:', pending);
    }

    const handleFocus = (fieldName: any) => {


    };

    return (
        <div className="component-container  overflow-hidden">
            <div className="text-component-head">Create a new Strategy</div>
            <div className="h-full w-full overflow-hidden">
                <div className="w-full">

                    <div className="text-slate-800 text-lg mb-4">Einstellungen Backtest (Empfohlende Einstellungen)</div>

                    <form action={storeAction} className='flex flex-col gap-2'>
                        <table className="w-full border-collapse">
                            <tbody>
                                <tr>
                                    <td className="pb-1"><label>Backtest Name</label></td>
                                    <td className="pb-1">
                                        <input type="text" name="name" className="border border-slate-400 w-full p-1" defaultValue="test" disabled={pending} />
                                        <div className="error-message">{firstOrDefault(state?.errors?.name, '')}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="pb-1"><label>Strategie</label></td>
                                    <td className="pb-1">
                                        <select name="strategy" className="border border-slate-400 w-full p-1" title="Strategy" onChange={(e) => { setStrategy(e.target.value) }} disabled={pending}>
                                            <option value="0">Select Strategy</option>
                                            <option value="1">Breakout</option>
                                            <option value="2">Moving Averages</option>
                                        </select>
                                    </td>
                                </tr>
                                {strategy !== '0' && (
                                    <>
                                        <tr>
                                            <td className="pb-1"><label>Symbol</label></td>
                                            <td className="pb-1">
                                                <select name="symbol" className="border border-slate-400 w-full p-1" title="Symbol" disabled={pending}>
                                                    <option value="SPY">SPY</option>
                                                    <option value="TSLA">TSLA</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="pb-1"><label>Start Date</label></td>
                                            <td className="pb-1">
                                                <input type="date" name="startDate" className="border border-slate-400 w-full p-1" defaultValue="2024-01-01" disabled={pending} />
                                                <div className="error-message">{firstOrDefault(state?.errors?.startDate, '')}</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="pb-1"><label>End Date</label></td>
                                            <td className="pb-1">
                                                <input type="date" name="endDate" className="border border-slate-400 w-full p-1" defaultValue={formattedDate} disabled={pending} />
                                                <div className="error-message">{firstOrDefault(state?.errors?.endDate, '')}</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="pb-1"><label>Breakout Period</label></td>
                                            <td className="pb-1">
                                                <select name="breakoutPeriod" className="border border-slate-400 w-full p-1" title="Time Frame" defaultValue={BreakoutPeriod.Day} disabled={pending}>
                                                    <option value={BreakoutPeriod.Minute}>1 Minute</option>
                                                    <option value={BreakoutPeriod.TenMinutes}>10 Minutes</option>
                                                    <option value={BreakoutPeriod.Hour}>1 Hour</option>
                                                    <option value={BreakoutPeriod.Day}>1 Day</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="pb-1"><label>Stop Loss Strategy</label></td>
                                            <td className="pb-1">
                                                <select name="stopLossStrategy" className="border border-slate-400 w-full p-1" title="Time Frame"
                                                    defaultValue="0" onChange={(e) => { setStopLossStrategy(e.target.value) }} disabled={pending}>
                                                    <option value={StopLossStrategy.Breakout}>Prev. Minimum</option>
                                                    <option value={StopLossStrategy.CustomLimit}>Custom limits</option>
                                                </select>
                                            </td>
                                        </tr>
                                        {stopLossStrategy !== '0' && (
                                            <>
                                                <tr>
                                                    <td className="pb-1"><label>Stop Loss Percent</label></td>
                                                    <td className="pb-1">
                                                        <input type="text" name="stopLossPercent" className="border border-slate-400 w-full p-1" defaultValue="0.01" disabled={pending} />
                                                        <div className="error-message">{firstOrDefault(state?.errors?.stopLossPercent, '')}</div>
                                                    </td>
                                                </tr>

                                            </>
                                        )}
                                        <tr>
                                            <td className="pb-1"><label>Take Profit Percent</label></td>
                                            <td className="pb-1">
                                                <input type="text" name="takeProfitPercent" className="border border-slate-400 w-full p-1" defaultValue="5" disabled={pending} />
                                                <div className="error-message">{firstOrDefault(state?.errors?.takeProfitPercent, '')}</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="pb-1"><label>Trailing Stop</label></td>
                                            <td className="pb-1">
                                                <input type="text" name="trailingStop" className="border border-slate-400 w-full p-1" defaultValue="0" disabled={pending} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="pb-1"><label>Allow Overnight</label></td>
                                            <td className="py-1">
                                                <CheckboxSlate name="allowOvernight" label="" />
                                            </td>
                                        </tr>
                                        <tr >
                                            <td colSpan={2}>
                                                {pending && (
                                                    <div className="p-4 w-full flex justify-center">
                                                        <p className="text-orange-500">Der Test läuft gerade.... </p>
                                                        <p>Das kann einige Minuten dauern.</p>
                                                    </div>
                                                )}
                                                <p className="mt-4">
                                                    <SubmitButton label="Test Strategy" handleFormState={handleSubmit} />
                                                </p>
                                            </td>
                                        </tr>
                                    </>)}
                            </tbody>
                        </table>
                    </form>
                    {/* <>

<div className="text-green-500">Der Test wurde durchgeführt. </div>
<div className="p-4 w-full flex justify-center gap-2">
    <WidgetButton type="button" label="Load Test Result" method={() => { setFormState(StrategySettingsFormState.None) }} />
    <WidgetButton type="button" label="Update Test Result List" method={() => { setFormState(StrategySettingsFormState.None) }} />
    <WidgetButton type="button" label="Create New Strategy" method={() => { setFormState(StrategySettingsFormState.None) }} />
</div>
</> */}

                    {formState === StrategySettingsFormState.Success && (
                        <>

                            <div className="text-green-500">Der Test wurde durchgeführt. </div>
                            <div className="flex flex-row gap-2">
                                <WidgetButton type="button" label="Load Test Result" method={() => { setFormState(StrategySettingsFormState.None) }} />
                                <WidgetButton type="button" label="Update Test Result List" method={() => { setFormState(StrategySettingsFormState.None) }} />
                                <WidgetButton type="button" label="Create New Strategy" method={() => { setFormState(StrategySettingsFormState.None) }} />
                            </div>
                        </>


                    )}





                </div>

            </div>


            {/* {selectedAssets.map((asset) => (
            <div key={asset} className="flex justify-between items-center p-2 border-b border-gray-300">
                <span>{asset}</span>
                <button className="bg-slate-500 text-white p-1 rounded">Löschen</button>
            </div>
        ))} */}

        </div>
    );
};

export default StrategySettingsForm;