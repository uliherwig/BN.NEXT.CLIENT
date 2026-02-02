import { IndicatorEnum, StrategyEnum, TimeFrameEnum } from "./enums";

export interface StrategySettings {
  id: string;
  userId: string;
  strategyType: StrategyEnum;
  indicatorType: IndicatorEnum;
  broker: string;
  name: string;
  asset: string;
  quantity: number;
  takeProfitPercent: number;
  stopLossPercent: number;
  startDate: string;
  endDate: string;
  trailingStop: number;
  allowOvernight: boolean;
  bookmarked: boolean;
  testStamp: string;
  strategyParams: string;
  spreadPerTrade: number;
  overnightFeeRate: number;
  reverseTrade: boolean;
  timeFrame: TimeFrameEnum;

}