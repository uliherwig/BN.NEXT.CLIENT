"use client";
import { basicFetch } from "@/app/lib/fetchFunctions";
import { BacktestSettings } from "@/models/strategy/test-settings";
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import { IconButton } from "@mui/material";
import { useEffect, useState } from 'react';
import { useDictionary } from '@/provider/dictionary-provider';
import { firstOrDefault } from "@/utilities";

interface UserTestProps {
    email: string;
    showResult: any
}

const TestList: React.FC<UserTestProps> = ({ email, showResult }) => {
    const dictionary = useDictionary();
    const [backtests, setBacktests] = useState<BacktestSettings[]>([]);
    useEffect(() => {
        console.log("latestTest ");
        updateTests();
    }, []);

    const updateTests = async () => {
        const tests = await basicFetch<any>(`/api/strategy/test-settings?email=${email}`);
        setBacktests(tests);
        const latestTest = firstOrDefault(tests , []);
        if(latestTest) {
            showResult(latestTest);
        }        
    }

    if (!dictionary) {
        return <div>Loading...</div>;
    }

    const TABLE_HEAD = ["Name", "Symbol", "Strategy", "Timeframe", "Results"];
    return (
        <div className="flex flex-col w-full h-full">
            <div className="text-slate-800 text-lg font-bold mb-2">{dictionary.BROKERS_backtest}</div>
            {/* <input type="button" value="REfresh" className='border border-slate-400 w-[250px] mt-4 bg-slate-600 text-slate-50 p-1 cursor-pointer' onClick={updateTests} />      */}

            <div className="h-full w-full overflow-hidden pt-5">
                <div className="h-full overflow-auto">
                    <table className="min-w-full table-fixed border">
                        <thead className="bg-slate-700 sticky top-0">
                            <tr>
                                {TABLE_HEAD.map((column) => (
                                    <th key={column} className="px-2 py-1 text-center text-slate-100 text-xs">
                                        {column}
                                    </th>
                                ))}

                            </tr>
                        </thead>
                        <tbody className='text-neutral-800 text-sm overflow-y' >
                            {backtests.map((item, index) => (
                                <tr key={item.id} className={`hover:bg-zinc-200 ${index % 2 === 1 ? 'bg-neutral-300' : 'bg-white'}`} >
                                    <td className="px-2 py-1 text-center">{item.name}</td>
                                    <td className=" py-1 text-center">{item.symbol}</td>
                                    <td className="ppy-1 text-center">
                                        {item.strategy}
                                    </td>
                                    <td className=" py-1 text-center">
                                        {item.timeFrame}
                                    </td>
                                    <td className="text-center">
                                        <IconButton aria-label="language" color="primary" onClick={() => showResult(item)}>
                                            <SmartDisplayIcon className='text-slate-800' />
                                        </IconButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default TestList;
