"use client";
import { useEffect, useState } from 'react';
import { useDictionary } from '@/app/provider/dictionary-provider';
import CircularLoader from "@/app/components/common/loader";
import { basicFetch } from '@/app/lib/fetchFunctions';
import { StrategySettingsDto } from '@/app/models/strategy/strategy-settings-dto';

interface AiModelsListProps {    
    setModel: (model: StrategySettingsDto | null) => void
}

const AiModelsList: React.FC<AiModelsListProps> = ({ setModel }) => {
    const dictionary = useDictionary();

    const [loading, setLoading] = useState<boolean>(true);
    const [models, setModels] = useState<StrategySettingsDto[]>([]);

    const handleRowClick = (model: StrategySettingsDto) => {
        setModel(model);
    }

    const loadModels = async () => {

        const dtos = await basicFetch<StrategySettingsDto[]>(`/api/ai/`);    
        setModels(dtos);
        setLoading(false);
    }

    useEffect(() => {
        loadModels();        
    }, []);

    const TABLE_HEAD = ['Strategy', 'Broker', 'Asset', ''];

    if (!dictionary) {
        return <div>Loading...</div>;
    }
    return (
        <div className="component-container">
            <div className="text-component-head mb-2">AI Model List</div>
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
                                        <th key={column} className={index === 0 ? "px-2 py-1 text-left" : "px-2 py-1 text-center"}>
                                            {column}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className='text-slate-800 text-sm overflow-y' >
                                {models.map((item, index) => (
                                    <tr key={index} className={`hover:bg-zinc-200 ${index % 2 === 1 ? 'bg-gray-100' : 'bg-white'}`} >
                                        <td className="px-2 py-1">{item.name}</td>
                                        <td className=" py-1 text-center">{item.broker}</td>
                                        <td className="py-1 text-center">
                                            {item.asset}
                                        </td> 
                                        <td className=" py-1 text-center">
                                            <button className="text-blue-600 hover:underline" onClick={() => handleRowClick(item)}>Select</button>
                                        </td>
                                      
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

export default AiModelsList;