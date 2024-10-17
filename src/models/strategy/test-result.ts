export interface TestResult {
  id: string; // Guid in C# maps to string in TypeScript
  symbol: string;
  startDate: Date; // DateTime in C# maps to Date in TypeScript
  endDate: Date; // DateTime in C# maps to Date in TypeScript
  timeFrame: string; // TimeSpan in C# maps to string in TypeScript
  numberOfPositions: number;
  numberOfBuyPositions: number;
  numberOfSellPositions: number;
  totalProfitLoss: number; // decimal in C# maps to number in TypeScript
  buyProfitLoss: number; // decimal in C# maps to number in TypeScript
  sellProfitLoss: number; // decimal in C# maps to number in TypeScript
}