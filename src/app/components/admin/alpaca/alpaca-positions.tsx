"use client";
import { useEffect, useState } from 'react';
import { useDictionary } from '@/app/provider/dictionary-provider';
import CircularLoader from "@/app/components/common/loader";
import { AlpacaStrategyTracking } from '@/app/models/alpaca/alpaca-strategy-tracking';
import { basicFetch } from '@/app/lib/fetchFunctions';
import { PositionModel } from "@/app/models/strategy/position-model";
import { TestResult } from "@/app/models/strategy/test-result";
import BarChartIcon from '@mui/icons-material/BarChart';
import { SideEnum } from "@/app/models/strategy/enums";
import { format, parseISO } from "date-fns";


interface AlpacaPositionsProps {
    selectedStrategy: AlpacaStrategyTracking | null;
}



const AlpacaPositions: React.FC<AlpacaPositionsProps> = ({selectedStrategy}) => {
    const dictionary = useDictionary();
    const [loading, setLoading] = useState<boolean>(true);
    const [positions, setPositions] = useState<PositionModel[]>([]);
    const [selectedPosition, setSelectedPosition] = useState<PositionModel>({} as PositionModel);
    const [result, setResult] = useState<TestResult>({} as TestResult);


    useEffect(() => {
        setLoading(true);
        if (selectedStrategy != null) {
            updatePositions(selectedStrategy.id)
            updateResult(selectedStrategy.id)
        }




        setLoading(false);
    }, [selectedStrategy]);

    const updateResult = async (id: string) => {
        const res = await basicFetch<any>(`/api/admin/alpaca/results?method=results&id=${id}`);

        setResult(res);
    }

    const updatePositions = async (id: string) => {
        const res = await basicFetch<any>(`/api/admin/alpaca/results?method=positions&id=${id}`);

        const sortedPositions = res.sort((a: PositionModel, b: PositionModel) => new Date(b.stampClosed).getTime() - new Date(a.stampClosed).getTime());
        setPositions(sortedPositions);
    }






    if (!dictionary) {
        return <div>{"Loading..."}</div>;
    }

    const TABLE_HEAD = [
        dictionary.DASH_SIDE,
        dictionary.DASH_START,
        dictionary.DASH_STOP,    
        dictionary.DASH_PROFIT_LOSS
    ];


    // Tab state: 0 = Summary, 1 = Positions
    const [activeTab, setActiveTab] = useState(0);

    return (
        <>
            <div className="component-container">
                <div className="text-component-head mb-2">{dictionary.DASH_TEST_RESULT} {selectedStrategy != null && selectedStrategy.name}</div>
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
                                                <td className="px-2 py-1">{result.averageProfitLossPerPosition.toFixed(3)}</td>
                                                <td className="px-2 py-1">{dictionary.DASH_SHARPE_RATIO}</td>
                                                <td className="px-2 py-1">{result.sharpeRatio.toFixed(3)}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                }
                            </div>
                        )}
                        {activeTab === 1 && positions.length > 0 && (
                            <div className="w-full h-[600px] overflow-y-auto">
                                <table className="min-w-full table-fixed border">
                                    <thead className="bg-slate-700 sticky top-0 z-50">
                                        <tr>
                                            {TABLE_HEAD.map((column) => (
                                                <th key={column} className="px-2 py-1 text-center text-white text-xs">
                                                    {column}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className='text-slate-800 text-sm'>
                                        {positions.map((item, index) => (
                                            <tr key={item.id} className={`hover:bg-zinc-200 ${index % 2 === 1 ? 'bg-gray-100' : 'bg-white'}`}>
                                                <td className="px-2 py-1 text-center">{item.side === SideEnum.Buy ? dictionary.DASH_BUY : dictionary.DASH_SELL}</td>
                                                <td className="py-1 text-center">{format(parseISO(item.stampOpened), "d.MM.yy HH:mm")}</td>
                                                <td className="py-1 text-center">{format(parseISO(item.stampClosed), 'dd.MM.yy HH:mm')}</td>
                                                <td className="py-1 text-center">{item.profitLoss}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
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

export default AlpacaPositions;