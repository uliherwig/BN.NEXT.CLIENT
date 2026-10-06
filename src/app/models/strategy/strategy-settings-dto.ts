import { TimeFrameEnum, StrategyTypeEnum } from "./enums";

export interface StrategySettingsDto {
  broker: string;
  name: string;
  asset: string;
  quantity: number;
  timeFrame: TimeFrameEnum;
  takeProfitPercent: number;
  stopLossPercent: number;
  startDate: string;
  endDate: string;
  trailingStop: number;
  closePositionEod: boolean;
  positionTimeout: number;
  spreadPerTrade: number;
  overnightFeeRate: number;
  strategyType: StrategyTypeEnum;
  reverseTrade: boolean;
}

export const defaultStrategySettingsDto: StrategySettingsDto = {
  broker: "",
  name: "",
  strategyType: StrategyTypeEnum.NONE,
  asset: "",
  quantity: 1,
  timeFrame: TimeFrameEnum.Day,
  takeProfitPercent: 0.0,
  stopLossPercent: 0.0,
  startDate: new Date(Date.UTC(1, 0, 1, 0, 0, 0)).toISOString(),
  endDate: new Date().toISOString(),
  trailingStop: 0.0,
  closePositionEod: true,
  positionTimeout: 60.0,
  spreadPerTrade: 0.005,
  overnightFeeRate: 0.00005,
  reverseTrade: false,
};
