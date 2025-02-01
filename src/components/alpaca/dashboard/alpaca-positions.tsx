import { useDictionary } from "@/provider/dictionary-provider";
import { PositionModel } from "@/models/strategy/position-model";
import { useState } from "react";

const AlpacaPositions: React.FC = () => {

    const dictionary = useDictionary();
    const [positions, setPositions] = useState<PositionModel[]>([]);


    if (!dictionary) {
        return <div>Loading...</div>;
    }

    const TABLE_HEAD = ["Side", "Start", "Stop", "Signal", "Profit/Loss", "Actions"];
    return (
        <>
            <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                    <div className="text-component-head">Alpaca Positions</div>
          
                </div>
            </div>
        </>
    );
}
export default AlpacaPositions;