"use client";
import { useEffect, useState } from 'react';
import { useDictionary } from '@/provider/dictionary-provider';
import 'react-toastify/dist/ReactToastify.css';
import CircularLoader from "@/components/common/loader";

interface WidgetTemplateProps {
    test: string
}

const WidgetTemplate: React.FC<WidgetTemplateProps> = ({ test }) => {

    const dictionary = useDictionary();
    
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
       setLoading(false);
    }, []);

    const TABLE_HEAD = ['Column 1', 'Column 2', 'Column 3', 'Column 4', 'Column 5', 'Column 6'];

    if (!dictionary) {
        return <div>Loading...</div>;
    }
    return (
        <div className="component-container">
            <div className="text-component-head mb-2">Widget Template</div>
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
                                            <th key={column} className={index === 0 ? "px-2 py-1 text-left" : "px-2 py-1 text-cente" }>
                                                {column}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className='text-slate-800 text-sm overflow-y' >
                                    {TABLE_HEAD.map((item, index) => (
                                        <tr key={index} className={`hover:bg-zinc-200 ${index % 2 === 1 ? 'bg-gray-100' : 'bg-white'}`} >
                                            <td className="px-2 py-1 text-center"></td>
                                            <td className=" py-1 text-center"></td>
                                            <td className="ppy-1 text-center">
                                            </td>
                                            <td className=" py-1 text-center">
                                            </td>
                                            <td className=" py-1 text-center">
                                            </td>
                                            <td className="text-center">                                 
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

export default WidgetTemplate;