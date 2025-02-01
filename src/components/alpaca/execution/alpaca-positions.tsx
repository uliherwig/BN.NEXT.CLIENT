"use client";
import { useEffect, useState } from 'react';
import { useDictionary } from '@/provider/dictionary-provider';
import 'react-toastify/dist/ReactToastify.css';
import CircularLoader from "@/components/common/loader";
import { AccountStatusEnum } from '@/models/alpaca/enums';
import { PositionModel } from '@/models/strategy/position-model';
import { SideEnum } from '@/models/strategy/enums';
import { format } from 'date-fns';


interface AlpacaPositionsProps {
    alpacaAccountStatus: AccountStatusEnum,
}

const AlpacaPositions: React.FC<AlpacaPositionsProps> = (props) => {
    const dictionary = useDictionary();

    const [loading, setLoading] = useState<boolean>(true);
    const [positions, setPositions] = useState<PositionModel[]>([]);

    useEffect(() => {


        if (props.alpacaAccountStatus) {
            if (props.alpacaAccountStatus === AccountStatusEnum.AccountLoaded) {

                const fetchPositions = async () => {
                    const res = await fetch('/api/alpaca/positions');
                    const data = await res.json();
                    setPositions(data);

                    console.log(data);
                    setLoading(false);
                }
                fetchPositions();
            } else {
                setLoading(false);
            }
        }
    }, [props.alpacaAccountStatus]);

    const TABLE_HEAD = ["Side", "Start", "Stop", "Open", "Close", "SL", "TP", "Closed By", "Profit/Loss"];

    if (!dictionary) {
        return <div>Loading...</div>;
    }



    return (
        <div className="component-container">
            <div className="text-component-head mb-2">Alpaca Positions</div>
            <div className="h-[95%] w-full overflow-hidden">
                {loading && (
                    <CircularLoader />
                )}
                {!loading && (
                    <div className="h-full overflow-auto">
                        {/* example table */}

                        <table className="min-w-full table-fixed border">
                            <thead className="bg-slate-700 sticky top-[-2px] z-50" >
                                <tr className='text-white text-xs'>
                                    {TABLE_HEAD.map((column, index) => (
                                        <th key={column} className={index === 0 ? "px-2 py-1 text-left" : "px-2 py-1 text-cente"}>
                                            {column}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className='text-slate-800 text-sm overflow-y' >
                                {positions.map((pos, index) => (
                                    <tr key={index} className={`hover:bg-zinc-200 ${index % 2 === 1 ? 'bg-gray-100' : 'bg-white'}`} >
                                        <td className="px-2 py-1 text-left">{SideEnum[pos.side]}</td>
                                        <td className=" py-1 text-center">{pos.stampOpened ? format(new Date(pos.stampOpened), 'dd.MM.yy HH:mm') : 'N/A'}</td>
                                        <td className="py-1 text-center">{pos.stampClosed ? format(new Date(pos.stampClosed), 'dd.MM.yy HH:mm') : 'N/A'}</td>
                                        <td className=" py-1 text-center">{pos.priceOpen}</td>
                                        <td className=" py-1 text-center">{pos.priceClose}</td>
                                        <td className="text-center">{pos.stopLoss}</td>
                                        <td className="text-center">{pos.takeProfit}</td>
                                        <td className="text-center">{pos.closeSignal}</td>
                                        <td className="text-center">{pos.profitLoss}</td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );

}

export default AlpacaPositions;