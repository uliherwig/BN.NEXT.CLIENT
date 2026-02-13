import { StopLossTypeEnum } from "@/app/models/strategy/enums";
import { SmaModel } from "@/app/models/strategy/indicator-models";
import { StrategySettings } from "@/app/models/strategy/strategy-settings";
import { useDictionary } from "@/app/provider/dictionary-provider";
import { use, useEffect } from "react";

interface StrategyListSMAProps {
    strategy: StrategySettings;
}

const StrategyListSMA: React.FC<StrategyListSMAProps> = ({ strategy }) => {
    const dictionary = useDictionary();

    const smaParams = JSON.parse(strategy.strategyParams) as SmaModel;

    if (!dictionary) {
        return <div>Loading...</div>;
    }

    return (

        <div className="flex flex-row gap-2 text-center w-full">
   
            <div className="flex-1">
                <div>{dictionary.TEST_SHORT_PERIOD}</div>
                <div>{smaParams.SMA_short}</div>
            </div>
            <div className="flex-1">
                <div>{dictionary.TEST_LONG_PERIOD}</div>
                <div>{smaParams.SMA_long}</div>
            </div>
            {/* <div className="flex-1">
                <div>{dictionary.TEST_THRESHOLD}</div>
                <div>{smaParams.intersectionThreshold}</div>
            </div> */}
        </div>

    );
}

export default StrategyListSMA;