// services/NotificationService.ts
import webpush, { PushSubscription } from 'web-push';

interface NotificationData {
  title: string;
  body: string;
}

export class NotificationService {
  private vapidKeys: { publicKey: string; privateKey: string };

  constructor() {
    this.vapidKeys = {
      publicKey: process.env.NEXT_PUBLIC_VAPID_KEY!,
      privateKey: process.env.VAPID_PRIVATE_KEY!,
    };

    webpush.setVapidDetails(
      'mailto:your-email@example.com',
      this.vapidKeys.publicKey,
      this.vapidKeys.privateKey
    );
  }

  public async requestPermission(): Promise<void> {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      } else {
        console.log('Unable to get permission.');
      }
    }
  }

  public async subscribeToPush(): Promise<PushSubscription | null> {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(this.vapidKeys.publicKey),
      });

      // Send subscription to your backend
      await fetch('/api/save-subscription', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return subscription;
    } catch (error) {
      console.error('Failed to subscribe to push notifications:', error);
      return null;
    }
  }

  public async sendPushNotification(subscription: PushSubscription, data: NotificationData): Promise<void> {
    try {
      await webpush.sendNotification(subscription, JSON.stringify(data));
    } catch (err) {
      console.error('Error sending notification:', err);
    }
  }

  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
  }
}
