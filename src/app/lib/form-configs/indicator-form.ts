import { FormConfig, FormField } from "@/app/models/forms/standard";

export const smaFields: FormField[] = [
    {
        name: "SMA_short",
        label: "Short SMA Period",
        type: "number",
        required: true,
        defaultValue: 10
    },
    {
        name: "SMA_long",
        label: "Long SMA Period",
        type: "number",
        required: true,
        defaultValue: 30
    }
]

export const emaFields: FormField[] = [
    {
        name: "EMA_short",
        label: "Short EMA Period",
        type: "number",
        required: true,
        defaultValue: 10
    },
    {
        name: "EMA_long",
        label: "Long EMA Period",
        type: "number",
        required: true,
        defaultValue: 30
    }
]

export const rsiFields: FormField[] = [
    {
        name: "RSI_period",
        label: "RSI Period",
        type: "number",
        required: true,
        defaultValue: 14
    }
]

export const wmaFields: FormField[] = [
    {
        name: "WMA_short",
        label: "Short WMA Period",
        type: "number",
        required: true,
        defaultValue: 10
    },
    {
        name: "WMA_long",
        label: "Long WMA Period",
        type: "number",
        required: true,
        defaultValue: 30
    }
]

export const temaFields: FormField[] = [
    {
        name: "TEMA_short",
        label: "Short TEMA Period",
        type: "number",
        required: true,
        defaultValue: 10
    },
    {
        name: "TEMA_long",
        label: "Long TEMA Period",
        type: "number",
        required: true,
        defaultValue: 30
    }
]

export const macdFields: FormField[] = [
    {
        name: "MACD_fast",
        label: "MACD Fast Period",
        type: "number",
        required: true,
        defaultValue: 12
    },
    {
        name: "MACD_slow",
        label: "MACD Slow Period",
        type: "number",
        required: true,
        defaultValue: 26
    },
    {
        name: "MACD_signal",
        label: "MACD Signal Period",
        type: "number",
        required: true,
        defaultValue: 9
    }
]

export const donchianFields: FormField[] = [
    {
        name: "DONCHIAN_window",
        label: "Donchian Channel Window",
        type: "number",
        required: true,
        defaultValue: 20
    }
]

export const breakoutFields: FormField[] = [
    {
        name: "BREAKOUT_period",
        label: "Breakout Period",
        type: "number",
        required: true,
        defaultValue: 20
    }
]

export const volaFields: FormField[] = [
    {
        name: "VOLA_period",
        label: "Volatility Period",
        type: "number",
        required: true,
        defaultValue: 20
    }
]

export const atrFields: FormField[] = [
    {
        name: "ATR_period",
        label: "ATR Period",
        type: "number",
        required: true,
        defaultValue: 14
    },
    {
        name: "ATR_threshold",
        label: "ATR Threshold",
        type: "number",
        required: true,
        defaultValue: 1.5
    }
]

export const bbandsFields: FormField[] = [
    {
        name: "BBANDS_period",
        label: "Bollinger Bands Period",
        type: "number",
        required: true,
        defaultValue: 20
    }
]

export const rocFields: FormField[] = [
    {
        name: "ROC_period",
        label: "Rate of Change Period",
        type: "number",
        required: true,
        defaultValue: 20
    },
    {
        name: "ROC_threshold",
        label: "Rate of Change Threshold",
        type: "number",
        required: true,
        defaultValue: 0.001
    }
]

export const IndicatorFormConfig: FormConfig = {
    formId: "strategyForm",
    title: "Test an Indicator with custom settings",
    fields: [
        {
            name: "name",
            label: "Name",
            type: "text",
            placeholder: "e.g. TestRun1",
            required: true,
            defaultValue: "TestRun1",
            validation: {
                minLength: 5,
                maxLength: 50
            }
        },
        // {
        //     name: "action",
        //     label: "Action",
        //     type: "select",
        //     required: true,
        //     defaultValue: "0",
        //     options: [
        //         { value: "0", label: "Test with my parameters" },
        //         { value: "1", label: "Find best Fit" }
        //     ]
        // },
        {
            name: "indicator",
            label: "Indicator",
            type: "select",
            required: true,
            defaultValue: "0",
            options: [
                { value: "0", label: "Select an Indicator" },
                { value: "1", label: "SMA" },
                { value: "2", label: "EMA" },
                { value: "3", label: "WMA" },
                { value: "4", label: "TEMA" },
                { value: "5", label: "MACD" },
                { value: "6", label: "RSI" },
                { value: "7", label: "DONCHIAN" },
                { value: "8", label: "BREAKOUT" },
                { value: "9", label: "VOLA" },
                { value: "10", label: "ATR" },
                { value: "11", label: "Bollinger Bands" },
                { value: "12", label: "Rate of Change" }
            ]
        },
        {
            name: "asset",
            label: "Asset",
            type: "select",
            required: true,
            defaultValue: "",
            options: [],
            showWhen: [
                { field: "indicator", notEquals: "0" }
            ]
        },
        {
            name: "quantity",
            label: "Quantity",
            type: "number",
            placeholder: "e.g. 10",
            required: true,
            defaultValue: 10,
            showWhen: [
                { field: "indicator", notEquals: "0" }
            ]
        },
        {
            name: "startDate",
            label: "Start Date",
            type: "date",
            required: true,
            defaultValue: new Date(2024, 0, 1, 10, 0, 0).toISOString().split('T')[0],
            showWhen: [
                { field: "indicator", notEquals: "0" }
            ]
        },
        {
            name: "endDate",
            label: "End Date",
            type: "date",
            required: true,
            defaultValue: new Date().toISOString().split('T')[0],
            showWhen: [
                { field: "indicator", notEquals: "0" }
            ]
        },
        {
            name: "stopLossPercent",
            label: "Stop Loss %",
            type: "number",
            required: true,
            defaultValue: 1.0,
            showWhen: [
                { field: "indicator", notEquals: "0" }
            ]
        },
        {
            name: "takeProfitPercent",
            label: "Take Profit %",
            type: "number",
            required: true,
            defaultValue: 1.0,
            showWhen: [
                { field: "indicator", notEquals: "0" }
            ]
        },
        {
            name: "closePositionEod",
            label: "Close Pos. EOD",
            type: "checkbox",
            required: false,
            defaultValue: false,
            showWhen: [
                { field: "indicator", notEquals: "0" }
            ]
        }
    ],
    submit: false,
    submitLabel: "Run Test"
};