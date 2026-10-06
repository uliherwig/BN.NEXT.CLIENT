"use client";
import { basicFetch } from "@/app/lib/fetchFunctions";
import { IndicatorEnum, StrategyTypeEnum, TimeFrameEnum } from "@/app/models/strategy/enums";
import { IconButton, Tooltip } from "@mui/material";
import { use, useEffect, useState } from 'react';
import { useDictionary } from '@/app/provider/dictionary-provider';
import { firstOrDefault } from "@/app/lib/utilities";
import { StrategySettings } from "@/app/models/strategy/strategy-settings";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularLoader from "@/app/components/common/loader";
import { format } from 'date-fns';


import React from "react";

interface IndicatorTestListProps {
    strategies: StrategySettings[];
    updateStrategies: () => void;
    showResult: (strategy: StrategySettings) => void;
}

const IndicatorTestList: React.FC<IndicatorTestListProps> = ({ strategies, updateStrategies, showResult }) => {
    const iconFontSize = 16;
    const dictionary = useDictionary();

    const [selectedStrategy, setSelectedStrategy] = useState<StrategySettings>({} as StrategySettings);
    const [loading, setLoading] = useState<boolean>(true);
    const [strategyParams, setStrategyParams] = useState<Record<string, string>[] | null>(null);

    useEffect(() => {
        if (strategies.length > 0) {
            setLoading(false);
        }
    }, [strategies]);

    if (!dictionary) {
        return <div>Loading...</div>;
    }

    const bookmarkStrategy = async (strategy: StrategySettings) => {
        strategy.bookmarked = !strategy.bookmarked;

        var endpoint = '/api/strategy';

        const options: RequestInit = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(strategy)
        };

        const res = await fetch(endpoint, options);
        if (res.ok) {
            toast.success(dictionary.DASH_BOOKMARK_SUCCESS);
        } else {
            toast.error(dictionary.DASH_BOOKMARK_FAILURE);
        }
    }

    const deleteStrategy = async (id: string) => {
        var endpoint = `/api/strategy?testId=${id}`;
        const options: RequestInit = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const res = await fetch(endpoint, options);
        if (res.ok) {
            toast.success(dictionary.DASH_DELETE_SUCCESS);
        } else {
            toast.error(dictionary.DASH_DELETE_FAILURE);
        }
        if (updateStrategies) {
            updateStrategies();
        }
    }

    const selectStrategy = (strategy: StrategySettings) => {

        setSelectedStrategy(strategy);

        let params: Record<string, string>[] = [];
        try {
            const parsed = JSON.parse(strategy.strategyParams);

            if (Array.isArray(parsed)) {
                // If already array, extract key as per requirement
                params = parsed.map((p: any) => ({
                    key: p.name && typeof p.name === "string" && p.name.includes("_")
                        ? p.name.split("_")[1].toUpperCase()
                        : p.key ?? p.name ?? "",
                    value: String(p.value),
                }));
            } else if (parsed && typeof parsed === "object") {
                params = Object.entries(parsed).map(([name, value]) => ({
                    key: name.includes("_") ? name.split("_")[1].toUpperCase() : name.toUpperCase(),
                    value: String(value),
                }));
            }
        } catch (e) {
            console.error("Failed to parse strategyParams", e);
        }

        setStrategyParams(params);
        showResult(strategy);
    }

    const TABLE_HEAD = [
        dictionary.DASH_TYPE,
        dictionary.DASH_ASSET,
        dictionary.TEST_QUANTITY,
        dictionary.TEST_SL,
        dictionary.TEST_TP,

    ];

    return (
        <div className="component-container">
            <div className="text-component-head mb-2">{dictionary.DASH_STRATEGIES}</div>
            <div className="h-[95%] w-full overflow-hidden">
                {loading && (
                    <CircularLoader />
                )}
                {!loading && (
                    <div className="h-full overflow-auto">

                        {strategies.length < 1 && <div className="mt-5 text-slate-800">{dictionary.DASH_NO_TESTS_AVAILABLE}</div>}

                        {strategies.length > 0 &&
                            <table className="min-w-full table-fixed border">
                                <thead className="bg-slate-700 sticky top-[-2px] z-50">
                                    <tr>
                                        <th className="px-2 py-1 text-left text-white text-xs">
                                            {dictionary.DASH_NAME}
                                        </th>
                                        {TABLE_HEAD.map((column) => (
                                            <th key={column} className="px-2 py-1 text-center text-white text-xs">
                                                {column}
                                            </th>
                                        ))}
                                        <th className="px-2 py-1 w-[20px] text-center text-white text-xs" colSpan={2}>
                                            {dictionary.DASH_ACTIONS}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='text-slate-900 text-sm overflow-y'>
                                    {strategies.map((item, index) => (
                                        <React.Fragment key={item.id}>
                                            <tr className={`hover:bg-zinc-200 
                                            ${index % 2 === 1 ? 'bg-gray-100' : 'bg-white'} 
                                            ${selectedStrategy.id === item.id ? 'font-bold border border-t-zinc-900 bg-lime-200' : ''}`}
                                                onClick={() => selectStrategy(item)}>

                                                <td className="px-2 py-1 text-left cursor-pointer">{item.name}</td>
                                                <td className="ppy-1 text-center">
                                                    {IndicatorEnum[item.indicatorType]}
                                                </td>
                                                <td className="py-1 text-center">{item.asset}</td>
                                                <td className="py-1 text-center">{item.quantity}</td>
                                                <td className="py-1 text-center">{item.stopLossPercent*100}%</td>
                                                <td className="py-1 text-center">{item.takeProfitPercent*100}%</td>
                                                <td className="text-center w-1">
                                                    <Tooltip title={dictionary.DASH_BOOKMARK_STRATEGY}>
                                                        <IconButton aria-label="bookmark" className="w-[20px] h-[20px]" onClick={() => bookmarkStrategy(item)}>
                                                            {item.bookmarked ? <BookmarkIcon className="text-slate-800" style={{ fontSize: iconFontSize }} /> : <BookmarkBorderIcon className="text-slate-800" style={{ fontSize: iconFontSize }} />}
                                                        </IconButton>
                                                    </Tooltip>
                                                </td>
                                                <td className="text-center w-1">

                                                    <Tooltip title={dictionary.DASH_DELETE_STRATEGY}>
                                                        <IconButton aria-label="delete" className="w-[20px] h-[20px]" color="primary" size="small" onClick={() => deleteStrategy(item.id)}>
                                                            <DeleteIcon className="text-slate-800" style={{ fontSize: iconFontSize }} />
                                                        </IconButton>
                                                    </Tooltip>
                                                </td>
                                            </tr>
                                            <tr className={`border border-b-zinc-900 ${index % 2 === 1 ? 'bg-gray-100' : 'bg-white'}  ${selectedStrategy.id === item.id ? '' : 'hidden'}`} >
                                                <td colSpan={9} className="p-2">

                                                    <div className="grid grid-cols-3 w-full h-fit gap-1">
                                                        <div className="bg-gray-300  p-1">Broker: {item.broker}</div>
                                                        <div className="bg-gray-300 p-1 ">{dictionary.TEST_TIME_FRAME}: {TimeFrameEnum[item.timeFrame]}</div>


                                                        <div className="bg-gray-300 p-1  text-center ">{format(new Date(item.startDate), 'dd.MM.yy')}-{format(new Date(item.endDate), 'dd.MM.yy')}</div>
                                                        <div className="bg-gray-300 p-1">Spread: {item.spreadPerTrade}</div>

                                                        <div className="bg-gray-300 p-1 ">Overnight Fee: {item.overnightFeeRate}</div>


                                                        <div className="bg-gray-300 p-1 ">Close EoD: {item.closePositionEod.toString()}</div>
                                                        {strategyParams && strategyParams.length > 0 && strategyParams.map(p => (
                                                            <div key={p.key} className="bg-gray-300 p-1 ">{p.key}: {p.value}</div>
                                                        ))}






                                                    </div>
                                                </td>

                                            </tr>
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>}
                    </div>)}
            </div>
            <ToastContainer position="bottom-right"
                autoClose={2500}
                hideProgressBar={true}
                closeOnClick
                theme="colored" />
        </div>
    );
}

export default IndicatorTestList;