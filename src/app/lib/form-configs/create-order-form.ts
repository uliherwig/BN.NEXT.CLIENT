import { FormConfig } from "@/app/models/forms/standard";

export const CreateOrderForm: FormConfig = {
    formId: "createOrderForm",
    title: "Create Order",
    fields: [
        {
            name: "asset",
            label: "Asset",
            type: "text",
            required: true,
            defaultValue: "SPY"
        },
        {
            name: "quantity",
            label: "Quantity",
            type: "number",
            required: true,
            defaultValue: 10
        },
        {
            name: "side",
            label: "Side",
            type: "select",
            required: true,
            defaultValue: "Buy",
            options: [
                { value: "Buy", label: "Buy" },
                { value: "Sell", label: "Sell" }
         
            ]
        }
    ],
    submit: true,
    submitLabel: "Create Order"
};