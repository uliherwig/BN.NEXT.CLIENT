
import React, { use, useEffect, useState } from 'react';
import { alpacaDataService } from '../../service/alpacaDataService';
import LineChart from './Linechart';
import { BnOhlc } from '@/model/BnOhlc';



const AlpacaHistoryChart = async () => {


    const data = await alpacaDataService.getHistoricalBars('SPY', '2024-02-01', '2024-02-02', '1Min');

    return (
        <div className='flex h-full items-stretch bg-white rounded-lg p-3'>
             <LineChart data={data} />
            {/* <div className="flex flex-col w-full">
                <div className="w-full flex  justify-between" >
                    <div className=" text-blue-900 text-lg font-bold">Assets</div>
                    <div className='flex flex-'>
                        <input
                            type="text"
                            className="w-[150px] border border-violet-400 rounded-md p-0.5 text-blue-900"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="h-full w-full  overflow-hidden pt-5">
                    <LineChart data={chartData} />
                </div>
            </div> */}
        </div>


    );
};


export default AlpacaHistoryChart;