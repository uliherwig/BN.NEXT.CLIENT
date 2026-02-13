import { BreakoutSettings } from "@/app/models/strategy/breakout-settings";
import { BreakoutPeriodEnum, StopLossTypeEnum } from "@/app/models/strategy/enums";
import { StrategySettings } from "@/app/models/strategy/strategy-settings";
import { useDictionary } from "@/app/provider/dictionary-provider";

interface StrategyListBreakoutProps {
    strategy: StrategySettings;
}

const StrategyListBreakout: React.FC<StrategyListBreakoutProps> = ({ strategy }) => {
    const dictionary = useDictionary();

    const breakoutParams = JSON.parse(strategy.strategyParams) as BreakoutSettings;
    if (!dictionary) {
        return <div>{"Loading..."}</div>;
    }

    return (
        <div>
            <div className="flex text-center">
                <div className="flex-1">
                    <div className="">{dictionary.TEST_TIME_FRAME}</div>
                    <div>{BreakoutPeriodEnum[breakoutParams.breakoutPeriod]}</div>
                </div>
                <div className="flex-1">
                    <div>{dictionary.TEST_STOP_LOSS_TYPE}</div>
                    <div>{StopLossTypeEnum[breakoutParams.stopLossType]}</div>
                </div>
                {breakoutParams.stopLossType === StopLossTypeEnum.None && (
                    <div className="flex-1">
                        <div>{dictionary.TEST_STOP_LOSS_PERCENT}</div>
                        <div>{strategy.stopLossPercent}</div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default StrategyListBreakout;