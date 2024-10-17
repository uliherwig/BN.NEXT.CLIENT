"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import { signIn, signOut, useSession } from 'next-auth/react';
import BnButton from '../common/bn-button';
import fetchService, { basicFetch } from '@/app/lib/fetchFunctions';
import test from 'node:test';
import { Position } from '@/models/strategy/position';
import CircularIndeterminate from '../common/CircularLoader';
import LineChart from './history-charts/Linechart';
import { ChartParameters } from '@/models/ChartParameters';
import useSWR, { mutate } from 'swr';
import BarChart from './history-charts/BarChart';
import { format } from 'date-fns';
import CloseIcon from '@mui/icons-material/Close';

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

        const dateOpened = new Date(params.position.stampOpened);
        dateOpened.setDate(dateOpened.getDate() - 3);
        const formattedDateOpened = format(new Date(dateOpened), 'yyyy-MM-dd');
        const dateClosed = new Date(params.position.stampClosed);
         dateClosed.setDate(dateClosed.getDate() + 3);
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
                    <div className='w-[900px] h-[600px]'> {loading ? <CircularIndeterminate /> : <BarChart data={chartData} position={params.position} />}</div>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default ChartPositionModal;