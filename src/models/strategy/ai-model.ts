import exp from "constants";

export interface AiModel {
    id: string;
    name: string;
    execution_params: AiModelExecutionParams;
    total_return_percentage: number;
    sharpe_ratio: number;
    max_drawdown: number;
    created_at: Date;
}

export interface AiModelExecutionParams {
    broker: string;
    time_frame: number;
    asset: string;
    start_date: string;
    end_date: string;
    long_threshold: number;
    short_threshold: number;
    tp: number;
    sl: number;
}
export function parseExecutionParams(params: string | AiModelExecutionParams): AiModelExecutionParams {
    if (typeof params === "string") {
        return JSON.parse(params) as AiModelExecutionParams;
    }
    return params;
}
