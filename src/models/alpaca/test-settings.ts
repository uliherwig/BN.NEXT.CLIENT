import { Strategy, TimeFrame } from "../strategy/enums";

export interface BacktestSettings {
  id: string; // Guid in C# corresponds to string in TypeScript
  name: string;
  symbol: string;
  takeProfitFactor: number;
  stopLossFactor: number;
  startDate: string; // DateTime in C# corresponds to string in TypeScript (ISO 8601 format)
  endDate: string; // DateTime in C# corresponds to string in TypeScript (ISO 8601 format)
  strategy: Strategy;
  timeFrame: TimeFrame;
  allowOvernight: boolean;
  userEmail: string;
  testStamp: string; // DateTime in C# corresponds to string in TypeScript (ISO 8601 format)
}