"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import signalRService from "@/app/service/signalr-service";
import { NotificationMessage } from "@/app/models/common/notification-message";
import { useSession } from "next-auth/react";

interface SignalRContextType {
    notifications: NotificationMessage[];
    isConnected: boolean;
}

const SignalRContext = createContext<SignalRContextType>({
    notifications: [],
    isConnected: false,
});

export const SignalRProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [notifications, setNotifications] = useState<NotificationMessage[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const { data: session, status } = useSession()


    useEffect(() => {
        const endpoint = process.env.NEXT_PUBLIC_NOTIFICATION_HUB?.toString() || "";
        console.log("SignalR Endpoint:", endpoint);
        const connect = async () => {
            await signalRService.startConnection(endpoint);
            setIsConnected(true);
        };
        connect();

        const handleMessage = (message: string) => {
            console.log("Received message:", message);
            try {
                const notification: NotificationMessage = JSON.parse(message);
                setNotifications((prev) => [...prev, notification]);
            } catch (err) {
                console.error("Failed to parse message:", err);
            }
        };

        signalRService.addMessageListener(handleMessage);

        return () => {
            signalRService.removeMessageListener(handleMessage);
            signalRService.stopConnection();
        };
    }, []);

    useEffect(() => {
        if (status === "authenticated") {
            if (session.user.id) {
                signalRService.registerNotificationFeed(session.user.id || "");
            }
        }    
    }, [status, session]);

    return (
        <SignalRContext.Provider value={{ notifications, isConnected }}>
            {children}
        </SignalRContext.Provider>
    );
};

export const useSignalR = () => useContext(SignalRContext);
