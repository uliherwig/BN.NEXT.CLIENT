// services/signalRService.js
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import type { HubConnection } from '@microsoft/signalr';

interface SignalRService {
    startConnection: (url: string) => Promise<void>;
    getConnection: () => HubConnection;
    registerNotificationFeed: (userId: string) => Promise<void>;
}

let connection: HubConnection | null = null;

const createConnection = (url: string) => {
    return new HubConnectionBuilder()
        .withUrl(url)
        .configureLogging(LogLevel.Information)
        .withAutomaticReconnect()
        .build();
};

const signalRService: SignalRService = {
    startConnection: async (url: string) => {
        connection = createConnection(url);

        try {
            await connection.start();
            console.log('SignalR Connected.');
        } catch (err) {
            console.log(err);
            setTimeout(() => signalRService.startConnection(url), 5000); // Try to reconnect after 5 seconds
        }
    },
    getConnection: () => {
        if (!connection) {
            throw new Error('SignalR connection not established. Call startConnection first.');
        }
        return connection;
    },
    registerNotificationFeed: async (userId) => {
        if (connection?.state === "Connected" && userId !== "") {
            await connection.send("RegisterNotificationFeed", userId);
        }
    }
};
export default signalRService;



// const startConnection = async (url : string) => {
//   connection = createConnection(url);

//   try {
//     await connection.start();
//     console.log('SignalR Connected.');
//   } catch (err) {
//     console.log(err);
//     setTimeout(() => startConnection(url), 5000); // Try to reconnect after 5 seconds
//   }
// };

// const getConnection = () => {
//   if (!connection) {
//     throw new Error('SignalR connection not established. Call startConnection first.');
//   }
//   return connection;
// };

// export { startConnection, getConnection };
