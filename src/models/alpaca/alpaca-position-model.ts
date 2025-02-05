export interface AlpacaPositionModel {
    symbol: string;
    price: number;
    quantity: number;
    marketValue: number;
    costBasis: number;
    unrealizedProfitLossPercent: number;
    unrealizedProfitLoss: number;
}