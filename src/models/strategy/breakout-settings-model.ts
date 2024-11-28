import { StopLossTypeEnum, BreakoutPeriodEnum } from "./enums";


export interface BreakoutSettingsModel {
  stopLossType: StopLossTypeEnum;
  breakoutPeriod: BreakoutPeriodEnum;
}