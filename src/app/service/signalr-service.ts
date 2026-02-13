// services/signalr-service.ts
import * as signalR from "@microsoft/signalr";

class SignalRService {
    private connection: signalR.HubConnection | null = null;
    private listeners: ((message: string) => void)[] = [];
    private isConnecting: boolean = false;

    async startConnection(endpoint: string): Promise<void> {

        console.log("Creating SignalR connection to:", endpoint);
        if (this.connection && (this.connection.state === signalR.HubConnectionState.Connected || this.isConnecting)) {
            console.warn("SignalR connection is already started or starting.");
            return;
        }
        this.isConnecting = true;
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(endpoint)
            .withAutomaticReconnect()
            .build();

        this.connection.on("ReceiveNotification", (message: string) => {
            this.listeners.forEach((listener) => listener(message));
        });

        try {
            await this.connection.start();
            console.log("SignalR Connected.");
        } catch (err) {
            console.error("SignalR Connection Error: ", err);
        } finally {
            this.isConnecting = false;
        }
    }

    addMessageListener(listener: (message: string) => void): void {
        this.listeners.push(listener);
    }

    removeMessageListener(listener: (message: string) => void): void {
        this.listeners = this.listeners.filter((l) => l !== listener);
    }

    async registerNotificationFeed(userId: string): Promise<void> {
        if (this.connection?.state === signalR.HubConnectionState.Connected && userId !== "") {
            await this.connection.send("RegisterNotificationFeed", userId);
        }
    }

    getConnection(): signalR.HubConnection | null {
        return this.connection;
    }

    stopConnection(): void {
        if (this.connection) {
            this.connection.stop();
            this.connection = null;
        }
    }
}

const signalRService = new SignalRService();
export default signalRService;
