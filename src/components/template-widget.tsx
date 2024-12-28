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
                        {/* Your code here */}
                    </div>
                )}
            </div>
        </div>
    );

}

export default WidgetTemplate;