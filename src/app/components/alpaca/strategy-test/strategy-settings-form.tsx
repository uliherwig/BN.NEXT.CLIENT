"use client";
import useSWR from "swr";
import { runStrategy } from "@/app/actions/alpaca";
import React, { useEffect, useMemo, useState } from "react";
import { useDictionary } from "@/app/provider/dictionary-provider";
import { fetcher } from "@/app/lib/fetchFunctions";
import OptimizerModal from "./optimizer-modal";
import { IndicatorFormConfig, rsiFields, smaFields, wmaFields, emaFields, temaFields, macdFields, donchianFields, atrFields, rocFields, bbandsFields, breakoutFields, volaFields } from "@/app/lib/form-configs/indicator-form";
import { FormField } from "@/app/models/forms/standard";
import ConfigurableForm from "@/app/components/forms/configurable-form";

const indicatorSubForms: Record<string, FormField[]> = {
    "0": [],
    "1": smaFields,
    "2": emaFields,
    "3": wmaFields,
    "4": temaFields,
    "5": macdFields,
    "6": rsiFields,
    "7": donchianFields,
    "8": breakoutFields,
    "9": volaFields,
    "10": atrFields,
    "11": bbandsFields,
    "12": rocFields
}



interface StrategySettingsFormProps {
    updateStrategies: any;
}

const StrategySettingsForm: React.FC<StrategySettingsFormProps> = ({ updateStrategies }) => {
    const dictionary = useDictionary();

    const { data: assets } = useSWR("/api/alpaca/assets", fetcher);

    const assetOptions = useMemo(() => {
        if (!assets) return [];

        const firstEntry = { symbol: "", name: "Select an Asset" };

        return [firstEntry, ...assets].map(asset => ({
            label: asset.name,
            value: asset.symbol,
        }));
    }, [assets]);

    const formConfig = useMemo(() => {
        return {
            ...IndicatorFormConfig,
            fields: IndicatorFormConfig.fields.map(field =>
                field.name === "asset"
                    ? { ...field, options: assetOptions }
                    : field
            ),
        };
    }, [assetOptions]);


    // deprected - remove later
    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeDialog = () => {
        setIsModalOpen(false);
    }

    if (!dictionary) {
        return <div>{"Loading..."}</div>;
    }

    return (
        <>
            <div className="component-container">
                <div className="text-component-head">{dictionary.TEST_CREATE_NEW_STRATEGY}</div>

                <div className="w-full h-full overflow-y-auto pb-10">
                    <ConfigurableForm
                        config={formConfig}
                        indicatorMap={indicatorSubForms}
                        action={runStrategy}
                    />
                </div>

            </div>
            <OptimizerModal isOpen={isModalOpen} closeDialog={closeDialog} />
        </>
    );
}

export default StrategySettingsForm