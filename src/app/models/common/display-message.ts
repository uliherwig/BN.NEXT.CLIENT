import { NotificationEnum } from "./notification-message";

export interface DisplayMessage {
    Id: number; 
    NotificationType: NotificationEnum;
    Message: string;
    CreatedAt: string;
}