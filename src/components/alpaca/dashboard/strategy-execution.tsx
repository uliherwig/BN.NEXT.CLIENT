import { useDictionary } from "@/provider/dictionary-provider";
import { Position } from "@/models/strategy/position";
import { useState } from "react";
const StrategyExecution: React.FC = () => {
    const dictionary = useDictionary();
    const [positions, setPositions] = useState<Position[]>([]);
    
    if (!dictionary) {
        return <div>Loading...</div>;
    }
    
    const TABLE_HEAD = ["Side", "Start", "Stop", "Signal", "Profit/Loss", "Actions"];
    return (
        <>
        <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
            <div className="text-component-head">Start Strategy Execution</div>
            </div>
        </div>
        </>
    );
    }

export default StrategyExecution;