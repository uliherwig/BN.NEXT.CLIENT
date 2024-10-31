"use client";
import { basicFetch } from "@/app/lib/fetchFunctions";
import { BacktestSettings } from "@/models/strategy/test-settings";
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import { IconButton } from "@mui/material";
import { useEffect, useState } from 'react';
import { useDictionary } from '@/provider/dictionary-provider';
import { firstOrDefault } from "@/utilities";
import CircularLoader from "../../common/loader";
import { BreakoutPeriod, Strategy } from "@/models/strategy/enums";

interface UserTestProps {
    showResult: any
}

const Strategies: React.FC<UserTestProps> = ({ showResult }) => {

    const dictionary = useDictionary();
    const [backtests, setBacktests] = useState<BacktestSettings[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        loadStrategies();
    }, []);

    const loadStrategies = async () => {
        const tests = await basicFetch<any>(`/api/strategy/test-settings?bookmarked=true`);
        setBacktests(tests);
        showResult(firstOrDefault(tests, null));
        setLoading(false);
    }

    const getStrategyString = (value: Strategy): string => {
        return Strategy[value];
    }
    const getBreakoutPeriodString = (value: BreakoutPeriod): string => {
        return BreakoutPeriod[value];
    }
    if (!dictionary) {
        return <div>Loading...</div>;
    }

    const TABLE_HEAD = ["Name", "Symbol", "Strategy", "Timeframe", "Results"];
    return (
        <div className="component-container overflow-hidden">
            <div className="component-head">Meine Strategien</div>
            {/* <input type="button" value="REfresh" className='border border-slate-400 w-[250px] mt-4 bg-slate-600 text-slate-50 p-1 cursor-pointer' onClick={updateTests} />      */}

            <div className="h-full w-full overflow-hidden">
                <div className="h-[93%] overflow-auto">

                    {loading && (
                        <CircularLoader />
                    )}

                    {!loading && backtests.length === 0 && <div className="mt-5 text-slate-800">Es sind keine Strategien vorhanden. Erstellen Sie eine Strategie und starten Sie Ihren ersten Test.</div>}

                    {backtests.length > 0 &&
                        <table className="min-w-full table-fixed border">
                            <thead className="bg-slate-700 sticky top-0 z-10">
                                <tr>
                                    {TABLE_HEAD.map((column) => (
                                        <th key={column} className="px-2 py-1 text-center text-white text-xs">
                                            {column}
                                        </th>
                                    ))}

                                </tr>
                            </thead>
                            <tbody className='text-slate-900 text-sm overflow-y' >
                                {backtests.map((item, index) => (
                                    <tr key={item.id} className={`hover:bg-zinc-200 ${index % 2 === 1 ? 'bg-slate-300' : 'bg-white'}`} >
                                        <td className="px-2 py-1 text-center">{item.name}</td>
                                        <td className=" py-1 text-center">{item.symbol}</td>
                                        <td className="ppy-1 text-center">
                                            {getStrategyString(item.strategy)}
                                        </td>
                                        <td className=" py-1 text-center">
                                            {getBreakoutPeriodString(item.breakoutPeriod)}
                                        </td>
                                        <td className="text-center">
                                            <IconButton aria-label="language" color="primary" onClick={() => showResult(item)}>
                                                <SmartDisplayIcon className='text-slate-800' />
                                            </IconButton>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>}
                </div>
            </div>
        </div>
    );
}

export default Strategies;
