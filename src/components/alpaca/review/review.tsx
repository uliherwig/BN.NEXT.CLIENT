"use client";
import { useEffect, useState } from 'react';
import { useDictionary } from '@/provider/dictionary-provider';
import 'react-toastify/dist/ReactToastify.css';
import { StrategySettings } from '@/models/strategy/strategy-settings';
import StrategySelector from './strategy-selector';
import { StrategyInfo } from '@/models/strategy/strategy-info';
import { set } from 'date-fns';
import { basicFetch } from '@/app/lib/fetchFunctions';
import StrategySettingsView from './startegy-settings-view';
import StrategyTestResult from './review-test-result';
import ReviewPositions from './review-positions';


const AlpacaReview: React.FC = () => {

    const dictionary = useDictionary();
    const [strategy, setStrategy] = useState<StrategySettings>({} as StrategySettings);

    const selectStrategy = async (strategyInfo: StrategyInfo) => {
        const result = await basicFetch<any>(`/api/strategy?strategyId=${strategyInfo.id}`);
        if (result) {
            setStrategy(result);
        }
    }

    return (
        <div className="content-container">
            <div className="w-1/3 flex flex-col h-full  gap-0.5">
                <div><StrategySelector selectStrategy={selectStrategy} /></div>
                <StrategySettingsView settings={strategy} />
                <StrategyTestResult settings={strategy} />
            </div>
            <div className="w-2/3 bg-blue-200">
                <ReviewPositions strategySettings={strategy} />
            </div>
        </div>
    );

}

export default AlpacaReview;