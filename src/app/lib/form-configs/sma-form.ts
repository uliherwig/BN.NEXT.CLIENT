import { FormConfig } from "@/app/models/forms/standard";

export const SmaFormConfig: FormConfig = {
    formId: "strategyForm",
    title: "Test a Indicator with custom settings",
    fields: [
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
}