"use client";
import {
    Panel,
    Group,
    Separator
} from "react-resizable-panels";
import NotificationDisplay from "./notification-display";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    
    return (
        <Group>      
            <Panel defaultSize={85}>{children}</Panel>
        
            <Panel defaultSize={15} >
                <NotificationDisplay/>
            </Panel>
        </Group>
    );
}