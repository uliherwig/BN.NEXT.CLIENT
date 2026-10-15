"use client";
import { useEffect, useState } from 'react';
import { useDictionary } from '@/app/provider/dictionary-provider';
import CircularLoader from "@/app/components/common/loader";
import { AlpacaStrategyTracking } from '@/app/models/alpaca/alpaca-strategy-tracking';
import { StrategyTypeEnum } from '@/app/models/strategy/enums';

interface AlpacaStrategiesProps {
    strategyTrackings: AlpacaStrategyTracking[] | null
    setSelectedStrategy: (selectedStrategy: AlpacaStrategyTracking | null) => void

}

const AlpacaStrategies: React.FC<AlpacaStrategiesProps> = ({ strategyTrackings, setSelectedStrategy }) => {
    const dictionary = useDictionary();

    const [loading, setLoading] = useState<boolean>(true);


    const handleRowClick = (strat: AlpacaStrategyTracking) => {
        console.log("Selected Execution: ", strat);

        setSelectedStrategy(strat)
    }

    useEffect(() => {

        console.log(strategyTrackings)
        setLoading(false);

    }, [strategyTrackings]);

    const TABLE_HEAD = ['Name', 'Asset', 'Mode', 'StartedAt', 'StoppedAt', ''];

    if (!dictionary) {
        return <div>Loading...</div>;
    }
    return (
        <div className="component-container">
            <div className="text-component-head mb-2">AI Strategies</div>
            <div className="h-[50%] w-full overflow-hidden">
                {loading && (
                    <CircularLoader />
                )}
                {!loading && (
                    <div className="h-full overflow-auto inset-px-2">
                        {/* example table */}

                        <table className="min-w-full table-fixed border">
                            <thead className="bg-slate-700 sticky top-[-2px] z-50" >
                                <tr className='text-white text-xs'>
                                    {TABLE_HEAD.map((column, index) => (
                                        <th key={column} className={index === 0 ? "px-2 py-1 text-left" : "px-2 py-1 text-center"}>
                                            {column}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className='text-slate-800 text-sm overflow-y' >
                                {strategyTrackings?.map((item, index) => (
                                    <tr key={index} className={`hover:bg-zinc-200 ${index % 2 === 1 ? 'bg-gray-100' : 'bg-white'}`} >
                                        <td className="px-2 py-1">{item.name}</td>
                                        <td className=" py-1 text-center">{item.asset}</td>
                                        <td className=" py-1 text-center">{StrategyTypeEnum[item.strategyType]}</td>

                                        <td className="py-1 text-center">
                                            {(() => { const d = new Date(item.startedAtUtc).toISOString(); return d.substring(8, 10) + '.' + d.substring(5, 7) + ' ' + d.substring(11, 16); })()}
                                        </td>
                                        <td className="py-1 text-center">

                                            {item.stoppedAtUtc != null &&
                                                (() => { const d = new Date(item.stoppedAtUtc).toISOString(); return d.substring(8, 10) + '.' + d.substring(5, 7) + ' ' + d.substring(11, 16); })()
                                            }

                                        </td>
                                        <td className=" py-1 text-center">
                                            <button className="text-blue-600 hover:underline" onClick={() => handleRowClick(item)}>Select</button>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                )}
            </div>
        </div>
    );

}

export default AlpacaStrategies;