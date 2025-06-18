"use client";
import { use, useEffect, useState } from "react";
import { StrategySettings } from "@/models/strategy/strategy-settings";
import AlpacaAccountDetails from "./alpaca-account-details";
import AlpacaExecStrategy from "./alpaca-exec-strategy";
import { basicFetch } from "@/app/lib/fetchFunctions";
import { StrategyInfo } from "@/models/strategy/strategy-info";
import { AccountStatusEnum } from "@/models/alpaca/enums";
import { ExecutionModel } from "@/models/strategy/execution-model";
import { AlpacaAccountModel } from "@/models/alpaca/alpaca-account-model";
import WidgetButton from "@/components/common/buttons/widget-button";
import AlpacaCredentialsModal from "../alpaca-credentials-modal";
import CircularLoader from "@/components/common/loader";
import AlpacaPositions from "./alpaca-positions";
import AlpacaOrders from "./alpaca-orders";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AlpacaRates from "./alpaca-rates";
import { EmptyGuid } from "@/utilities";



const AlpacaExec: React.FC = () => {

    const [alpacaAccount, setAccount] = useState<AlpacaAccountModel>({} as AlpacaAccountModel);
    const [execution, setExecution] = useState<ExecutionModel>({ id: EmptyGuid } as ExecutionModel);
    const [selectedStrategy, setSelectedStrategy] = useState<StrategySettings>({} as StrategySettings);
    // const [executedStrategy, setExecutedStrategy] = useState<StrategySettings>({} as StrategySettings);

    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'orders' | 'positions'>('orders');

    const selectStrategy = async (strategyInfo: StrategyInfo) => {
        const result = await basicFetch<any>(`/api/strategy?strategyId=${strategyInfo.id}`);
        if (result) {
            setSelectedStrategy(result);
            // if (execution.id === EmptyGuid) {
            //     setExecutedStrategy(result);
            // }
        }
    }

    const startAlpacaExecution = async () => {
        setIsLoading(true);
        const res = await fetch(`/api/alpaca/execution?strategyId=${selectedStrategy.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (res.ok) {
            const data = await res.json();
            console.log('AlpacaExec   ', data);
            setExecution(data);
        } else {
            toast.error('Server Error');
            console.log('AlpacaExec   ', { error: 'Server Error' }, { status: 500 });
        }
        setIsLoading(false);
    }

    const stopAlpacaExecution = async () => {
        setIsLoading(true);

        const res = await fetch(`/api/alpaca/execution`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (res.ok) {
            let exec = { id: EmptyGuid } as ExecutionModel;
            setExecution(exec);
        } else {
            console.log('AlpacaExec   ', { error: 'Server Error' }, { status: 500 });
        }
        setIsLoading(false);

    }

    useEffect(() => {
        // load account data
        const loadAccountData = async () => {
            const acc = await basicFetch<AlpacaAccountModel>('/api/alpaca/account');
            setAccount(acc);
        }
        loadAccountData();
    }, []);

    useEffect(() => {
        // load execution data
        const loadExecutionData = async () => {

            const exec = await basicFetch<ExecutionModel>('/api/alpaca/execution');

            console.log('AlpacaExec   ', exec);

            if (exec.id !== EmptyGuid) {
                const result = await basicFetch<any>(`/api/strategy?strategyId=${exec.strategyId}`);
                if (result) {
                    setSelectedStrategy(result);
                    // setExecutedStrategy(result);
                    setExecution(exec);
                }
            }

            setIsLoading(false);
        }
        if (alpacaAccount.accountStatus === AccountStatusEnum.AccountLoaded) {
            loadExecutionData();
        } else {
            setIsLoading(false);
        }

        console.log('alpacaAccount   ', alpacaAccount);
        console.log('AlpacaExec   ', execution);
    }, [alpacaAccount]);


    // useEffect(() => {

    //     if (selectedStrategy.id !== EmptyGuid) {
    //         setExecutedStrategy(selectedStrategy);
    //     }
    // }, [selectedStrategy, selectedStrategy.id, selectedStrategy.name]);


    // handle store account credentials modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeDialog = () => {
        setIsModalOpen(false);
    }

    return (
        <>
            <div className="content-container">
                <div className="w-1/3 flex flex-col h-full  gap-0.5">

                    <div>
                        <div className="component-container">
                            <div className="min-h-[200px]">
                                <AlpacaAccountDetails alpacaAccount={alpacaAccount} />
                            </div>
                            <div className="float-right mb-4">
                                <WidgetButton type='button' label='Store Alpaca Credentials' method={() => setIsModalOpen(true)} disabled={execution.id !== EmptyGuid} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="component-container">

                            <div className="min-h-[200px]">
                                <AlpacaExecStrategy strategy={selectedStrategy} alpacaExecution={execution} selectStrategy={selectStrategy} />

                            </div>
                            {alpacaAccount.accountStatus === AccountStatusEnum.AccountLoaded && execution.id === EmptyGuid && (
                                <div className="float-right mb-4">
                                    <WidgetButton type='button' label='Start Alpaca Execution' method={startAlpacaExecution} disabled={isLoading} />
                                </div>
                            )}
                            {alpacaAccount.accountStatus === AccountStatusEnum.AccountLoaded && execution.id !== EmptyGuid && (
                                <div className="float-right mb-4">
                                    <WidgetButton type='button' label='Stop Alpaca Execution' method={stopAlpacaExecution} disabled={isLoading} />
                                </div>
                            )}

                        </div>
                    </div>
                    <div className="component-container">
                        <AlpacaRates asset={execution.id !== EmptyGuid ? selectedStrategy.asset : ""} />

                    </div>
                    <div className="component-container">
                        {isLoading && (
                            <CircularLoader />
                        )}
                        {!isLoading && alpacaAccount.accountStatus === AccountStatusEnum.AccountLoaded && execution.id !== EmptyGuid && (
                            <div className="font-bold text-red-500">
                                Aktuell wird die Strategie {selectedStrategy.name} auf dem Alpaca Testkonto ausgeführt.
                            </div>
                        )}

                    </div>



                </div>

                <div className="flex flex-col w-2/3 h-full">
                    <div className="h-12 flex bg-white">
                        <button
                            className={`px-4 py-2 border-b-2 ${activeTab === 'orders' ? 'border-slate-500 text-slate-500' : 'border-transparent text-gray-500'}`}
                            onClick={() => setActiveTab('orders')}
                        >
                            Orders
                        </button>
                        <button
                            className={`px-4 py-2 border-b-2 ${activeTab === 'positions' ? 'border-slate-500 text-slate-500' : 'border-transparent text-gray-500'}`}
                            onClick={() => setActiveTab('positions')}
                        >
                            Positions
                        </button>
                    </div>
                    <div className="flex-grow h-full overflow-hidden">
                        {activeTab === 'orders' && (
                            <AlpacaOrders alpacaAccountStatus={alpacaAccount.accountStatus} />
                        )}
                        {activeTab === 'positions' && (
                            <AlpacaPositions alpacaAccountStatus={alpacaAccount.accountStatus} />
                        )}
                    </div>
                </div>
            </div>
            <AlpacaCredentialsModal isOpen={isModalOpen}
                closeDialog={closeDialog}
                isUpdate={(alpacaAccount?.accountStatus === AccountStatusEnum.WrongCredentials || alpacaAccount?.accountStatus === AccountStatusEnum.AccountLoaded)} />
         

        </>
    )
}
export default AlpacaExec;