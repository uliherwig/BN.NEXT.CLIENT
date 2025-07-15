"use client";
import { basicFetch } from "@/app/lib/fetchFunctions";
import { StrategySettings } from "@/models/strategy/strategy-settings";
import { IconButton } from "@mui/material";
import { useEffect, useState } from 'react';
import { useDictionary } from '@/provider/dictionary-provider';
import { PositionModel } from "@/models/strategy/position-model";
import { format } from 'date-fns';
import ChartPositionModal from "../chart-position-modal";
import { TestResult } from "@/models/strategy/test-result";
import CircularLoader from "@/components/common/loader";
import BarChartIcon from '@mui/icons-material/BarChart';
import { SideEnum } from "@/models/strategy/enums";

interface TestResultProps {
    strategySettings: StrategySettings;
}

const TestResults: React.FC<TestResultProps> = (params) => {
    const dictionary = useDictionary();
    const [positions, setPositions] = useState<PositionModel[]>([]);
    const [selectedPosition, setSelectedPosition] = useState<PositionModel>({} as PositionModel);
    const [result, setResult] = useState<TestResult>({} as TestResult);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        const id = params.strategySettings.id;
        if (id !== undefined && id !== '') {
            updatePositions(id);
            updateResult(id);
        }
        setLoading(false);
    }, [params, params.strategySettings]);

    const updateResult = async (id: string) => {
        const res = await basicFetch<any>(`/api/strategy/test-result?testId=${id}`);
        setResult(res);
    }

    const updatePositions = async (id: string) => {
        const res = await basicFetch<any>(`/api/strategy/test-positions?testId=${id}`);
        const sortedPositions = res.sort((a: PositionModel, b: PositionModel) => new Date(b.stampClosed).getTime() - new Date(a.stampClosed).getTime());
        setPositions(sortedPositions);
    }

    const [dialogOpen, setDialogOpen] = useState(false);

    const closeDialog = () => {
        setDialogOpen(false);
    };

    const showPositionAndChart = (position: PositionModel) => {
        setSelectedPosition(position);
        setDialogOpen(true);
    }

    if (!dictionary) {
        return <div>{"Loading..."}</div>;
    }

    const TABLE_HEAD = [
        dictionary.DASH_SIDE,
        dictionary.DASH_START,
        dictionary.DASH_STOP,
        dictionary.DASH_SIGNAL,
        dictionary.DASH_PROFIT_LOSS,
        dictionary.DASH_ACTIONS
    ];

    return (
        <>
            <ChartPositionModal isOpen={dialogOpen} closeDialog={closeDialog} positions={[selectedPosition]} />
            <div className="component-container">
                <div className="text-component-head mb-2">{dictionary.DASH_TEST_RESULT} {params.strategySettings.name}</div>
                {loading && (
                    <CircularLoader />
                )}
                {!loading && (
                    <div className="h-[17%] w-full">
                        {!loading && result.id == undefined && <div className="mt-6 text-slate-800">{dictionary.DASH_NO_TEST_AVAILABLE}</div>}

                        {result !== undefined && result !== null && result.id !== undefined && result.id !== '' &&
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="px-2 py-1">{dictionary.DASH_ASSET}</td>
                                        <td className="px-2 py-1">{result.asset}</td>
                                        <td className="px-2 py-1" colSpan={2}>{format(new Date(result.startDate), 'dd.MM.yy')} - {format(new Date(result.endDate), 'dd.MM.yy')}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-2 py-1">{dictionary.DASH_PROFIT}</td>
                                        <td className="px-2 py-1">{result.totalProfitLoss}</td>
                                        <td className="px-2 py-1">{dictionary.DASH_NUMBER_POSITIONS}</td>
                                        <td className="px-2 py-1">{result.numberOfPositions}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-2 py-1">{dictionary.DASH_PROFIT_BUY}</td>
                                        <td className="px-2 py-1">{result.buyProfitLoss}</td>
                                        <td className="px-2 py-1">{dictionary.DASH_NUMBER_BUY_POSITIONS}</td>
                                        <td className="px-2 py-1">{result.numberOfBuyPositions}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-2 py-1">{dictionary.DASH_PROFIT_SELL}</td>
                                        <td className="px-2 py-1">{result.sellProfitLoss}</td>
                                        <td className="px-2 py-1">{dictionary.DASH_NUMBER_SELL_POSITIONS}</td>
                                        <td className="px-2 py-1">{result.numberOfSellPositions}</td>
                                    </tr>
                                </tbody>
                            </table>
                        }
                    </div>
                )}
                {positions.length > 0 &&
                    <div className="h-[78%] w-full overflow-hidden pt-5">
                        <div className="h-full overflow-auto">
                            <table className="min-w-full table-fixed border">
                                <thead className="bg-slate-700 sticky top-[-2px] z-50">
                                    <tr>
                                        {TABLE_HEAD.map((column) => (
                                            <th key={column} className="px-2 py-1 text-center text-white text-xs">
                                                {column}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className='text-slate-800 text-sm overflow-y'>
                                    {positions.map((item, index) => (
                                        <tr key={item.id} className={`hover:bg-zinc-200 ${index % 2 === 1 ? 'bg-gray-100' : 'bg-white'}`}>
                                            <td className="px-2 py-1 text-center">{item.side === SideEnum.Buy ? dictionary.DASH_BUY : dictionary.DASH_SELL}</td>
                                            <td className="py-1 text-center">{format(new Date(item.stampOpened), 'dd.MM.yy HH:mm')}</td>
                                            <td className="py-1 text-center">{format(new Date(item.stampClosed), 'dd.MM.yy HH:mm')}</td>
                                            <td className="py-1 text-center">{item.closeSignal}</td>
                                            <td className="py-1 text-center">{item.profitLoss.toPrecision(2)}</td>
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
            </div>
        </>
    );
}

export default TestResults;