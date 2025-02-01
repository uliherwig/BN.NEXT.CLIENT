import { StopLossTypeEnum } from "./enums";

export interface SMASettings {
    shortPeriod: number;
    longPeriod: number;
    stopLossType: StopLossTypeEnum;
    intersectionThreshold: number;
}