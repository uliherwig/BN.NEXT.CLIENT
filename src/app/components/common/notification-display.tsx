// components/notification-display.tsx
import { useSignalR } from '@/app/provider/signalr-provider';
import { NotificationEnum } from "@/app/models/common/notification-message";
import { useEffect } from 'react';

export default function NotificationDisplay() {
    const { notifications } = useSignalR();
    useEffect(() => {
        console.log("Notifications updated:", notifications);
    }, [notifications]);

    return (
        <div className="p-3 space-y-1 h-full border-t-slate-200 overflow-y-auto">
            <div className="font-medium">Notifications</div>       
            {notifications.map((notification, index) => (
                <div
                    key={index}
                    className={`p-1 rounded shadow-lg text-white ${notification.NotificationType === NotificationEnum.BacktestStart ||
                            notification.NotificationType === NotificationEnum.OptimizeStart
                            ? "bg-blue-500"
                            : notification.NotificationType === NotificationEnum.BacktestStop ||
                                notification.NotificationType === NotificationEnum.OptimizeStop
                                ? "bg-green-500"
                                : "bg-gray-500"
                        }`}>
                    <p>{NotificationEnum[notification.NotificationType]}</p>
                    <p className="text-xs opacity-80">
                        {new Date(notification.Timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                        })}
                    </p>
                </div>
            ))}
        </div>
    );
}
