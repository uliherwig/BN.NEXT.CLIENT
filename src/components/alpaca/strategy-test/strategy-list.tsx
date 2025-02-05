"use client";
import { basicFetch } from "@/app/lib/fetchFunctions";
import { BreakoutPeriodEnum, StrategyEnum } from "@/models/strategy/enums";
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import { IconButton, Tooltip } from "@mui/material";
import { useEffect, useState } from 'react';
import { useDictionary } from '@/provider/dictionary-provider';
import { firstOrDefault } from "@/utilities";
import { StrategySettings } from "@/models/strategy/strategy-settings";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularLoader from "@/components/common/loader";
import StrategyListBreakout from "./strategy-list-breakout";
import StrategyListSMA from "./strategy-list-sma";
import React from "react";

interface StrategyListProps {
    showResult: any;
    hasUpdate: boolean;
    showBookmarked?: boolean;
}

const StrategyList: React.FC<StrategyListProps> = ({ showResult, hasUpdate, showBookmarked }) => {

    const dictionary = useDictionary();
    const [strategies, setStrategies] = useState<StrategySettings[]>([]);
    const [selectedStrategy, setSelectedStrategy] = useState<StrategySettings>({} as StrategySettings);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        updateTests();
    }, [hasUpdate]);

    const updateTests = async () => {
        const strats = await basicFetch<StrategySettings[]>(`/api/strategy/list?bookmarked=${showBookmarked}`);
        setStrategies(strats);
        const latestStrategy = firstOrDefault(strats, {} as StrategySettings);
        if (latestStrategy) {
            setSelectedStrategy(latestStrategy);
            showResult(latestStrategy);
        }
        setLoading(false);
    }

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
        updateTests();
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
        updateTests();
    }

    const displayDetails = (strategy: StrategySettings) => {
        setSelectedStrategy(strategy);
        showResult(strategy);
    }




    const TABLE_HEAD = [
        dictionary.DASH_TYPE,
        dictionary.DASH_ASSET,
        dictionary.DASH_TP_PERCENT,
        dictionary.DASH_TRAILING_STOP_PERCENT,
        dictionary.DASH_OVERNIGHT
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
                        {strategies.length === 0 && <div className="mt-5 text-slate-800">{dictionary.DASH_NO_TESTS_AVAILABLE}</div>}

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
                                        <th className="px-4 py-1 w-11 text-right text-white text-xs">
                                            {dictionary.DASH_ACTIONS}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='text-slate-900 text-sm overflow-y'>
                                    {strategies.map((item, index) => (
                                        <React.Fragment key={item.id}>
                                            <tr className={`hover:bg-zinc-200 ${index % 2 === 1 ? 'bg-gray-100' : 'bg-white'} ${selectedStrategy.id === item.id ? 'font-bold border border-t-zinc-900' : ''}`} >
                                                <td className="px-2 py-1 text-left cursor-pointer" onClick={() => displayDetails(item)}>{item.name}</td>
                                                <td className="ppy-1 text-center">
                                                    {StrategyEnum[item.strategyType]}
                                                </td>
                                                <td className="py-1 text-center">{item.asset}</td>
                                                <td className="py-1 text-center">{item.takeProfitPercent}</td>
                                                <td className="py-1 text-center">{item.trailingStop === 0 ? dictionary.DASH_NO : item.trailingStop}</td>
                                                <td className="py-1 text-center">{item.allowOvernight ? dictionary.COMMON_YES : dictionary.COMMON_NO}</td>

                                                <td className="text-right w-[70px]">
                                                    <Tooltip title={dictionary.DASH_BOOKMARK_STRATEGY}>
                                                        <IconButton aria-label="bookmark" color="primary" size="small" onClick={() => bookmarkStrategy(item)}>
                                                            {item.bookmarked ? <BookmarkIcon className="text-slate-800" /> : <BookmarkBorderIcon className="text-slate-800" />}
                                                        </IconButton>
                                                    </Tooltip>

                                                    <Tooltip title={dictionary.DASH_DELETE_STRATEGY}>
                                                        <IconButton aria-label="delete" color="primary" size="small" onClick={() => deleteStrategy(item.id)}>
                                                            <DeleteIcon className="text-slate-800" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </td>
                                            </tr>
                                            <tr className={`border border-b-zinc-900 ${index % 2 === 1 ? 'bg-gray-100' : 'bg-white'}  ${selectedStrategy.id === item.id ? '' : 'hidden'}`} >
                                                <td colSpan={5} className="px-2 py-1 text-left">
                                                    {item.strategyType === StrategyEnum.Breakout && (
                                                        <StrategyListBreakout strategy={item} />
                                                    )}
                                                    {item.strategyType === StrategyEnum.SMA && (
                                                        <StrategyListSMA strategy={item} />
                                                    )}
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

export default StrategyList;