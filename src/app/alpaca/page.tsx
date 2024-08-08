import { useTranslations } from 'next-intl';
import AlpacaAssets from "@/components/alpaca/AlpacaAssets";
import AlpacaHistoryChart from '@/components/alpaca/history-charts/AlpacaHistoryChart';
import * as React from 'react';
import "../../app/globals.css";


export default function AlpacaDashboard() {

  const t = useTranslations('Alpaca');
  return (

    <div className="flex h-full items-stretch">
      <div className='overflow-hidden w-1/4 p-2 pr-1'>
        <AlpacaAssets />
      </div>
      <div className='overflow-hidden w-3/4 p-2 pl-1'>
        <AlpacaHistoryChart />
      </div>
    </div>
  );
}