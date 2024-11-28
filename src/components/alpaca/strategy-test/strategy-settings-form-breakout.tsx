"use client";
import { firstOrDefault } from "@/utilities";
import React, { useState } from "react";
import { BreakoutPeriodEnum, StopLossTypeEnum } from "@/models/strategy/enums";

interface StrategySettingsBreakoutProps {
    pending: boolean;
    state: any;}


const StrategySettingsFormBreakout: React.FC<StrategySettingsBreakoutProps> = ({ pending, state }) => {
    const [stopLossType, setStopLossType] = useState<string>('0');

    return (
        <>
            <tr>
                <td className="pb-1"><label>Breakout Period</label></td>
                <td className="pb-1">
                    <select name="breakoutPeriod" className="border border-slate-400 w-full p-1" title="Time Frame" defaultValue={BreakoutPeriodEnum.Day} disabled={pending}>
                        <option value={BreakoutPeriodEnum.Minute}>1 Minute</option>
                        <option value={BreakoutPeriodEnum.TenMinutes}>10 Minutes</option>
                        <option value={BreakoutPeriodEnum.Hour}>1 Hour</option>
                        <option value={BreakoutPeriodEnum.Day}>1 Day</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td className="pb-1"><label>Stop Loss Strategy</label></td>
                <td className="pb-1">
                    <select name="stopLossStrategy" className="border border-slate-400 w-full p-1" title="Time Frame"
                        defaultValue="0" onChange={(e) => { setStopLossType(e.target.value) }} disabled={pending}>
                        <option value={StopLossTypeEnum.Breakout}>Prev. Minimum</option>
                        <option value={StopLossTypeEnum.CustomLimit}>Custom limits</option>
                    </select>
                </td>
            </tr>
            {stopLossType !== '0' && (
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
        </>
    );
};

export default StrategySettingsFormBreakout;