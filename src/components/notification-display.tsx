// components/notification-display.tsx
import { useSignalR } from '@/provider/signalr-provider';
import { NotificationEnum } from "@/models/common/notification-message";

export default function NotificationDisplay() {
    const { notifications } = useSignalR();

    return (
        <div className="p-5">
            <div className="font-medium  h-full ">Notifications</div>
            {notifications.map((notification, index) => (
                <div
                    key={index}
                    className={`p-4 rounded shadow-lg text-white ${notification.NotificationType === NotificationEnum.BacktestStart ||
                            notification.NotificationType === NotificationEnum.OptimizeStart
                            ? "bg-blue-500"
                            : notification.NotificationType === NotificationEnum.BacktestStop ||
                                notification.NotificationType === NotificationEnum.OptimizeStop
                                ? "bg-green-500"
                                : "bg-gray-500"
                        }`}
                >
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
