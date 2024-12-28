import { StopLossTypeEnum } from "@/models/strategy/enums";
import { SMASettingsModel } from "@/models/strategy/sma-settings-model";
import { StrategySettingsModel } from "@/models/strategy/strategy-settings-model";
import { useDictionary } from "@/provider/dictionary-provider";

interface StrategyListSMAProps {
    strategy: StrategySettingsModel;
}

const StrategyListSMA: React.FC<StrategyListSMAProps> = ({ strategy }) => {
    const dictionary = useDictionary();

    const smaParams = JSON.parse(strategy.strategyParams) as SMASettingsModel;

    if (!dictionary) {
        return <div>Loading...</div>;
    }

    return (

<div className="flex flex-row gap-2 text-center w-full">
    <div className="flex-1">
        <div>StopLossType</div>
        <div>{StopLossTypeEnum[smaParams.stopLossType]}</div>
    </div>
    <div className="flex-1">
        <div>Short Period</div>
        <div>{smaParams.shortPeriod}</div>
    </div>
    <div className="flex-1">
        <div>Long Period</div>
        <div>{smaParams.longPeriod}</div>
    </div>
    <div className="flex-1">
        <div>Threshold</div>
        <div>{smaParams.intersectionThreshold}</div>
    </div>
</div>

    );
}

export default StrategyListSMA;