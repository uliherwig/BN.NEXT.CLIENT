export enum NotificationEnum {
  // Example values
    None,
    StrategyStart,
    StrategyStop,
    OtimizeStart,
    OptimizeStop,
    AlpacaRateFeed, 
    AccountLoaded,
    OrderCreated,
    OrderUpdated,
    OrderCanceled,
    OrderFilled,
    OrderRejected,

}

export interface NotificationMessage {
  UserId: string; // Guid as string
  NotificationType: NotificationEnum;
  JsonData: string;
  Timestamp: string; // ISO string or Date, depending on usage
}