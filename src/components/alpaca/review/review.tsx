"use client";
import { useEffect, useState } from 'react';
import { useDictionary } from '@/provider/dictionary-provider';
import 'react-toastify/dist/ReactToastify.css';
import CircularLoader from "@/components/common/loader";

interface ReviewProps {
    test: string
}

const Review: React.FC = () => {

    const dictionary = useDictionary();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
       setLoading(false);
    }, []);


    return (
        <div className="component-container">
            <div className="text-component-head mb-2">Strategy Review</div>
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

export default Review;