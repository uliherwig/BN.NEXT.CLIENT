"use client";
import { basicFetch } from "@/app/lib/fetchFunctions";
import { StrategySettingsModel } from "@/models/strategy/strategy-settings-model";
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import { IconButton } from "@mui/material";
import { useEffect, useState } from 'react';
import { useDictionary } from '@/provider/dictionary-provider';
import { Position } from "@/models/strategy/position";
import { format } from 'date-fns';
import ChartPositionModal from "../chart-position-modal";
import { TestResult } from "@/models/strategy/test-result";
import CircularLoader from "@/components/common/loader";
import BarChartIcon from '@mui/icons-material/BarChart';

interface TestResultProps {
    test: StrategySettingsModel;
}

const TestResults: React.FC<TestResultProps> = (params) => {


    const dictionary = useDictionary();
    const [positions, setPositions] = useState<Position[]>([]);
    const [selectedPosition, setSelectedPosition] = useState<Position>({} as Position);
    const [result, setResult] = useState<TestResult>({} as TestResult);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        const id = params.test.id;
        if (id !== undefined && id !== '') {
            updatePositions(id);
            updateResult(id);
           
        }
         setLoading(false);
    }, [params, params.test]);

    const updateResult = async (id: string) => {
        const res = await basicFetch<any>(`/api/strategy/test-result?testId=${id}`);
        setResult(res);
    }

    const updatePositions = async (id: string) => {
        const res = await basicFetch<any>(`/api/strategy/test-positions?testId=${id}`);
        const sortedPositions = res.sort((a: Position, b: Position) => new Date(b.stampClosed).getTime() - new Date(a.stampClosed).getTime());
        setPositions(sortedPositions);
    }

    const [dialogOpen, setDialogOpen] = useState(false);

    const closeDialog = () => {
        setDialogOpen(false);
    };

    const showPositionAndChart = (position: Position) => {
        setSelectedPosition(position);
        setDialogOpen(true);
    }

    if (!dictionary) {
        return <div>Loading...</div>;
    }

    const TABLE_HEAD = ["Side", "Start", "Stop", "Signal", "Profit/Loss", "Actions"];
    return (
        <>
          <ChartPositionModal isOpen={dialogOpen} closeDialog={closeDialog} position={selectedPosition} />
            <div className="component-container">
                <div className="text-component-head mb-2">Test Result {params.test.name}</div>
                {loading && (
                    <CircularLoader />
                )}
                 {!loading && (
                <div className="h-[17%] w-full">

                    {result.id == undefined && <div className="mt-6 text-slate-800">Es ist kein Test verfügbar. </div>}

                    {result !== undefined && result !== null && result.id !== undefined && result.id !== '' &&
                        <table>
                            <tbody>
                                <tr>
                                    <td className="px-2 py-1">Asset</td>
                                    <td className="px-2 py-1">{result.asset}</td>
                                    <td className="px-2 py-1" colSpan={2}>{format(new Date(result.startDate), 'dd.MM.yy')} - {format(new Date(result.endDate), 'dd.MM.yy')}</td>
                                </tr>
                                {/* <tr>
                                    <td className="px-2 py-1">Start Date</td>
                                    <td className="px-2 py-1">{format(new Date(result.startDate), 'dd.MM.yy')}</td>
                                    <td className="px-2 py-1">End Date</td>
                                    <td className="px-2 py-1">{format(new Date(result.endDate), 'dd.MM.yy')}</td>
                                </tr> */}
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
                )}
                {positions.length > 0 &&
                    <div className="h-[78%] w-full overflow-hidden pt-5">
                        <div className="h-full overflow-auto">
                            <table className="min-w-full table-fixed border">
                                <thead className="bg-slate-700 sticky top-[-2px] z-50" >
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
                                        <tr key={item.id} className={`hover:bg-zinc-200 ${index % 2 === 1 ? 'bg-gray-100' : 'bg-white'}`} >
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
                                                    <BarChartIcon className='text-slate-800' />
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

export default TestResults;
