export interface SmaModel {
    SMA_short: number;
    SMA_long: number;

}
export interface EmaModel {
    EMA_short: number;
    EMA_long: number;
}
export interface WmaModel {
    WMA_short: number;
    WMA_long: number;
}

export interface TemaModel {
    TEMA_short: number;
    TEMA_long: number;
}
export interface RsiModel {
    RSI_period: number;
    RSI_overbought: number;
    RSI_oversold: number;
}
export interface MacdModel {
    MACD_fast: number
    MACD_slow: number
    MACD_signal: number
}   
export interface BbModel {
    BBANDS_period: number; 
}



