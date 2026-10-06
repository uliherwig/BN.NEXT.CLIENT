"use client";
import { basicFetch } from "@/app/lib/fetchFunctions";
import { StrategySettings } from "@/app/models/strategy/strategy-settings";
import { IconButton } from "@mui/material";
import { useEffect, useState } from 'react';
import { useDictionary } from '@/app/provider/dictionary-provider';
import { PositionModel } from "@/app/models/strategy/position-model";
import { format } from 'date-fns';
import ChartPositionModal from "@/app/components/alpaca/chart-position-modal";
import { TestResult } from "@/app/models/strategy/test-result";
import CircularLoader from "@/app/components/common/loader";
import BarChartIcon from '@mui/icons-material/BarChart';
import { SideEnum } from "@/app/models/strategy/enums";

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


    // Tab state: 0 = Summary, 1 = Positions
    const [activeTab, setActiveTab] = useState(0);

    return (
        <>
            <ChartPositionModal isOpen={dialogOpen} closeDialog={closeDialog} positions={[selectedPosition]} indicator={params.strategySettings.indicatorType} />
            <div className="component-container">
                <div className="text-component-head mb-2">{dictionary.DASH_TEST_RESULT} {params.strategySettings.name}</div>
                {/* Tabs */}
                <div className="flex border-b border-gray-200 mb-4">
                    <button
                        className={`px-4 py-2 -mb-px font-semibold border-b-2 transition-colors duration-200 focus:outline-none ${activeTab === 0 ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-blue-600'}`}
                        onClick={() => setActiveTab(0)}
                    >
                        Summary
                    </button>
                    <button
                        className={`px-4 py-2 -mb-px font-semibold border-b-2 transition-colors duration-200 focus:outline-none ${activeTab === 1 ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-blue-600'}`}
                        onClick={() => setActiveTab(1)}
                    >
                        Positions
                    </button>
                </div>
                {loading && <CircularLoader />}
                {!loading && (
                    <div>
                        {activeTab === 0 && (
                            <div className="w-full">
                                {result.id == undefined && <div className="mt-6 text-slate-800">{dictionary.DASH_NO_TEST_AVAILABLE}</div>}
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
                                            <tr>
                                                <td className="px-2 py-1">{dictionary.DASH_AVERAGE_PROFIT_LOSS}</td>
                                                <td className="px-2 py-1">{result.averageProfitLossPerPosition}</td>
                                                <td className="px-2 py-1">{dictionary.DASH_SHARPE_RATIO}</td>
                                                <td className="px-2 py-1">{result.sharpeRatio}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                }
                            </div>
                        )}
                        {activeTab === 1 && positions.length > 0 && (
                            <div className="w-full overflow-hidden">
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
                                                    <td className="py-1 text-center">{item.profitLoss.toPrecision(3)}</td>
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
                        )}
                        {activeTab === 1 && positions.length === 0 && (
                            <div className="mt-6 text-slate-800">No positions available.</div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

export default TestResults;