import { StrategyTypeEnum } from "../strategy/enums";

export interface AlpacaStrategyTracking {
    id: string;
    name: string;
    startedAtUtc: Date;
    stoppedAtUtc?: Date;
    strategyType: StrategyTypeEnum;
    asset: string;
}