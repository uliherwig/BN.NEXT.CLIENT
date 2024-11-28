import { StrategyEnum } from "./enums";

export interface StrategySettingsModel {
  id: string;
  userId: string;
  strategyType: StrategyEnum;
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
}