"use client";
import { useEffect, useState } from 'react';
import { useDictionary } from '@/provider/dictionary-provider';
import 'react-toastify/dist/ReactToastify.css';
import CircularLoader from "@/components/common/loader";
import { AccountStatusEnum } from '@/models/alpaca/enums';
import { AlpacaPositionModel } from '@/models/alpaca/alpaca-position-model';


interface AlpacaPositionsProps {
    alpacaAccountStatus: AccountStatusEnum,
}

const AlpacaPositions: React.FC<AlpacaPositionsProps> = (props) => {
    const dictionary = useDictionary();

    const [loading, setLoading] = useState<boolean>(true);
    const [positions, setPositions] = useState<AlpacaPositionModel[]>([]);

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

    const TABLE_HEAD = ["Asset", "Price", "Qty", "Market Value", "Cost Basis", "P/L (%)", "P/L ($)"];

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
                                {positions.map((position, index) => (
                                    <tr key={position.symbol} className={`hover:bg-zinc-200 ${index % 2 === 1 ? 'bg-gray-100' : 'bg-white'}`} >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{position.symbol}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{position.price}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{position.quantity}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{position.marketValue}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{position.costBasis}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{position.unrealizedProfitLossPercent} %</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{position.unrealizedProfitLoss} $</td>
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