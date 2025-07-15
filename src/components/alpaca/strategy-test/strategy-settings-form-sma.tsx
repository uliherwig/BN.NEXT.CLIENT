"use client";
import { firstOrDefault } from "@/utilities";
import React, { useState } from "react";
import { BreakoutPeriodEnum, StopLossTypeEnum } from "@/models/strategy/enums";
import { useDictionary } from "@/provider/dictionary-provider";



interface StrategySettingsFormSMAProps {
    pending: boolean;
    state: any;
}


const StrategySettingsFormSMA: React.FC<StrategySettingsFormSMAProps> = ({ pending, state }) => {
    const dictionary = useDictionary();

    const [stopLossType, setStopLossType] = useState<string>('0');

    if (!dictionary) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <tr>
                <td className="pb-1"><label>Short Period</label></td>
                <td className="pb-1">
                    <input type="number" name="shortPeriod" className="border border-slate-400 w-full p-1" defaultValue="20" disabled={pending} />
                    <div className="error-message">{firstOrDefault(state?.errors?.ShortPeriod, '')}</div>
                </td>
            </tr>
            <tr>
                <td className="pb-1"><label>Long Period</label></td>
                <td className="pb-1">
                    <input type="number" name="longPeriod" className="border border-slate-400 w-full p-1" defaultValue="30" disabled={pending} />
                    <div className="error-message">{firstOrDefault(state?.errors?.LongPeriod, '')}</div>
                </td>
            </tr>
            <tr>
                <td className="pb-1"><label>Threshold</label></td>
                <td className="pb-1">
                    <input type="number" name="intersectionThreshold" className="border border-slate-400 w-full p-1" defaultValue="0.2" step="0.01" disabled={pending} />
                    <div className="error-message">{firstOrDefault(state?.errors?.LongPeriod, '')}</div>
                </td>
            </tr>
            <tr>
                <td className="pb-1"><label>Stop Loss Strategy</label></td>
                <td className="pb-1">
                    <select name="stopLossStrategy" className="border border-slate-400 w-full p-1" title="Time Frame"
                        defaultValue="0" onChange={(e) => { setStopLossType(e.target.value) }} disabled={pending}>
                        <option value={StopLossTypeEnum.SMAIntersection}>Next MA intersection</option>
                        <option value={StopLossTypeEnum.None}>Custom limits</option>
                    </select>
                </td>
            </tr>
            {stopLossType === StopLossTypeEnum.None.toString() && (
                <>
                    <tr>
                        <td className="pb-1"><label>Stop Loss Percent</label></td>
                        <td className="pb-1">
                            <input type="text" name="stopLossPercent" className="border border-slate-400 w-full p-1" defaultValue="1" disabled={pending} />
                            <div className="error-message">{firstOrDefault(state?.errors?.stopLossPercent, '')}</div>
                        </td>
                    </tr>
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
                </>
            )}
        </>
    );
};

export default StrategySettingsFormSMA;