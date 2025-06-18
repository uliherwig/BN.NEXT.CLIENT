'use client'
import { useEffect } from 'react';
import { NotificationService } from '@/service/notification-service';

const PushNotification = () => {
 
  useEffect(() => {
    const notificationService = new NotificationService();
    notificationService.requestPermission();
    notificationService.subscribeToPush();
  }, []);

  return null;
};

export default PushNotification;
