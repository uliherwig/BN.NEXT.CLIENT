"use client";
import { useEffect, useState } from 'react';
import { useDictionary } from '@/app/provider/dictionary-provider';
import 'react-toastify/dist/ReactToastify.css';
import { useMessagesStore } from '@/app/store/useMessagesStore';

import { useSession } from 'next-auth/react';
import { set } from 'date-fns';
import signalRService from '@/app/service/signalr-service';
import { NotificationEnum, NotificationMessage } from '@/app/models/common/notification-message';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { DisplayMessage } from '@/app/models/common/display-message';

interface NofificationBoxProps {
    test: string
}



const NofificationBox: React.FC<NofificationBoxProps> = ({ test }) => {

    const dictionary = useDictionary();
    const { data: session, status } = useSession()
    const [loading, setLoading] = useState<boolean>(true);
    const [expanded, setExpanded] = useState<boolean>(true);

    const messages = useMessagesStore((state) => state.messages);
    const addMessage = useMessagesStore((state) => state.addMessage);

    const toggleMenu = () => {
        setExpanded(!expanded);
    }

    useEffect(() => {
        if (status === "authenticated") {
            if (session.user.id) {
                signalRService.registerNotificationFeed(session.user.id || "");
            }
        }

        setLoading(false);
    }, [status, session]);

    useEffect(() => {
        setLoading(false);
    }, []);


    if (!dictionary) {
        return <div>Loading...</div>;
    }
    return (
        <div className="w-[20%] bg-slate-400 text-white overflow-y-auto border-x border-slate-600">

            <div className="grid grid-cols-[20px_auto] gap-2 cursor-pointer bg-slate-900 p-1" onClick={toggleMenu}>

                {!expanded ? (
                    <KeyboardArrowDownIcon />
                ) : (
                    <KeyboardArrowUpIcon />
                )}
                <div className="font-medium  h-full">Notifications</div>
            </div>
            <div className={`list-disc ${expanded ? 'h-[200px]' : 'hidden'}`}>
                <ul>
                    {messages.map((message, index) => (
                        <li key={index}>{message.CreatedAt} {message.Message}</li>
                    ))}
                </ul>
            </div>

        </div>
    );

}

export default NofificationBox;