import { SideEnum } from "../strategy/enums";

export interface AlpacaOrderModel {
    orderId: string;
    userId: string;
    clientOrderId?: string;
    createdAtUtc?: string;
    updatedAtUtc?: string;
    submittedAtUtc?: string;
    filledAtUtc?: string;
    expiredAtUtc?: string;
    cancelledAtUtc?: string;
    failedAtUtc?: string;
    replacedAtUtc?: string;
    assetId: string;
    symbol: string;
    notional?: number;
    quantity?: number;
    filledQuantity: number;
    integerQuantity: number;
    integerFilledQuantity: number;
    orderType: OrderType;
    orderClass: OrderClass;
    orderSide: SideEnum;
    timeInForce: TimeInForce;
    limitPrice?: number;
    stopPrice?: number;
    trailOffsetInDollars?: number;
    trailOffsetInPercent?: number;
    highWaterMark?: number;
    averageFillPrice?: number;
    orderStatus: OrderStatus;
    replacedByOrderId?: string;
    replacesOrderId?: string;
}

// Define the enums used in the interface
export enum OrderType {
    Market = 'market',
    Limit = 'limit',
    Stop = 'stop',
    StopLimit = 'stop_limit',
    TrailingStop = 'trailing_stop'
}

export enum OrderClass {
    Simple = 'simple',
    Bracket = 'bracket',
    Oco = 'oco',
    Oto = 'oto'
}

export enum OrderSide {
    Buy = 'buy',
    Sell = 'sell'
}

export enum TimeInForce {
    Day = 'day',
    Gtc = 'gtc',
    Opg = 'opg',
    Cls = 'cls',
    Ioc = 'ioc',
    Fok = 'fok'
}

export enum OrderStatus {
    New = 'new',
    PartiallyFilled = 'partially_filled',
    Filled = 'filled',
    DoneForDay = 'done_for_day',
    Canceled = 'canceled',
    Expired = 'expired',
    Replaced = 'replaced',
    PendingCancel = 'pending_cancel',
    PendingReplace = 'pending_replace',
    Accepted = 'accepted',
    PendingNew = 'pending_new',
    AcceptedForBidding = 'accepted_for_bidding',
    Stopped = 'stopped',
    Rejected = 'rejected',
    Suspended = 'suspended',
    Calculated = 'calculated'
}