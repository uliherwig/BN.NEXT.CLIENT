"use client"; // Mark as Client Component

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { StrategySettings } from "@/app/models/strategy/strategy-settings";
import { StrategyTypeEnum } from "../models/strategy/enums";
import { basicFetch } from "../lib/fetchFunctions";

interface StrategyCollection {
    items: StrategySettings[];
}

interface StrategyContextType {
    collection: StrategyCollection;
    updateCollection: (newCollection: StrategyCollection) => void;
}

const StrategyContext = createContext<StrategyContextType | undefined>(undefined);

export const StrategyProvider = ({ children }: { children: React.ReactNode }) => {
    const [collection, setCollection] = useState<StrategyCollection>({ items: [] });

    const updateCollection = (newCollection: StrategyCollection) => {
        console.log("Updating strategy collection", newCollection);
        setCollection(newCollection);
    };

    // Memoize the context value to prevent unnecessary re-renders
    const contextValue = useMemo(
        () => ({ collection, updateCollection }),
        [collection]
    );

    useEffect(() => {
        const fetchStrategies = async () => {
            const strats = await basicFetch<StrategySettings[]>(`/api/strategy/list?strategyType=${StrategyTypeEnum.IndicatorBased}&showBookmarked=${false}`);
            updateCollection({
                items: strats
            });
        };
        fetchStrategies();
    }, []); // Empty dependency array to run only once on mount

    return (
        <StrategyContext.Provider value={contextValue}>
            {children}
        </StrategyContext.Provider>
    );
};

export const useStrategy = () => {
    const context = useContext(StrategyContext);
    if (!context) throw new Error("useStrategy must be used within a StrategyProvider");
    return context;
};
