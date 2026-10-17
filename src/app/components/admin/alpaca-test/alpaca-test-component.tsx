"use client";
import { useEffect, useMemo, useState } from 'react';
import { useDictionary } from '@/app/provider/dictionary-provider';
import { Group, Panel } from 'react-resizable-panels';
import { StrategySettingsDto } from '@/app/models/strategy/strategy-settings-dto';

import { AlpacaStrategyTracking } from '@/app/models/alpaca/alpaca-strategy-tracking';
import AlpacaLastTrade from './alpaca-last-trade';
import { fetcher } from '@/app/lib/fetchFunctions';
import useSWR from 'swr';
import AlpacaCreateOrder from './alpaca-create-order';

const AlpacaTestComponent: React.FC = () => {
    const dictionary = useDictionary();


    const { data: assets } = useSWR("/api/alpaca/assets", fetcher);

    const assetOptions = useMemo(() => {
        if (!assets) return [];

        const firstEntry = { symbol: "", name: "Select an Asset" };

        return [firstEntry, ...assets].map(asset => ({
            label: asset.name,
            value: asset.symbol,
        }));
    }, [assets]);

    return (

        <Group>
            <Panel defaultSize={20}>

                <div className=" w-full flex flex-col h-full  gap-0.5">
                    <div className="h-1">
                        <div className="component-container"><div className="text-component-head mb-2">Alpaca Tests</div></div>
                    </div>
                    <div className="h-1/2">

                        <AlpacaLastTrade assetOptions={assetOptions} />
                    </div>
                    <div className="h-1/2 w-full">
                        <AlpacaCreateOrder assetOptions={assetOptions} />
                    </div>
                </div>

            </Panel>
            <div className="w-px h-full bg-slate-400" />
            <Panel defaultSize={30}>

            </Panel>
            <div className="w-px h-full bg-slate-400" />
            <Panel defaultSize={50}>

            </Panel>
        </Group>

    );

}

export default AlpacaTestComponent;