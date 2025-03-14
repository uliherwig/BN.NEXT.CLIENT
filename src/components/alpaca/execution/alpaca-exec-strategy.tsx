"use client";
import { useEffect, useState } from 'react';
import { useDictionary } from '@/provider/dictionary-provider';
import 'react-toastify/dist/ReactToastify.css';
import CircularLoader from "@/components/common/loader";
import { StrategySettings } from '@/models/strategy/strategy-settings';
import { AccountStatusEnum } from '@/models/alpaca/enums';
import { ExecutionModel } from '@/models/strategy/execution-model';
import { StrategyEnum } from '@/models/strategy/enums';

interface AlpacaExecStrategyProps {
    strategy: StrategySettings,
    alpacaAccountStatus: AccountStatusEnum,
    alpacaExecution: ExecutionModel
}

const AlpacaExecStrategy: React.FC<AlpacaExecStrategyProps> = ({ alpacaAccountStatus, strategy, alpacaExecution }) => {

    const dictionary = useDictionary();

    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        setLoading(false);
    }, []);



    if (!dictionary) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <div className="text-component-head mb-2">Alpaca Execution</div>
            <div className="w-full overflow-hidden">
                {loading && (
                    <CircularLoader />
                )}
                {!loading && (
                    <>

                        <div className="grid grid-cols-4">

                            <div>Name:</div>
                            <div className='font-bold'>{strategy.name}</div>

                            <div>Broker:</div>
                            <div>{strategy.broker}</div>

                            <div>Strategy Type:</div>
                            <div>{StrategyEnum[strategy.strategyType]}</div>

                            <div>Asset:</div>
                            <div>{strategy.asset}</div>

                            <div>Quantity:</div>
                            <div>{strategy.quantity}</div>

                            <div>Take Profit:</div>
                            <div>{strategy.takeProfitPercent}%</div>

                            <div>Stop Loss:</div>
                            <div>{strategy.stopLossPercent}%</div>

                            <div>Trailing Stop:</div>
                            <div>{strategy.trailingStop}</div>

                            <div>Overnight:</div>
                            <div>{strategy.allowOvernight ? 'Yes' : 'No'}</div>
                        </div>

                    </>
                )}
            </div>
        </>
    );

}

export default AlpacaExecStrategy;