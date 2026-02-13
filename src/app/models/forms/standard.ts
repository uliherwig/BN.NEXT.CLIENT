export type FormFieldType = "text" | "email" | "number" | "checkbox" | "select" | "password" | "date";

export interface FormFieldValidation {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    min?: number;
    max?: number;
}

type FieldCondition = {
    field: string
    equals?: string
    notEquals?: string
}

export interface FormField {
    name: string;
    label: string;
    type: FormFieldType;
    placeholder?: string;
    required: boolean;
    validation?: FormFieldValidation;
    options?: { value: string; label: string }[]; // For select fields
    defaultValue?: any;
    showWhen?: FieldCondition[];
}

export interface FormConfig {
    formId: string;
    title: string;
    submitLabel?: string;
    submit?: boolean;
    fields: FormField[];
}


