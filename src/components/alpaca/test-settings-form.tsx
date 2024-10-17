"use client";
import { createAlpacaBacktest } from "@/app/actions/alpaca";
import { useFormState } from "react-dom";
import { firstOrDefault } from "@/utilities";
import { useEffect, useState } from "react";
import SubmitButton from "@/components/common/submit-button";


const TestSettingsForm = () => {
    const [state, storeAction] = useFormState<any, FormData>(createAlpacaBacktest, { message: '', success: false, errors: {} });
    const [pending, setPending] = useState(false);

    useEffect(() => {
        console.log('state:', state);
        if (state.success) {
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
        <div className="h-full bg-white p-3 px-5">
            <div className="text-slate-800 text-lg font-bold mb-4">Start Backtest</div>
            <div className="flex flex-row gap-4 w-full">
                <div className="w-full text-sm">

                    <div className="text-slate-800 text-lg mb-4">Eingabe Backtest Parameter</div>
                    {!state.success && !pending && (
                        <form action={storeAction} className='flex flex-col gap-2'>
                            <table className="w-full border-collapse">
                                <tbody>
                                    <tr>
                                        <td className="border p-2"><label>Backtest Name</label></td>
                                        <td className="border p-2">
                                            <input type="text" name="name" className="border border-slate-400 w-full p-1" defaultValue="test" />
                                            <div className="error-message">{firstOrDefault(state?.errors?.name, '')}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border p-2"><label>Strategie</label></td>
                                        <td className="border p-2">
                                            <select name="strategy" className="border border-slate-400 w-full p-1" title="Strategy">
                                                <option value="0">Breakout</option>
                                                <option value="1">Moving Averages</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border p-2"><label>Symbol</label></td>
                                        <td className="border p-2">
                                            <select name="symbol" className="border border-slate-400 w-full p-1" title="Symbol">
                                                <option value="SPY">SPY</option>
                                                <option value="TSLA">TSLA</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border p-2"><label>Take Profit Factor</label></td>
                                        <td className="border p-2">
                                            <input type="text" name="takeProfitFactor" className="border border-slate-400 w-full p-1" defaultValue="0.01" />
                                            <div className="error-message">{firstOrDefault(state?.errors?.takeProfitFactor, '')}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border p-2"><label>Stop Loss Factor</label></td>
                                        <td className="border p-2">
                                            <input type="text" name="stopLossFactor" className="border border-slate-400 w-full p-1" defaultValue="0.01" />
                                            <div className="error-message">{firstOrDefault(state?.errors?.stopLossFactor, '')}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border p-2"><label>Start Date</label></td>
                                        <td className="border p-2">
                                            <input type="date" name="startDate" className="border border-slate-400 w-full p-1" defaultValue="2024-01-01" />
                                            <div className="error-message">{firstOrDefault(state?.errors?.startDate, '')}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border p-2"><label>End Date</label></td>
                                        <td className="border p-2">
                                            <input type="date" name="endDate" className="border border-slate-400 w-full p-1" defaultValue="2024-10-01" />
                                            <div className="error-message">{firstOrDefault(state?.errors?.endDate, '')}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border p-2"><label>Time Frame</label></td>
                                        <td className="border p-2">
                                            <select name="timeFrame" className="border border-slate-400 w-full p-1" title="Time Frame" defaultValue="3">
                                                <option value="0">1 Minute</option>
                                                <option value="0">10 Minutes</option>
                                                <option value="2">1 Hour</option>
                                                <option value="3">1 Day</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border p-2" colSpan={2}>
                                            <SubmitButton label="Start Backtest" handleFormState={handleSubmit} />
                                        </td>
                                    </tr>
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