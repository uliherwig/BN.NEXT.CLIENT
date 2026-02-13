export enum StrategyEnum {
  NONE,
  IndicatorBased,
  MachineLearningBased,
}

export enum IndicatorEnum {
  NONE,      // 0
  SMA,       // 1 - Simple Moving Average
  EMA,       // 2 - Exponential Moving Average
  WMA,       // 3 - Weighted Moving Average
  TEMA,      // 4 - Triple Exponential Moving Average
  MACD,      // 5 - Moving Average Convergence/Divergence
  RSI,       // 6 - Relative Strength Index
  DONCHIAN,  // 7 - Donchian Channel
  BREAKOUT,  // 8 - Breakout Strategy
  VOLA,      // 9 - Volatility Strategy
  ATR,       // 10 - Average True Range
  BBANDS,    // 11 - Bollinger Bands
  ROC        // 12 - Rate of Change Indicator
}

export enum BreakoutPeriodEnum {
  Minute,
  TenMinutes,
  Hour,
  Day,
}

export enum SideEnum {
  Buy = 0,
  Sell
}

export enum StopLossTypeEnum {
  None,
  Breakout,
  SMAIntersection,
}

export enum StrategyActionEnum {
  None,
  Backtest,
  Optimization,
  Execution,
}
export enum TimeFrameEnum {
  Minute = 0,
  TenMinutes = 1,
  ThirtyMinutes = 2,
  Hour = 3,
  Day = 4
}
