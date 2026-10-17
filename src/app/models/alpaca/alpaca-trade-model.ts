export interface AlpacaTradeModel {
  id: number;
  symbol: string;         // e.g. "SPY"
  timestampUtc: string;   // ISO timestamp (e.g. "2026-08-04T12:29:32.961151393Z")
  exchange: string;       // Exchange (e.g. "V" for NYSE, "Q" for NASDAQ)
  price: number;          // Execution price (e.g. 760.30)
  size: number;           // Executed volume (number of shares, e.g. 100)
  tape: string;           // Tape (e.g. "A", "B", "C")
  conditions: string[];   // Trade conditions (e.g. ["R"] for Regular Sale)
  tradeId: number;        // Unique trade ID (e.g. 12345)
}
