import { useTranslations } from 'next-intl';
import AlpacaHistoryChart from '@/components/alpaca/history-charts/AlpacaHistoryChart';
import * as React from 'react';
import "../../globals.css";
import AlpacaAssets from '@/components/alpaca/assets/AlpacaAssets';


export default function AlpacaDashboard() {

  const t = useTranslations('Alpaca');
  return (


    <div className="flex">
      <div className="col-span-1">
        <AlpacaAssets />
      </div>
      <div className="col-span-1">
        <AlpacaHistoryChart />
      </div>
    </div>

  );
}