import { Side } from "./enums";

export interface Position {
  id: string;
  testId: string;
  symbol: string;
  quantity: number;
  side: Side;
  priceOpen: number;
  priceClose: number;
  profitLoss: number;
  takeProfit: number;
  stopLoss: number;
  stampOpened: Date;
  stampClosed: Date;
  closeSignal: string;
  prevLow: number;
  prevHigh: number;
}