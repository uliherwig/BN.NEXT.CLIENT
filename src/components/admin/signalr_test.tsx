"use client";
import { useEffect, useState } from 'react';
import { useDictionary } from '@/provider/dictionary-provider';
import 'react-toastify/dist/ReactToastify.css';
import CircularLoader from "@/components/common/loader";
import WidgetButton from '../common/buttons/widget-button';
import { authorizedFetch, basicFetch } from '@/app/lib/fetchFunctions';
import signalRService from '@/service/signalr-service';
import { NotificationEnum, NotificationMessage } from '@/models/common/notification-message';
import { useSession } from 'next-auth/react';



const SignalRTest: React.FC = () => {

    const dictionary = useDictionary();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(false);
    }, []);



    const handleTestSignalR = async () => {
        // Implement SignalR test logic here
        console.log("Testing SignalR connection...");

        const endpoint = `/api/admin/test`;

        const data = await basicFetch<string>(endpoint);
        console.log('DATA', data);

    }



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

                        <WidgetButton label="Test SignalR" type="button" method={handleTestSignalR} />


                    </div>

                )}
            </div>
        </div>
    );

}

export default SignalRTest;