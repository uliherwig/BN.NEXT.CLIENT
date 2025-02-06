"use client";

import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { basicFetch } from '@/app/lib/fetchFunctions';
import { PositionModel } from '@/models/strategy/position-model';
import CircularLoader from '../common/loader';
import PositionChartBreakout from './history-charts/position-chart-breakout';
import { format } from 'date-fns';
import CloseIcon from '@mui/icons-material/Close';
import { StrategyEnum } from '@/models/strategy/enums';
import PositionChartSMA from './history-charts/position-chart-sma';

interface ChartPositionModalProps {
    isOpen: boolean;
    closeDialog: Function;
    positions: PositionModel[];

}

const ChartPositionModal: React.FC<ChartPositionModalProps> = (params) => {

    const [loading, setLoading] = useState(true);
    const [chartData, setChartData] = useState<any[]>([]);
    const [strategyType, setStrategyType] = useState<StrategyEnum>(StrategyEnum.None);

    useEffect(() => {
        const getChartData = async () => {
            setLoading(true);
            let dateOpened = new Date(params.positions[params.positions.length - 1].stampOpened);

            if (params.positions[0].strategyType === StrategyEnum.Breakout) {
                var breakoutParams = JSON.parse(params.positions[params.positions.length - 1].strategyParams);
                const prevLowStamp = new Date(breakoutParams.PrevLowStamp);
                const prevHighStamp = new Date(breakoutParams.PrevHighStamp);
                dateOpened = (prevLowStamp > prevHighStamp) ? new Date(prevHighStamp) : new Date(prevLowStamp);
            }

            dateOpened.setDate(dateOpened.getDate() - 1);
            const dateClosed = new Date(params.positions[0].stampClosed);
            dateClosed.setDate(dateClosed.getDate() + 1);

            const formattedDateOpened = format(new Date(dateOpened), 'yyyy-MM-dd');
            const formattedDateClosed = format(new Date(dateClosed), 'yyyy-MM-dd');

            const result = await basicFetch<any>(`/api/alpaca/bars?symbol=${params.positions[0].symbol}&startDate=${formattedDateOpened}&endDate=${formattedDateClosed}&timeFrame=1Min`);
            setChartData(result);
            setStrategyType(params.positions[0].strategyType);
            setLoading(false);
        }
        if (params.isOpen) {

            getChartData();
        }
    }, [params.isOpen, params.positions]);



    return (
        <>
            <Dialog
                maxWidth='lg'
                open={params.isOpen}
                onClose={() => params.closeDialog(false)} >
                <DialogTitle>
                    <div className="flex justify-between items-center">
                        <span>CHART</span>
                        <IconButton onClick={() => params.closeDialog(false)}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent className='flex justify-center items-center'>
                    {strategyType === StrategyEnum.Breakout && <>
                        <div className='w-[900px] h-[600px]'> {loading ? <CircularLoader /> : <PositionChartBreakout data={chartData} positions={params.positions} />}</div>
                    </>}
                    {strategyType === StrategyEnum.SMA && <>
                        <div className='w-[900px] h-[600px]'> {loading ? <CircularLoader /> : <PositionChartSMA data={chartData} positions={params.positions} />}</div>
                    </>}

                </DialogContent>
            </Dialog>
        </>
    );
}

export default ChartPositionModal;