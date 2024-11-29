import { BreakoutSettingsModel } from "@/models/strategy/breakout-settings-model";
import { BreakoutPeriodEnum, StopLossTypeEnum } from "@/models/strategy/enums";
import { StrategySettingsModel } from "@/models/strategy/strategy-settings-model";
import { useDictionary } from "@/provider/dictionary-provider";

interface StrategyListBreakoutProps {
    strategy: StrategySettingsModel;
}

const StrategyListBreakout: React.FC<StrategyListBreakoutProps> = ({ strategy }) => {
    const dictionary = useDictionary();

    const breakoutParams = JSON.parse(strategy.strategyParams) as BreakoutSettingsModel;

    if (!dictionary) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="flex text-center">
                <div className="flex-1">
                    <div className="">Time Frame</div>
                    <div >{BreakoutPeriodEnum[breakoutParams.breakoutPeriod]}</div>
                </div>
                <div className="flex-1">
                    <div >StopLoss Type</div>
                    <div>{StopLossTypeEnum[breakoutParams.stopLossType]}</div>
                </div>
                {breakoutParams.stopLossType === StopLossTypeEnum.CustomLimit && (
                    <div className="flex-1">
                        <div>Stop Loss Percent</div>
                        <div>{strategy.stopLossPercent}</div>
                    </div>
                )}
                {/* <div className="flex-1">
                                                            <div>Trailing Stop</div>
                                                            <div >{item.trailingStop}</div>
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="">Allow Overnight</div>
                                                            <div className="">{item.allowOvernight ? 'Yes' : 'No'}</div>
                                                        </div> */}
            </div>
        </div>
    );
}

export default StrategyListBreakout;