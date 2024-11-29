"use client";
import { firstOrDefault } from "@/utilities";
import React, {  } from "react";
import { useDictionary } from "@/provider/dictionary-provider";



interface StrategySettingsFormSMAProps {
    pending: boolean;
    state: any;
}


const StrategySettingsFormSMA: React.FC<StrategySettingsFormSMAProps> = ({ pending, state }) => {
    const dictionary = useDictionary();



    if (!dictionary) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <tr>
                <td className="pb-1"><label>Short Period</label></td>
                <td className="pb-1">
                    <input type="number" name="shortPeriod" className="border border-slate-400 w-full p-1" defaultValue="3" disabled={pending} />
                    <div className="error-message">{firstOrDefault(state?.errors?.ShortPeriod, '')}</div>
                </td>
            </tr>
            <tr>
                <td className="pb-1"><label>Long Period</label></td>
                <td className="pb-1">
                    <input type="number" name="longPeriod" className="border border-slate-400 w-full p-1" defaultValue="5" disabled={pending} />
                    <div className="error-message">{firstOrDefault(state?.errors?.LongPeriod, '')}</div>
                </td>
            </tr>
        </>
    );
};

export default StrategySettingsFormSMA;