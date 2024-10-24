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

    console.log("TestList ##############################################");
    const dictionary = useDictionary();
    const [backtests, setBacktests] = useState<BacktestSettings[]>([]);
    useEffect(() => {
        console.log("latestTest ");
        updateTests();
    }, []);

    const updateTests = async () => {
        const tests = await basicFetch<any>(`/api/strategy/test-settings?email=${email}`);
        console.log(tests);
        setBacktests(tests);
        const latestTest = firstOrDefault(tests, []);
        if (latestTest) {
            showResult(latestTest);
        }
    }

    if (!dictionary) {
        return <div>Loading...</div>;
    }

    const TABLE_HEAD = ["Name", "Symbol", "Strategy", "Timeframe", "Results"];
    return (
        <div className="component-container">
            <div className="text-component-head mb-2">{dictionary.BROKERS_backtest} Liste</div>
            {/* <input type="button" value="REfresh" className='border border-slate-400 w-[250px] mt-4 bg-slate-600 text-slate-50 p-1 cursor-pointer' onClick={updateTests} />      */}

            <div className="h-[95%] w-full overflow-hidden">
                <div className="h-full overflow-auto">

                    {backtests.length === 0 && <div className="mt-5 text-slate-800">Es sind keine Tests verfügbar. Starten Sie Ihren ersten Test.</div>}

                    {backtests.length > 0 &&
                        <table className="min-w-full table-fixed border">
                            <thead className="bg-slate-700 sticky top-0">
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
                        </table>}
                </div>
            </div>
        </div>
    );
}

export default TestList;
