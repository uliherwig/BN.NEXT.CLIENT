import { StrategySettingsModel } from "./strategy-settings-model";

export interface SMAModel extends StrategySettingsModel {
  shortPeriod: number;
  longPeriod: number;
}