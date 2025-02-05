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
import { TestResult } from "@/models/strategy/test-result";

interface ReviewTestResultProps {
    settings: StrategySettings;
}

const ReviewTestResult: React.FC<ReviewTestResultProps> = (params) => {
    const dictionary = useDictionary();
    const [selectedPosition, setSelectedPosition] = useState<PositionModel>({} as PositionModel);
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
            <div className="component-container">
                <div className="text-component-head mb-2">{dictionary.DASH_TEST_RESULT} {params.settings.name}</div>
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
            </div>
        </>
    );
}

export default ReviewTestResult;