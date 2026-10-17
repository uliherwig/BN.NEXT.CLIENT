"use client";

import { useEffect, useMemo } from "react";
import { ErrorOption, useForm, useWatch } from "react-hook-form";
import { FormConfig, FormField } from "@/app/models/forms/standard";


interface ConfigurableFormProps {
    config: FormConfig;
    action: (state: any, payload: FormData) => any; // server action
}

export default function CommonConfForm({
    config,
    action,
}: ConfigurableFormProps) {

    /* -------------------------------------------------- */
    /* Default Values                                     */
    /* -------------------------------------------------- */

    const defaultValues = useMemo(() => {
        const baseDefaults = config.fields.reduce((acc, field) => {
            acc[field.name] = field.defaultValue ?? "";
            return acc;
        }, {} as Record<string, any>);
        //console.log("Base Defaults:", baseDefaults);
        return baseDefaults;
    }, [config.fields]);

    /* -------------------------------------------------- */
    /* React Hook Form                                    */
    /* -------------------------------------------------- */

    const {
        register,
        control,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues,
    });

    //console.log("Form Errors:", errors);
    //console.log("Is Submitting:", isSubmitting);

    /* -------------------------------------------------- */
    /* Watch Values                                       */
    /* -------------------------------------------------- */

    const values = useWatch({ control });

    /* -------------------------------------------------- */
    /* Conditional Visibility                             */
    /* -------------------------------------------------- */

    const shouldShowField = (field: FormField) => {
        if (!field.showWhen) return true;

        return field.showWhen.some((condition) => {
            if (condition.equals)
                return values?.[condition.field] === condition.equals;

            if (condition.notEquals)
                return values?.[condition.field] !== condition.notEquals;

            return false;
        });
    };

    /* -------------------------------------------------- */
    /* Validation Rules                                   */
    /* -------------------------------------------------- */

    const buildValidationRules = (field: FormField) => {
        const rules: any = {};

        if (field.required) {
            rules.required = `${field.label} is required`;
        }

        if (field.validation?.minLength) {
            rules.minLength = {
                value: field.validation.minLength,
                message: `${field.label} must be at least ${field.validation.minLength} characters`,
            };
        }

        if (field.validation?.maxLength) {
            rules.maxLength = {
                value: field.validation.maxLength,
                message: `${field.label} must be at most ${field.validation.maxLength} characters`,
            };
        }

        if (field.validation?.pattern) {
            rules.pattern = {
                value: new RegExp(field.validation.pattern),
                message: `${field.label} is invalid`,
            };
        }

        return rules;
    };

    /* -------------------------------------------------- */
    /* Field Renderer                                     */
    /* -------------------------------------------------- */

    const renderField = (field: FormField) => {
        const validationRules = buildValidationRules(field);

        switch (field.type) {
            case "select":
                return (
                    <select
                        {...register(field.name, validationRules)}
                        className="input-box"
                    >
                        {field.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );

            case "checkbox":
                return (
                    <input
                        type="checkbox"
                        {...register(field.name)}
                        className="mt-2"
                    />
                );
            case "number":
                return (
                    <input
                        type="number"
                        placeholder={field.placeholder}
                        step={field.increment}
                        {...register(field.name, validationRules)}
                        className="input-box"
                    />
                );
            default:
                return (
                    <input
                        type={field.type}
                        placeholder={field.placeholder}
                        {...register(field.name, validationRules)}
                        className="input-box"
                    />
                );
        }
    };

    /* -------------------------------------------------- */
    /* Submit Handler                                     */
    /* -------------------------------------------------- */

    const onSubmit = async (data: any) => {
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {

            if (config.fields.find(f => f.name === key)) {
                formData.append(key, String(value));
            }

        });
        const result = await action(null, formData);

        if (result?.success) {
            // Optionally reset the form or show a success message
        } else {
            // Handle errors returned from the server
            if (result?.errors) {
                Object.entries(result.errors).forEach(([field, message]) => {
                    console.log(`Setting error for ${field}: ${message}`);
                    const err: ErrorOption = {
                        type: "server",
                        message: Array.isArray(message) ? message.join(", ") : String(message),
                    };
                    setError(field, err);
                });
            }
        }

        console.log("Action Result:", result);
    };


    /* -------------------------------------------------- */
    /* Render                                             */
    /* -------------------------------------------------- */

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-2"
        >
            <h2>{config.title}</h2>
            {/* Global Server Message */}

            {/* Base Fields */}
            {config.fields
                .filter(shouldShowField)
                .map((field) => (
                    <div className="flex items-start" key={field.name}>
                        <div className="input-label">
                            <label>
                                {field.label}
                                {field.required && (
                                    <span className="text-red-500">*</span>
                                )}
                            </label>
                        </div>

                        <div className="flex-1">
                            {renderField(field)}

                            {errors[field.name] && (
                                <p className="error-message">
                                    {errors[field.name]?.message as string}
                                </p>
                            )}
                        </div>
                    </div>
                ))}


            {/* Submit */}

            <button
                type="submit"
                disabled={isSubmitting}
                className="bg-indigo-900 text-white px-4 h-[32px] w-full font-bold disabled:opacity-50"
            >
                {isSubmitting
                    ? "Executing..."
                    : config.submitLabel || "Submit"}
            </button>

        </form>
    );
}
