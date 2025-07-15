"use client";
import { useEffect, useState } from 'react';
import { useDictionary } from '@/provider/dictionary-provider';
import 'react-toastify/dist/ReactToastify.css';
import { useMessagesStore } from '@/store/useMessagesStore';

import { useSession } from 'next-auth/react';
import { set } from 'date-fns';
import signalRService from '@/service/signalr-service';
import { NotificationEnum, NotificationMessage } from '@/models/common/notification-message';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { DisplayMessage } from '@/models/common/display-message';

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
        const connectSignalR = async () => {

            const endpoint = process.env.NEXT_PUBLIC_NOTIFICATION_HUB?.toString() || "";
            await signalRService.startConnection(endpoint);

            const connection = signalRService.getConnection();

            connection.on('ReceiveNotification', (message) => {

                console.log("Received notification:", message);

                const notification: NotificationMessage = JSON.parse(message);
                const date = new Date(notification.Timestamp);
                const formatted = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

                const toPascalCase = (str: string) =>
                    str.charAt(0).toUpperCase() + str.slice(1);

                const notificationType = NotificationEnum[toPascalCase(notification.NotificationType.toString()) as keyof typeof NotificationEnum];
                const id = new Date().getTime().toString();
                const displayMessage: DisplayMessage = {
                    Id: new Date().getTime(),
                    NotificationType: notificationType,
                    Message: "",
                    CreatedAt: formatted
                };
                console.log("Notification Type:", notificationType);

                switch (notificationType) {
                    case NotificationEnum.StrategyStart:
                        displayMessage.Message = "Backtest Start"
                        addMessage(displayMessage);

                        break;
                    case NotificationEnum.StrategyStop:
                        displayMessage.Message = "Backtest Stop"
                        addMessage(displayMessage);
                        break;
                    case NotificationEnum.OtimizeStart:
                    case NotificationEnum.OptimizeStop:

                    default:
                        break;
                }






                const test = messages;
            });
        }
        connectSignalR();

        return () => {
            // Clean up the effect
            if (signalRService.getConnection()?.state === 'Connected') {
                signalRService.getConnection().stop();
            }
        };
    }, []);



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
        <div className="w-full bg-slate-400 text-white overflow-y-auto ">

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