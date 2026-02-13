import { StopLossTypeEnum, BreakoutPeriodEnum } from "./enums";


export interface BreakoutSettings {
  stopLossType: StopLossTypeEnum;
  breakoutPeriod: BreakoutPeriodEnum;
}