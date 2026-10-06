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

// Raw shape as received from the API (execution_params may still be a JSON string, created_at is a string)
export interface AiModelDto {
    id: string;
    name: string;
    execution_params: string | AiModelExecutionParams;
    total_return_percentage: number;
    sharpe_ratio: number;
    max_drawdown: number;
    created_at: string;
}

export function mapAiModelDto(dto: AiModelDto): AiModel {
    return {
        ...dto,
        execution_params: parseExecutionParams(dto.execution_params),
        created_at: new Date(dto.created_at)
    };
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
