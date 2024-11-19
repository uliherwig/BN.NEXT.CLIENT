import { Strategy, BreakoutPeriod, StopLossStrategy } from "./enums";

export interface StrategySettingsModel {
  id: string; // Guid in C# corresponds to string in TypeScript
  userId: string;
  broker: string;
  name: string;
  symbol: string;
  takeProfitPercent: number;
  stopLossPercent: number;
  startDate: string; // DateTime in C# corresponds to string in TypeScript (ISO 8601 format)
  endDate: string; // DateTime in C# corresponds to string in TypeScript (ISO 8601 format)
  strategy: Strategy;
  breakoutPeriod: BreakoutPeriod;
  trailingStop: number;
  allowOvernight: boolean;
  bookmarked: boolean;
  stopLossStrategy: StopLossStrategy;
  testStamp: string; // DateTime in C# corresponds to string in TypeScript (ISO 8601 format)
}