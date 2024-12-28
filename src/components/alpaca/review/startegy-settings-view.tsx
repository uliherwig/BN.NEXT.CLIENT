"use client";
import { useEffect, useState } from 'react';
import { useDictionary } from '@/provider/dictionary-provider';
import 'react-toastify/dist/ReactToastify.css';
import CircularLoader from "@/components/common/loader";
import { StrategySettingsModel } from '@/models/strategy/strategy-settings-model';
import { StrategyEnum } from '@/models/strategy/enums';
import { format } from 'date-fns';
import StrategyListBreakout from '../strategy-test/strategy-list-breakout';
import StrategyListSMA from '../strategy-test/strategy-list-sma';

interface StrategySettingsViewProps {
    settings: StrategySettingsModel
}

const StrategySettingsView: React.FC<StrategySettingsViewProps> = ({ settings }) => {

    const dictionary = useDictionary();

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    if (!dictionary) {
        return <div>Loading...</div>;
    }
    return (
        <div className="component-container">
            <div className="text-component-head mb-2">Strategy Settings</div>
            <div className="h-[95%] w-full overflow-hidden">
                {loading && (
                    <CircularLoader />
                )}
                {!loading && settings.name === undefined && <div className="mt-6 text-slate-800">Please select a strategy. </div>}
                {settings.name !== undefined && (
                    <div className="h-full overflow-auto">
                        <div className="px-2 py-2">
                            <div className="m-0 p-0 flex">
                                <span className="w-1/3 text-sm">Strategy Type:</span>
                                <span className="w-2/3">{StrategyEnum[settings.strategyType]}</span>
                            </div>
                            <div className="m-0 p-0 flex">
                                <span className="w-1/3 text-sm">Broker:</span>
                                <span className="w-2/3">{settings.broker}</span>
                            </div>
                            <div className="m-0 p-0 flex">
                                <span className="w-1/3 text-sm">Asset:</span>
                                <span className="w-2/3">{settings.asset}</span>
                            </div>
                            <div className="m-0 p-0 flex">
                                <span className="w-1/3 text-sm">Quantity:</span>
                                <span className="w-2/3">{settings.quantity}</span>
                            </div>
                            <div className="m-0 p-0 flex">
                                <span className="w-1/3 text-sm">Take Profit Percent:</span>
                                <span className="w-2/3">{settings.takeProfitPercent}%</span>
                            </div>
                            <div className="m-0 p-0 flex">
                                <span className="w-1/3 text-sm">Stop Loss Percent:</span>
                                <span className="w-2/3">{settings.stopLossPercent}%</span>
                            </div>
                            <div className="m-0 p-0 flex">
                                <span className="w-1/3 text-sm">Start Date:</span>
                                <span className="w-2/3">{settings.startDate && format(new Date(settings.startDate), 'dd.MM.yy')}</span>
                            </div>
                            <div className="m-0 p-0 flex">
                                <span className="w-1/3 text-sm">End Date:</span>
                                <span className="w-2/3">
                                    {settings.endDate && format(new Date(settings.endDate), 'dd.MM.yy')}
                                </span>
                            </div>
                            <div className="m-0 p-0 flex">
                                <span className="w-1/3 text-sm">Trailing Stop:</span>
                                <span className="w-2/3">{settings.trailingStop}</span>
                            </div>
                            <div className="m-0 p-0 flex">
                                <span className="w-1/3 text-sm">Allow Overnight:</span>
                                <span className="w-2/3">{settings.allowOvernight ? 'Yes' : 'No'}</span>
                            </div>
                            <div className="m-0 p-0 flex">
                                <span className="w-1/3 text-sm">Test Stamp:</span>
                                <span className="w-2/3">{settings.testStamp && format(new Date(settings.testStamp), 'dd.MM.yy')}</span>
                            </div>
                            <div className='text-sm'>
                                {settings.strategyType === StrategyEnum.Breakout && (
                                    <StrategyListBreakout strategy={settings} />
                                )}
                                {settings.strategyType === StrategyEnum.SMA && (
                                    <StrategyListSMA strategy={settings} />
                                )}
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </div>
    );

}

export default StrategySettingsView;