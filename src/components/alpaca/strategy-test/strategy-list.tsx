"use client";
import { basicFetch } from "@/app/lib/fetchFunctions";
import { BreakoutPeriodEnum, StrategyEnum } from "@/models/strategy/enums";
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import { IconButton, Tooltip } from "@mui/material";
import { useEffect, useState } from 'react';
import { useDictionary } from '@/provider/dictionary-provider';
import { firstOrDefault } from "@/utilities";
import { StrategySettingsModel } from "@/models/strategy/strategy-settings-model";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularLoader from "@/components/common/loader";
import StrategyListBreakout from "./strategy-list-breakout";
import StrategyListSMA from "./strategy-list-sma";

interface StrategyListProps {
    showResult: any;
    hasUpdate: boolean;
}

const StrategyList: React.FC<StrategyListProps> = ({ showResult, hasUpdate }) => {

    const dictionary = useDictionary();
    const [strategies, setStrategies] = useState<StrategySettingsModel[]>([]);
    const [selectedStrategy, setSelectedStrategy] = useState<StrategySettingsModel>({} as StrategySettingsModel);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        updateTests();
    }, [hasUpdate]);

    const updateTests = async () => {
        const strats = await basicFetch<StrategySettingsModel[]>(`/api/strategy?bookmarked=false`);
        setStrategies(strats);
        const latestStrategy = firstOrDefault(strats, {} as StrategySettingsModel);
        if (latestStrategy) {
            setSelectedStrategy(latestStrategy);
            showResult(latestStrategy);
        }
        setLoading(false);
    }

    const bookmarkStrategy = async (strategy: StrategySettingsModel) => {
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
            toast.success('Strategy bookmark changed successfully!');
        } else {
            toast.error('Failed to change bookmark.');
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
            toast.success('Strategy deleted successfully!');
        } else {
            toast.error('Failed to delete strategy.');
        }
        updateTests();
    }

    const displayDetails = (strategy: StrategySettingsModel) => {
        setSelectedStrategy(strategy);
        showResult(strategy);
    }

    if (!dictionary) {
        return <div>Loading...</div>;
    }

    const TABLE_HEAD = ["Type", "Asset", "TP(%)", "Trail. Stop(%)", "Overnight"];
    return (
        <div className="component-container">
            <div className="text-component-head mb-2">Strategies</div>
            <div className="h-[95%] w-full overflow-hidden">
                {loading && (
                    <CircularLoader />
                )}
                {!loading && (

                    <div className="h-full overflow-auto">
                        {strategies.length === 0 && <div className="mt-5 text-slate-800">Es sind keine Tests verfügbar. Starten Sie Ihren ersten Test.</div>}

                        {strategies.length > 0 &&
                            <table className="min-w-full table-fixed border">
                                <thead className="bg-slate-700 sticky top-[-2px] z-50">
                                    <tr>
                                        <th className="px-2 py-1  text-left text-white text-xs">
                                            Name
                                        </th>
                                        {TABLE_HEAD.map((column) => (
                                            <th key={column} className="px-2 py-1 text-center text-white text-xs">
                                                {column}
                                            </th>
                                        ))}
                                        <th className="px-4 py-1 w-11 text-right text-white text-xs">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='text-slate-900 text-sm overflow-y' >
                                    {strategies.map((item, index) => (
                                        <>
                                            <tr key={item.id} className={`hover:bg-zinc-200 ${index % 2 === 1 ? 'bg-gray-100' : 'bg-white'} ${selectedStrategy.id === item.id ? 'font-bold border border-t-zinc-900' : ''}`} >
                                                <td className="px-2 py-1 text-left cursor-pointer" onClick={() => displayDetails(item)}>{item.name}</td>
                                                <td className="ppy-1 text-center">
                                                    {StrategyEnum[item.strategyType]}
                                                </td>
                                                <td className=" py-1 text-center">{item.asset}</td>
                                                <td className=" py-1 text-center">{item.takeProfitPercent}</td>
                                                <td className=" py-1 text-center">{item.trailingStop === 0 ? 'No' : item.trailingStop }</td>
                                                <td className=" py-1 text-center">{item.allowOvernight ? 'Yes' : 'No'}</td>

                                                <td className="text-right">
                                                    <Tooltip title="Bookmark Strategy">
                                                        <IconButton aria-label="bookmark" color="primary" size="small" onClick={() => bookmarkStrategy(item)}>
                                                            {item.bookmarked ? <BookmarkIcon className="text-slate-800" /> : <BookmarkBorderIcon className="text-slate-800" />}
                                                        </IconButton>
                                                    </Tooltip>

                                                    <Tooltip title="Delete Strategy">
                                                        <IconButton aria-label="delete" color="primary" size="small" onClick={() => deleteStrategy(item.id)}>
                                                            <DeleteIcon className="text-slate-800" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </td>
                                            </tr>
                                            <tr key={item.id + '2'} className={`border border-b-zinc-900 ${index % 2 === 1 ? 'bg-gray-100' : 'bg-white'}  ${selectedStrategy.id === item.id ? '' : 'hidden'} `} >
                                                <td colSpan={5} className="px-2 py-1 text-left">
                                                    {item.strategyType === StrategyEnum.Breakout && (
                                                        <StrategyListBreakout strategy={item} />
                                                    )}
                                                    {item.strategyType === StrategyEnum.SimpleMovingAverage && (
                                                        <StrategyListSMA strategy={item} />
                                                    )}

                                                </td>
                                            </tr>
                                        </>
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
