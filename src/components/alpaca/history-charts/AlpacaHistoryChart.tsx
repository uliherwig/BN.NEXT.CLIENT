
"use client"
import React, { Suspense, use, useEffect, useState } from 'react';
import LineChart from './Linechart';
import { BnOhlc } from '@/models/BnOhlc';
import useSWR, { mutate } from 'swr';
import CircularLoader from '@/components/common/loader';
import { ChartParameters } from '@/models/ChartParameters';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const AlpacaHistoryChart = () => {

    const [params, setParameters] = useState<ChartParameters>({
        symbol: 'SPY',
        startDate: '2024-02-01',
        endDate: '2024-02-02',
        timeFrame: '1Min'
    });

    const url = `/api/alpaca/bars?symbol=${params.symbol}&startDate=${params.startDate}&endDate=${params.endDate}&timeFrame=${params.timeFrame}`;

    // Use the constructed URL in the useSWR hook
    const { data, error, isLoading } = useSWR(url, fetcher);

    useEffect(() => {
        console.log('data:', data);
    }, [data])


    if (error) return <div className='flex h-full items-stretch bg-white rounded-lg p-3'>Error loading data</div>;

    function loadChartData(): void {
        mutate('/api');
    }

    return (
        <div className='flex flex-col h-full w-full bg-white rounded-lg p-3'>
            <div className='w-full h-1/6 border-b border-slate-800'>
                <h1 className="text-blue-900 text-lg font-bold">Alpaca History Chart</h1>
                <div className='py-4'>
                    <select
                        className="w-[150px] mr-4 border border-violet-400 rounded-md p-0.5 pl-2 text-blue-900"
                        title="Select Asset"
                        value={params.symbol}
                        onChange={(e) => setParameters({ ...params, symbol: e.target.value })}
                    >
                        <option value="SPY">SPY</option>
                        <option value="AAPL">AAPL</option>
                        <option value="HYS">HYS</option>
                    </select>
                    <input
                        type="date"
                        className="w-[150px] mr-4 border border-violet-400 rounded-md p-0.5 pl-2 text-blue-900"
                        placeholder='Start Date'
                        value={params.startDate}
                        onChange={(e) => setParameters({ ...params, startDate: e.target.value })}
                    />
                    <input
                        type="date"
                        className="w-[150px] mr-4 border border-violet-400 rounded-md p-0.5 pl-2 text-blue-900"
                        placeholder='End Date'
                        value={params.endDate}
                        onChange={(e) => setParameters({ ...params, endDate: e.target.value })}
                    />
                    <select className="w-[150px] mr-4 border border-violet-400 rounded-md p-0.5 pl-2 text-blue-900" title="Select Time Frame">
                        <option value="Minute">Minute</option>
                        <option value="Hour">Hour</option>
                        <option value="Day">Day</option>
                        <option value="Week">Week</option>
                        <option value="Month">Month</option>
                    </select>
                    <input
                        type="button"
                        className="w-[150px] mr-4 border border-violet-400 rounded-md p-0.5 pl-2 text-blue-900"
                        value="Load"
                        onClick={(e) => loadChartData()}
                    />
                </div>
            </div>
            <div className='w-full flex-grow'>
                {isLoading ? <CircularLoader /> : <LineChart data={data} />}
            </div>
        </div>
    );
};


export default AlpacaHistoryChart;