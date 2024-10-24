"use client";
import { createAlpacaBacktest } from "@/app/actions/alpaca";
import { useFormState } from "react-dom";
import { firstOrDefault } from "@/utilities";
import { useEffect, useState } from "react";
import SubmitButton from "@/components/common/submit-button";
import { format } from 'date-fns';
import { BreakoutPeriod, StopLossStrategy } from "@/models/strategy/enums";


const TestSettingsForm = () => {
    const [state, storeAction] = useFormState<any, FormData>(createAlpacaBacktest, { message: '', success: false, errors: {} });
    const [pending, setPending] = useState(false);

    const [strategy, setStrategy] = useState<string>('0');
    const [stopLossStrategy, setStopLossStrategy] = useState<string>('0');
    const today = new Date()
    const formattedDate = format(today, 'yyyy-MM-dd');


    useEffect(() => {
        console.log('state:', state);
        if (state.success) {
            setPending(false)
        }
        if(state.errors) {
            setPending(false)
        }
    }, [state]);

    useEffect(() => {
        console.log('pending:', pending);
    }, [pending]);

    const handleSubmit = (e: any) => {
        setPending(e)
    }

    return (
        <div className="component-container">
            <div className="text-component-head mb-2">Start Backtest</div>
            <div className="flex flex-row gap-4 w-full">
                <div className="w-full text-sm">

                    <div className="text-slate-800 text-lg mb-4">Einstellungen Backtest (Empfohlende Einstellungen)</div>
                    {!state.success && !pending && (
                        <form action={storeAction} className='flex flex-col gap-2'>
                            <table className="w-full border-collapse">
                                <tbody>
                                    <tr>
                                        <td className="pb-1"><label>Backtest Name</label></td>
                                        <td className="pb-1">
                                            <input type="text" name="name" className="border border-slate-400 w-full p-1" defaultValue="test" />
                                            <div className="error-message">{firstOrDefault(state?.errors?.name, '')}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="pb-1"><label>Strategie</label></td>
                                        <td className="pb-1">
                                            <select name="strategy" className="border border-slate-400 w-full p-1" title="Strategy" onChange={(e) => { setStrategy(e.target.value) }}>
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
                                                    <select name="symbol" className="border border-slate-400 w-full p-1" title="Symbol">
                                                        <option value="SPY">SPY</option>
                                                        <option value="TSLA">TSLA</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="pb-1"><label>Start Date</label></td>
                                                <td className="pb-1">
                                                    <input type="date" name="startDate" className="border border-slate-400 w-full p-1" defaultValue="2024-01-01" />
                                                    <div className="error-message">{firstOrDefault(state?.errors?.startDate, '')}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="pb-1"><label>End Date</label></td>
                                                <td className="pb-1">
                                                    <input type="date" name="endDate" className="border border-slate-400 w-full p-1" defaultValue={formattedDate} />
                                                    <div className="error-message">{firstOrDefault(state?.errors?.endDate, '')}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="pb-1"><label>Breakout Period</label></td>
                                                <td className="pb-1">
                                                    <select name="breakoutPeriod" className="border border-slate-400 w-full p-1" title="Time Frame" defaultValue={BreakoutPeriod.Day}>
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
                                                    <select name="stopLossStrategy" className="border border-slate-400 w-full p-1" title="Time Frame" defaultValue="0" onChange={(e) => { setStopLossStrategy(e.target.value) }}>
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
                                                            <input type="text" name="stopLossPercent" className="border border-slate-400 w-full p-1" defaultValue="0.01" />
                                                            <div className="error-message">{firstOrDefault(state?.errors?.stopLossPercent, '')}</div>
                                                        </td>
                                                    </tr>

                                                </>
                                            )}
                                            <tr>
                                                <td className="pb-1"><label>Take Profit Percent</label></td>
                                                <td className="pb-1">
                                                    <input type="text" name="takeProfitPercent" className="border border-slate-400 w-full p-1" defaultValue="5" />
                                                    <div className="error-message">{firstOrDefault(state?.errors?.takeProfitPercent, '')}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="pb-1"><label>Trailing Stop</label></td>
                                                <td className="pb-1">
                                                    <input type="text" name="trailingStop" className="border border-slate-400 w-full p-1" defaultValue="1" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="pb-1"><label>Allow Overnight</label></td>
                                                <td className="py-1">
                                                    <input type="checkbox" name="allowOvernight" className="border border-slate-400 cursor-pointer w-5 h-5" />
                                                </td>
                                            </tr>

                                            <tr >
                                                <td colSpan={2}>
                                                    <SubmitButton label="Start Backtest" handleFormState={handleSubmit} />
                                                </td>
                                            </tr>
                                        </>)}
                                </tbody>
                            </table>
                        </form>
                    )}

                    {state.success && (
                        <>

                            <div className="text-green-500">Der Test wurde durchgeführt. </div>

                            {/*
                            Anzeige der Settings
                             Button für neustart */}



                        </>


                    )}

                    {pending && (
                        <>

                            <div className="text-orange-500">Der Test läuft gerade.... </div>
                            <div>Das kann einige Minuten dauern.</div>

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

export default TestSettingsForm;