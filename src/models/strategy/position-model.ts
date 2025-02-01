import { SideEnum, StrategyEnum } from "./enums";

export interface PositionModel {
  id: string; 
  strategyId: string; 
  symbol: string;
  quantity: number;
  side: SideEnum;
  priceOpen: number; 
  priceClose: number;
  profitLoss: number;
  takeProfit: number;
  stopLoss: number; 
  stampOpened: string; 
  stampClosed: string; 
  closeSignal: string;
  strategyType: StrategyEnum;
  strategyParams: string;
}