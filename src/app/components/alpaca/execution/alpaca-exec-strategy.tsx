"use client";
import { useEffect, useState } from 'react';
import { useDictionary } from '@/app/provider/dictionary-provider';
import 'react-toastify/dist/ReactToastify.css';
import CircularLoader from "@/app/components/common/loader";
import { StrategySettings } from '@/app/models/strategy/strategy-settings';
import { ExecutionModel } from '@/app/models/strategy/execution-model';
import { StrategyEnum } from '@/app/models/strategy/enums';
import { Autocomplete, TextField } from '@mui/material';
import { StrategyInfo } from '@/app/models/strategy/strategy-info';
import { basicFetch } from '@/app/lib/fetchFunctions';
import { EmptyGuid } from '@/app/lib/utilities';

interface AlpacaExecStrategyProps {
    strategy: StrategySettings,
    alpacaExecution: ExecutionModel
    selectStrategy: Function
}

const AlpacaExecStrategy: React.FC<AlpacaExecStrategyProps> = ({ strategy, alpacaExecution, selectStrategy }) => {

    const dictionary = useDictionary();
    const [loading, setLoading] = useState<boolean>(true);
    const [strategyName, setStrategyName] = useState("None");
    const [strategyFilter, setStrategyFilter] = useState(StrategyEnum.NONE);
    const [strategyInfos, setStrategyInfos] = useState<StrategyInfo[]>([]);

    const selectStrategyInfo = async (info: StrategyInfo) => {
        setStrategyName(info.label);
        selectStrategy(info)
    }
    const loadStrategyInfos = async (filter: number) => {
        const strategyInfos = await basicFetch<StrategyInfo[]>(`/api/strategy/infos?strategyType=${filter}`);
        setStrategyInfos(strategyInfos);
        selectStrategyInfo(strategyInfos[0]);
        setLoading(false);
    }
    useEffect(() => {
        loadStrategyInfos(StrategyEnum.NONE);
        setLoading(false);
    }, []);

    if (!dictionary) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <div className="text-component-head mb-2 flex flex-row">
                <div className='w-[50%]'>Alpaca Execution</div>
                <div className='pt-2'>
                    <Autocomplete
                        disabled={alpacaExecution.id !== EmptyGuid}
                        options={strategyInfos}
                        size="small"
                        sx={{ width: 200 }}
                        onChange={(event, newValue) => {
                            if (newValue) {
                                selectStrategyInfo(newValue);
                            }
                        }}
                        renderInput={(params) => <TextField {...params} label="Select Strategy" />}
                    />
                </div>
            </div>


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
                            <div>{strategy.closePositionEod ? 'Yes' : 'No'}</div>
                        </div>
                    </>
                )}
            </div>
        </>
    );

}

export default AlpacaExecStrategy;