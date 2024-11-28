"use client";

import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { basicFetch } from '@/app/lib/fetchFunctions';
import { Position } from '@/models/strategy/position';
import CircularLoader from '../common/loader';
import PositionChartBreakout from './history-charts/position-chart-breakout';
import { format } from 'date-fns';
import CloseIcon from '@mui/icons-material/Close';
import { StrategyEnum } from '@/models/strategy/enums';

interface ChartPositionModalProps {
    isOpen: boolean;
    closeDialog: Function;
    position: Position;

}

const ChartPositionModal: React.FC<ChartPositionModalProps> = (params) => {

    const [loading, setLoading] = useState(true);
    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        if (params.isOpen) {
            getChartData();
        }
    }, [params.isOpen]);


    const getChartData = async () => {
        setLoading(true);

        let dateOpened = new Date(params.position.stampOpened);

        if (params.position.strategyType === StrategyEnum.Breakout) {

            var breakoutParams = JSON.parse(params.position.strategyParams);
            const prevLowStamp = new Date(breakoutParams.PrevLowStamp);
            const prevHighStamp = new Date(breakoutParams.PrevHighStamp);
            dateOpened = (prevLowStamp > prevHighStamp) ? new Date(prevHighStamp) : new Date(prevLowStamp);

        }

        dateOpened.setDate(dateOpened.getDate() - 10);

        const formattedDateOpened = format(new Date(dateOpened), 'yyyy-MM-dd');
        const dateClosed = new Date(params.position.stampClosed);
        dateClosed.setDate(dateClosed.getDate() + 10);
        const formattedDateClosed = format(new Date(dateClosed), 'yyyy-MM-dd');

        console.log('dateOpened:', formattedDateOpened, 'dateClosed:', formattedDateClosed);
        const result = await basicFetch<any>(`/api/alpaca/bars?symbol=${params.position.symbol}&startDate=${formattedDateOpened}&endDate=${formattedDateClosed}&timeFrame=1Min`);
        setChartData(result);
        setLoading(false);
    }



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
                <DialogContent>
                    {params.position.strategyType === StrategyEnum.Breakout && <>
                        <div className='w-[900px] h-[600px]'> {loading ? <CircularLoader /> : <PositionChartBreakout data={chartData} position={params.position} />}</div>
                    </>}

                </DialogContent>
            </Dialog>
        </>
    );
}

export default ChartPositionModal;