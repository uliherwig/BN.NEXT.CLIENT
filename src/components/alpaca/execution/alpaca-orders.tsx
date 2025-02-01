"use client";
import { useEffect, useState } from 'react';
import { useDictionary } from '@/provider/dictionary-provider';
import 'react-toastify/dist/ReactToastify.css';
import CircularLoader from "@/components/common/loader";
import { AlpacaOrderModel } from '@/models/alpaca/alpaca-order-model';
import { ExecutionModel } from '@/models/strategy/execution-model';
import { AccountStatusEnum } from '@/models/alpaca/enums';
import { format } from 'date-fns';

import { SideEnum } from '@/models/strategy/enums';

interface AlpacaOrdersProps {
    alpacaAccountStatus: AccountStatusEnum,
}

const AlpacaOrders: React.FC<AlpacaOrdersProps> = (props) => {

    const dictionary = useDictionary();



    const [loading, setLoading] = useState<boolean>(true);
    const [orders, setOrders] = useState<AlpacaOrderModel[]>([]);

    useEffect(() => {
        if(props.alpacaAccountStatus) {
            if (props.alpacaAccountStatus === AccountStatusEnum.AccountLoaded) {

                const fetchOrders = async () => {
                    const res = await fetch('/api/alpaca/orders');
                    const data = await res.json();
                    setOrders(data);
                     setLoading(false);
                }
                fetchOrders();
            } else {
               setLoading(false);  
            }
        }   
       
    }, [props.alpacaAccountStatus]);

    const TABLE_HEAD = ['Asset', 'Side', 'Qty', 'Price', 'At'];

    if (!dictionary) {
        return <div>Loading...</div>;
    }
    return (
        <div className="component-container">
            <div className="text-component-head mb-2">Alpaca Orders</div>
            <div className="h-[95%] w-full overflow-hidden">
                {loading && (
                    <CircularLoader />
                )}
                {!loading && (

                    <div className="h-full overflow-auto">
                        {orders.length === 0 && <div className="mt-5 text-slate-800">Auf Ihrem Alpaca Test Account sind keine Orders vorhanden.</div>}

                        {orders.length > 0 && (
                            <table className="min-w-full table-fixed border">
                                <thead className="bg-slate-700 sticky top-[-2px] z-50" >
                                    <tr className='text-white text-xs'>
                                        {TABLE_HEAD.map((column, index) => (
                                            <th key={column} className={index === 0 ? "px-2 py-1 text-left" : "px-2 py-1 text-cente" }>
                                                {column}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className='text-slate-800 text-sm overflow-y' >
                                    {orders.map((item, index) => (
                                        <tr key={item.orderId} className={`hover:bg-zinc-200 ${index % 2 === 1 ? 'bg-gray-100' : 'bg-white'}`} >
                                            <td className="px-2 py-1 text-left">{item.symbol}</td>
                                            <td className=" py-1 text-center">{SideEnum[item.orderSide] }</td>
                                            <td className="ppy-1 text-center">{item.filledQuantity}</td>                                            
                                            <td className=" py-1 text-center">{item.averageFillPrice}
                                            </td>
                                            <td className=" py-1 text-center"> {item.filledAtUtc ? format(new Date(item.filledAtUtc), 'dd.MM.yy HH:mm') : 'N/A'}
                                            </td>                                          
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}
            </div>
        </div>
    );

}

export default AlpacaOrders;