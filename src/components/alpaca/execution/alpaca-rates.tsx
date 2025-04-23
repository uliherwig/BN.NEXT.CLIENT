"use client";
import { useEffect, useState } from 'react';
import {
    HubConnection,
    HubConnectionBuilder,
    LogLevel,
} from "@microsoft/signalr";
import { useDictionary } from '@/provider/dictionary-provider';
import 'react-toastify/dist/ReactToastify.css';
import CircularLoader from "@/components/common/loader";
import { useSession } from 'next-auth/react';
import { set } from 'date-fns';

interface AlpacaRatesProps {
    asset: string
}
type Message = {
    sender: string;
    content: string;
    sentTime: Date;
};
const AlpacaRates: React.FC<AlpacaRatesProps> = ({ asset }) => {

    const dictionary = useDictionary();
    const { data: session, status } = useSession()
    const [loading, setLoading] = useState<boolean>(true);
    const [connection, setConnection] = useState<HubConnection | null>(null);
    const [userId, setUserId] = useState<string>("");
    const [quote, setQuote] = useState<any>({});

    useEffect(() => {
        const connect = new HubConnectionBuilder()
            //.withUrl(`${process.env.ALPACA_HUB}`)
            .withUrl("http://localhost:5130/alpacahub")
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();
        setConnection(connect);
        connect
            .start()
            .then(() => {
                connect.on("ReceiveQuote", (sender, content, sentTime) => {
                    setQuote(sender.quotes[0]);
                });
            })
            .catch((err) =>
                console.error("Error while connecting to SignalR Hub:", err)
            );

        return () => {
            if (connection) {
                connection.off("ReceiveQuote");
            }
        };
    }, []);

    const registerRateFeed = async () => {
        if (connection && userId !== "") {
            await connection.send("RegisterRateFeed", userId);
        }
    };

    useEffect(() => {
        if (status === "authenticated") {
            if (session?.user?.name) {
                setUserId(session?.user?.id || "");
            }
            if (asset !== "") {
                registerRateFeed();
            }
        }
        if (asset === "") {
            setQuote({});
        }
        setLoading(false);
    }, [status, asset]);


    if (!dictionary) {
        return <div>Loading...</div>;
    }
    return (
        <div className="component-container">
            <div className="text-component-head mb-2">Alpaca Rate</div>
            <div className="h-[95%] w-full overflow-hidden">
                {loading && (
                    <CircularLoader />
                )}
                {!loading && (
                    <div className="h-full overflow-auto">
                        {asset !== "" && (
                            <div>
                                Asset: {asset}  ASK: {quote.askPrice}  BID: {quote.bidPrice}
                            </div>)}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AlpacaRates;