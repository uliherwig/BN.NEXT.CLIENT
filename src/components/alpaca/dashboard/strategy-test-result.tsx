"use client";
import { basicFetch } from "@/app/lib/fetchFunctions";
import { StrategySettingsModel } from "@/models/strategy/strategy-settings-model";
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import { IconButton } from "@mui/material";
import { useEffect, useState } from 'react';
import { useDictionary } from '@/provider/dictionary-provider';
import { Position } from "@/models/strategy/position";
import { format } from 'date-fns';
import { TestResult } from "@/models/strategy/test-result";
import CircularLoader from "@/components/common/loader";

interface TestResultProps {
    strat: StrategySettingsModel;

}

const StrategyTestResult: React.FC<TestResultProps> = (params) => {


    const dictionary = useDictionary();
    const [positions, setPositions] = useState<Position[]>([]);
    const [selectedPosition, setSelectedPosition] = useState<Position>({} as Position);
    const [result, setResult] = useState<TestResult>({} as TestResult);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const id = params.strat?.id;
        if (id !== undefined && id !== '') {
            updatePositions(id);
            updateResult(id);
        }
    }, [params, params.strat]);

    const updateResult = async (id: string) => {
        setLoading(true);
        const res = await basicFetch<any>(`/api/strategy/test-result?testId=${id}`);
        setResult(res);
        setLoading(false);
    }

    const updatePositions = async (id: string) => {
        const res = await basicFetch<any>(`/api/strategy/test-positions?testId=${id}`);
        const sortedPositions = res.sort((a: Position, b: Position) => new Date(b.stampClosed).getTime() - new Date(a.stampClosed).getTime());
        setPositions(sortedPositions);

    }



    const showPositionAndChart = (position: Position) => {
        setSelectedPosition(position);
    }

    if (!dictionary) {
        return <div>Loading...</div>;
    }

    const TABLE_HEAD = ["Side", "Start", "Stop", "Signal", "Profit/Loss", "Actions"];
    return (
        <>

            <div className="component-container">
                <div className="text-component-head mb-2">Test Result {params.strat?.name}</div>
                {loading && (
                    <CircularLoader />
                )}
                <div className="h-[25%] w-full">


                    {!loading && result.id == undefined && <div className="mt-6 text-slate-800">Es ist kein Test vorhanden. </div>}

                    {!loading && result !== undefined && result !== null && result.id !== undefined && result.id !== '' &&
                        <table>
                            <tbody>
                                <tr>
                                    <td className="px-2 py-1">Symbol</td>
                                    <td className="px-2 py-1">{result.symbol}</td>
                                    <td className="px-2 py-1">TimeFrame</td>
                                    <td className="px-2 py-1">{result.timeFrame}</td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-1">Start Date</td>
                                    <td className="px-2 py-1">{format(new Date(result.startDate), 'dd.MM.yy')}</td>
                                    <td className="px-2 py-1">End Date</td>
                                    <td className="px-2 py-1">{format(new Date(result.endDate), 'dd.MM.yy')}</td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-1">Profit</td>
                                    <td className="px-2 py-1">{result.totalProfitLoss}</td>
                                    <td className="px-2 py-1">Number Positions</td>
                                    <td className="px-2 py-1">{result.numberOfPositions}</td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-1">Profit Buy</td>
                                    <td className="px-2 py-1">{result.buyProfitLoss}</td>
                                    <td className="px-2 py-1">Number Buy Positions</td>
                                    <td className="px-2 py-1">{result.numberOfBuyPositions}</td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-1">Profit Sell</td>
                                    <td className="px-2 py-1">{result.sellProfitLoss}</td>
                                    <td className="px-2 py-1">Number Sell Positions</td>
                                    <td className="px-2 py-1">{result.numberOfSellPositions}</td>
                                </tr>
                            </tbody>
                        </table>
                    }
                </div >
                {
                    positions.length > 0 &&
                    <div className="h-[70%] w-full overflow-hidden pt-5">
                        <div className="h-full overflow-auto">
                            <table className="min-w-full table-fixed border">
                                <thead className="bg-slate-700 sticky top-0 z-50" >
                                    <tr>
                                        {TABLE_HEAD.map((column) => (
                                            <th key={column} className="px-2 py-1 text-center text-white text-xs">
                                                {column}
                                            </th>
                                        ))}

                                    </tr>
                                </thead>
                                <tbody className='text-slate-800 text-sm overflow-y' >
                                    {positions.map((item, index) => (
                                        <tr key={item.id} className={`hover:bg-zinc-200 ${index % 2 === 1 ? 'bg-slate-300' : 'bg-white'}`} >
                                            <td className="px-2 py-1 text-center">{item.side === 0 ? 'BUY' : 'SELL'}</td>
                                            <td className=" py-1 text-center">{format(new Date(item.stampOpened), 'dd.MM.yy HH:mm')}</td>
                                            <td className="ppy-1 text-center">
                                                {format(new Date(item.stampClosed), 'dd.MM.yy HH:mm')}
                                            </td>
                                            <td className=" py-1 text-center">
                                                {item.closeSignal}
                                            </td>
                                            <td className=" py-1 text-center">
                                                {item.profitLoss.toPrecision(2)}
                                            </td>
                                            <td className="text-center">
                                                <IconButton aria-label="language" color="primary" onClick={() => showPositionAndChart(item)}>
                                                    <SmartDisplayIcon className='text-slate-800' />
                                                </IconButton>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                }
            </div >

        </>
    );

}

export default StrategyTestResult;
