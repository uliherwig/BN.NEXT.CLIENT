"use client";
import { createAlpacaBacktest } from "@/app/actions/alpaca";
import { useFormState } from "react-dom";
import { firstOrDefault } from "@/utilities";
import BNButton from "../common/bn-button";


const TestSettingsForm = () => {
    const [state, storeAction] = useFormState<any, FormData>(createAlpacaBacktest, { message: '', success: false, errors: {} });


    return (
        <div className="h-full bg-white p-3 px-5">
        <div className="text-slate-800 text-lg font-bold mb-4">Start Backtest</div>
        <div className="flex flex-row gap-4 w-full">
            <div className="w-full text-sm">

                <div className="text-slate-800 text-lg mb-4">Eingabe Backtest Parameter</div>
                {!state.success && (
                    <form action={storeAction} className='flex flex-col gap-2'>
                        <label>Backtest Name</label>
                        <input type="text" name="name" className='border border-slate-400 w-full p-1' value='test' />
                        <div className='error-message'>{firstOrDefault(state?.errors?.name, '')}</div>
                        <label>Strategie</label>

                        <select name="strategy" className='border border-slate-400 w-full p-1' title="Strategy">
                            <option value="0">Breakout</option>
                            <option value="1">Moving Averages</option>
                        </select>

                        <label>Symbol</label>
                        <select name="symbol" className='border border-slate-400 w-full p-1' title="Symbol">
                            <option value="SPY">SPY</option>
                            <option value="TSLA">TSLA</option>
                        </select>

                        <label>Take Profit Factor</label>
                        <input type="text"  name="takeProfitFactor" className='border border-slate-400 w-full p-1' value='0.01'/>
                        <div className='error-message'>{firstOrDefault(state?.errors?.takeProfitFactor, '')}</div>

                        <label>Stop Loss Factor</label>
                        <input type="text" name="stopLossFactor" className='border border-slate-400 w-full p-1'  value='0.01' />
                        <div className='error-message'>{firstOrDefault(state?.errors?.stopLossFactor, '')}</div>

                        <label>Start Date</label>
                        <input type="date" name="startDate" className='border border-slate-400 w-full p-1' value='2024-01-01' />
                        <div className='error-message'>{firstOrDefault(state?.errors?.startDate, '')}</div>

                        <label>End Date</label>
                        <input type="date" name="endDate" className='border border-slate-400 w-full p-1'  value='2024-10-01' />
                        <div className='error-message'>{firstOrDefault(state?.errors?.endDate, '')}</div>

                        <label>Time Frame</label>
                        <select name="timeFrame" className='border border-slate-400 w-full p-1' title="Time Frame" value='3'>
                            <option value="0">1 Minute</option>
                            <option value="0">10 Minutes</option>                 
                            <option value="2">1 Hour</option>
                            <option value="3">1 Day</option>
                        </select>
              
                        <BNButton type='submit' label='Start Backtest' />
                    </form>
                )}

                <div className="text-green-500">{state.message}</div>


            </div>
    
        </div>
        <div className="text-slate-800 text-lg mb-4 mt-4">Liste gewählte Assets</div>

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