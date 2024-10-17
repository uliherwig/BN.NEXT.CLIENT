"use client";
import { useState } from "react";
import TestPositions from "./test-results";
import TestSettingsForm from "./test-settings-form";
import TestList from "./test-list";
import { BacktestSettings } from "@/models/strategy/test-settings";

interface BackTestProps {
    email: string;
}

const Backtests : React.FC<BackTestProps>  = ( {email} ) => {
    const [backtest, setBacktest] = useState<BacktestSettings>({} as BacktestSettings);

    const showResult = (e:BacktestSettings) => {

        console.log(e)

        setBacktest(e)
     }


    return (
        <>
            <div className="flex flex-row gap-4 w-full">
                <div className="flex-1 content-container">
                    <TestSettingsForm />
                </div>
                <div className="flex-1 h-full content-container">
                    <div className="flex h-full bg-white p-3 px-5">
                        <TestList email={email as string} showResult={showResult} />
                    </div>

                </div>
                <div className="flex-1  h-full content-container">
                    <div className="flex h-full bg-white p-3 px-5">
                        <TestPositions test={backtest} />
                    </div>
                </div>

            </div>

        </>
    )
}
export default Backtests;