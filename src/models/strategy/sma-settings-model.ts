import { StopLossTypeEnum } from "./enums";

export interface SMASettingsModel {
    shortPeriod: number;
    longPeriod: number;
    stopLossType: StopLossTypeEnum;
    intersectionThreshold: number;
}