"use client";
import { useEffect, useState } from 'react';
import { useDictionary } from '@/provider/dictionary-provider';
import 'react-toastify/dist/ReactToastify.css';
import CircularLoader from "@/components/common/loader";
import { basicFetch } from '@/app/lib/fetchFunctions';
import { AiModel } from '@/models/strategy/ai-model';
import { firstOrDefault } from '@/utilities';
import { TimeFrameEnum } from '@/models/strategy/enums';

interface AiModelsListProps {    
    setModel: (model: AiModel | null) => void
}

const AiModelsList: React.FC<AiModelsListProps> = ({ setModel }) => {
    const dictionary = useDictionary();

    const [loading, setLoading] = useState<boolean>(true);
    const [models, setModels] = useState<AiModel[]>([]);

    const handleRowClick = (model: AiModel) => {
        setModel(model);
    }

    const loadModels = async () => {
        const models = await basicFetch<AiModel[]>(`/api/ai/`);
        setModels(models || []);
        
        if(models && models.length > 0){
            setModel(firstOrDefault(models));
        }


        setLoading(false);
    }

    useEffect(() => {
        loadModels();        
    }, []);

    const TABLE_HEAD = ['Name', 'TimeFrame', 'Return',   ''];

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
                                        <td className=" py-1 text-center">{TimeFrameEnum[item.execution_params.time_frame]}</td>
                                        <td className="py-1 text-center">
                                            {item.total_return_percentage.toFixed(2)}%
                                        </td> 
                                        <td className=" py-1 text-center">
                                            <button className="text-blue-600 hover:underline" onClick={() => handleRowClick(item)}>Test</button>
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