// components/ConfigurableForm.tsx
"use client";
import { useState } from "react";
import { FormConfig, FormField } from "@/models/forms/standard";
import { useFormState } from "react-dom";
import { runStrategy } from "@/app/actions/alpaca";

interface ConfigurableFormProps {
    config: FormConfig;
    onSubmit: (data: FormData) => void;
}

export default function ConfigurableForm({ config, onSubmit }: ConfigurableFormProps) {
    
    // Build initial form data with defaultValue if present
    const initialFormData = config.fields.reduce((acc, field) => {
        if ("defaultValue" in field && field.defaultValue !== undefined) {
            acc[field.name] = field.defaultValue;
        }
        return acc;
    }, {} as Record<string, any>);

    const [formData, setFormData] = useState<Record<string, any>>(initialFormData);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const validateField = (field: FormField, value: any): string | null => {
        if (field.required && !value) {
            return `${field.label} is required`;
        }
        if (field.validation) {
            if (field.validation.minLength && value.length < field.validation.minLength) {
                return `${field.label} must be at least ${field.validation.minLength} characters`;
            }
            if (field.validation.maxLength && value.length > field.validation.maxLength) {
                return `${field.label} must be at most ${field.validation.maxLength} characters`;
            }
            if (field.validation.pattern && !new RegExp(field.validation.pattern).test(value)) {
                return `${field.label} is invalid`;
            }
        }
        return null;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: Record<string, string> = {};
        let isValid = true;

        config.fields.forEach((field) => {
            const error = validateField(field, formData[field.name]);
            if (error) {
                newErrors[field.name] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);
        if (isValid) {
            onSubmit(formData);
        }
    };

    const renderField = (field: FormField) => {
        switch (field.type) {
            case "text":
            case "email":
            case "password":
            case "date":
                return (
                    <input
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                );
            case "number":
                return (
                    <input
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                );
            case "checkbox":
                return (
                    <input
                        type="checkbox"
                        name={field.name}
                        checked={formData[field.name] || false}
                        onChange={handleChange}
                        className="mr-2"
                    />
                );
            case "select":
                return (
                    <select
                        name={field.name}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        aria-label={field.label}
                    >
                        {field.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );
            default:
                return null;
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-component-head mb-2">{config.title}</h2>
            {config.fields.map((field) => (
      
                <div className="flex items-start mb-1">
                    <div className="w-[30%] pb-1 flex-shrink-0">
                        <label>{field.label}{field.required && <span className="text-red-500">*</span>}</label>
                    </div>
                    <div className="flex-1 pb-1">
                        {renderField(field)}
                        {errors[field.name] && (
                            <p className="error-message">{errors[field.name]}</p>
                        )}
                    </div>
                </div>
            ))}
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Submit
            </button>
        </form>
    );
}
