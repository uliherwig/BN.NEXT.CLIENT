import { basicFetch } from "@/app/lib/fetchFunctions";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export function SessionErrorHandler() {
    const { data: session } = useSession();

    useEffect(() => {

        const signoutOptions = {
            callbackUrl: '/auth/account',
            redirect: false,
        };
        console.log("Session Error Handler:", session);


        const testAuth = async () => {
            if (session === null || session === undefined) {                
                await signOut(signoutOptions);
                window.location.href = '/auth/account?info=expired';
            } else {
                const res = await basicFetch<any>(`/api/identity`);
                console.log("Session Error Handler response:", res);
                if (res.error && res.error === 'Unauthorized') {
                    await signOut(signoutOptions);
                    window.location.href = '/auth/account?info=expired';
                }
            }
        };
        testAuth();
    }, [session]);
    return (<></>);
}