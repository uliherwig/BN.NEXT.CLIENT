"use client";
import { basicFetch } from "@/app/lib/fetchFunctions";
import { StrategySettings } from "@/models/strategy/strategy-settings";
import { IconButton } from "@mui/material";
import { useEffect, useState } from 'react';
import { useDictionary } from '@/provider/dictionary-provider';
import { PositionModel } from "@/models/strategy/position-model";
import { format } from 'date-fns';
import ChartPositionModal from "../chart-position-modal";
import CircularLoader from "@/components/common/loader";
import BarChartIcon from '@mui/icons-material/BarChart';
import { SideEnum } from "@/models/strategy/enums";

interface ReviewPositionsProps {
    strategySettings: StrategySettings;
}

const ReviewPositions: React.FC<ReviewPositionsProps> = (params) => {
    const dictionary = useDictionary();
    const [positions, setPositions] = useState<PositionModel[]>([]);
    const [selectedPositions, setSelectedPositions] = useState<PositionModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        const id = params.strategySettings.id;
        if (id !== undefined && id !== '') {
            updatePositions(id);
        }
        setLoading(false);
    }, [params, params.strategySettings]);

    const updatePositions = async (id: string) => {
        const res = await basicFetch<any>(`/api/strategy/test-positions?testId=${id}`);
        const sortedPositions = res.sort((a: PositionModel, b: PositionModel) => new Date(b.stampClosed).getTime() - new Date(a.stampClosed).getTime());
        setPositions(sortedPositions);
        setLoading(false);
    }

    const [dialogOpen, setDialogOpen] = useState(false);

    const closeDialog = () => {
        setDialogOpen(false);
    };

    const createChart = (index: number, numberOfPositions: number) => {
        const positionsToChart = positions.slice(index, index + numberOfPositions);
        setSelectedPositions(positionsToChart);
        setDialogOpen(true);
    }
    
    if (!dictionary) {
        return <div>{"Loading..."}</div>;
    }

    const TABLE_HEAD = [
        dictionary.DASH_SIDE,
        dictionary.DASH_START,
        dictionary.DASH_STOP,
        dictionary.TEST_OPEN,
        dictionary.TEST_CLOSE,
        dictionary.TEST_SL,
        dictionary.TEST_TP,
        dictionary.TEST_CLOSED_BY,
        dictionary.DASH_PROFIT_LOSS
    ];

    return (
        <>
            <ChartPositionModal isOpen={dialogOpen} closeDialog={closeDialog} positions={selectedPositions} />
            <div className="component-container">
                <div className="text-component-head mb-2">{dictionary.TEST_POSITIONS} {params.strategySettings.name}</div>
                {loading && (
                    <CircularLoader />
                )}

                {positions.length > 0 &&
                    <div className="h-[93%] w-full overflow-hidden">
                        <div className="h-full overflow-auto">
                            <table className="min-w-full table-fixed border">
                                <thead className="bg-slate-700 sticky top-[-2px] z-10">
                                    <tr>
                                        {TABLE_HEAD.map((column) => (
                                            <th key={column} className="px-2 py-1 text-center text-white text-xs">
                                                {column}
                                            </th>
                                        ))}
                                        <th className="px-2 py-1 text-center text-white text-xs" colSpan={2}>
                                            {dictionary.TEST_CHARTS}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='text-slate-800 text-sm overflow-y'>
                                    {positions.map((item, index) => (
                                        <tr key={item.id} className={`hover:bg-zinc-200 ${index % 2 === 1 ? 'bg-gray-100' : 'bg-white'}`}>
                                            <td className="px-2 py-1 text-center">{item.side === SideEnum.Buy ? dictionary.DASH_BUY : dictionary.DASH_SELL}</td>
                                            <td className="py-1 text-center">{format(new Date(item.stampOpened), 'dd.MM.yy HH:mm')}</td>
                                            <td className="py-1 text-center">{format(new Date(item.stampClosed), 'dd.MM.yy HH:mm')}</td>
                                            <td className="py-1 text-center">{item.priceOpen.toFixed(2)}</td>
                                            <td className="py-1 text-center">{item.priceClose.toFixed(2)}</td>
                                            <td className="py-1 text-center">{item.stopLoss.toFixed(2)}</td>
                                            <td className="py-1 text-center">{item.takeProfit.toFixed(2)}</td>
                                            <td className="py-1 text-center">{item.closeSignal}</td>
                                            <td className={`py-1 text-center ${item.profitLoss > 0 ? 'text-green-500' : item.profitLoss < 0 ? 'text-red-500' : ''}`}>
                                                {item.profitLoss.toPrecision(2)}
                                            </td>
                                            <td className="text-center">
                                                <IconButton aria-label="language" color="primary" onClick={() => createChart(index, 1)}>
                                                    <BarChartIcon className='text-slate-800' />
                                                </IconButton>
                                            </td>
                                            {index % 5 === 0 &&
                                                <td className="text-center" rowSpan={5}>
                                                    <IconButton aria-label="language" color="primary" onClick={() => createChart(index, 5)}>
                                                        <BarChartIcon className='text-slate-800' />
                                                    </IconButton>
                                                </td>
                                            }
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

export default ReviewPositions;