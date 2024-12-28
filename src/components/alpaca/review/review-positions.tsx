"use client";
import { basicFetch } from "@/app/lib/fetchFunctions";
import { StrategySettingsModel } from "@/models/strategy/strategy-settings-model";
import { IconButton } from "@mui/material";
import { useEffect, useState } from 'react';
import { useDictionary } from '@/provider/dictionary-provider';
import { Position } from "@/models/strategy/position";
import { format } from 'date-fns';
import ChartPositionModal from "../chart-position-modal";
import CircularLoader from "@/components/common/loader";
import BarChartIcon from '@mui/icons-material/BarChart';

interface ReviewPositionsProps {
    strategySettings: StrategySettingsModel;
}

const ReviewPositions: React.FC<ReviewPositionsProps> = (params) => {
    const dictionary = useDictionary();
    const [positions, setPositions] = useState<Position[]>([]);
    const [selectedPositions, setSelectedPositions] = useState<Position[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        const id = params.strategySettings.id;
        if (id !== undefined && id !== '') {
            updatePositions(id);
        }
      
    }, [params, params.strategySettings]);

    const updatePositions = async (id: string) => {
        const res = await basicFetch<any>(`/api/strategy/test-positions?testId=${id}`);
        const sortedPositions = res.sort((a: Position, b: Position) => new Date(b.stampClosed).getTime() - new Date(a.stampClosed).getTime());
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
        return <div>Loading...</div>;
    }

    const TABLE_HEAD = ["Side", "Start", "Stop", "Open", "Close", "SL", "TP", "Closed By", "Profit/Loss"];
    return (
        <>
            <ChartPositionModal isOpen={dialogOpen} closeDialog={closeDialog} positions={selectedPositions} />
            <div className="component-container">
                <div className="text-component-head mb-2">Test Positions {params.strategySettings.name}</div>
                {loading && (
                    <CircularLoader />
                )}

                {positions.length > 0 &&
                    <div className="h-[93%] w-full overflow-hidden">
                        <div className="h-full overflow-auto">
                            <table className="min-w-full table-fixed border">
                                <thead className="bg-slate-700 sticky top-[-2px] z-10" >
                                    <tr>
                                        {TABLE_HEAD.map((column) => (
                                            <th key={column} className="px-2 py-1 text-center text-white text-xs">
                                                {column}
                                            </th>
                                        ))}
                                        <th className="px-2 py-1 text-center text-white text-xs" colSpan={2}>
                                            Charts
                                        </th>
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
                                                {item.priceOpen.toFixed(2)}
                                            </td>
                                            <td className=" py-1 text-center">
                                                {item.priceClose.toFixed(2)}
                                            </td>
                                            <td className=" py-1 text-center">
                                                {item.stopLoss.toFixed(2)}
                                            </td>
                                            <td className=" py-1 text-center">
                                                {item.takeProfit.toFixed(2)}
                                            </td>
                                            <td className=" py-1 text-center">
                                                {item.closeSignal}
                                            </td>
                                            <td className={`py-1 text-center ${item.profitLoss > 0 ? 'text-green-500' : item.profitLoss < 0 ? 'text-red-500' : ''}`}>
                                                {item.profitLoss.toPrecision(2)}
                                            </td>
                                            <td className="text-center">
                                                <IconButton aria-label="language" color="primary" onClick={() => createChart(index , 1)}>
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
            </div >
        </>
    );

}

export default ReviewPositions;
