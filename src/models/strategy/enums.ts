export enum StrategyEnum {
  None,
  Breakout,
  MeanReversion,
  Momentum,
  Reversal,
  TrendFollowing,
  SMA,
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

