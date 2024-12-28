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
import { TestResult } from "@/models/strategy/test-result";

interface ReviewTestResultProps {
    settings: StrategySettingsModel;
}

const ReviewTestResult: React.FC<ReviewTestResultProps> = (params) => {


    const dictionary = useDictionary();
    const [selectedPosition, setSelectedPosition] = useState<Position>({} as Position);
    const [result, setResult] = useState<TestResult>({} as TestResult);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        const id = params.settings.id;
        if (id !== undefined && id !== '') {    
            updateResult(id);           
        }
         setLoading(false);
    }, [params, params.settings]);

    const updateResult = async (id: string) => {
        const res = await basicFetch<any>(`/api/strategy/test-result?testId=${id}`);
        setResult(res);
    }
 

    if (!dictionary) {
        return <div>Loading...</div>;
    }

    const TABLE_HEAD = ["Side", "Start", "Stop", "Signal", "Profit/Loss", "Actions"];
    return (
        <>    
            <div className="component-container">
                <div className="text-component-head mb-2">Test Result {params.settings.name}</div>
                {loading && (
                    <CircularLoader />
                )}
                 {!loading && (
                <div className="h-[17%] w-full">

                    {!loading && result.id == undefined && <div className="mt-6 text-slate-800">Please select a strategy. </div>}

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
      
            </div >
          
        </>
    );

}

export default ReviewTestResult;
