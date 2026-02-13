import { signOut } from "next-auth/react";

export const basicFetch = async<returnType>(endpoint: string): Promise<returnType> => {
    const res = await fetch(endpoint, {
        headers: {
            'Content-Type': 'application/json'
        }
    });  
    return await res.json();
}

export const authorizedFetch = async<returnType>(endpoint: string, token: string | undefined): Promise<returnType> => {

    console.log('authorizedFetch', endpoint, token);

    if(!token) {
        console.error('No token provided for authorizedFetch'); 
        signOut();
        throw new Error('No token provided');
    }

    const res = await fetch(endpoint, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    return await res.json();
}

export const basicPost = async<returnType>(
    endpoint: string,
    body?: any
): Promise<returnType> => {

    const method: string = 'POST';

    const options: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const res = await fetch(endpoint, options);
    const result = await res.json();
    return result;
};

export const fetcher = (url: string) => fetch(url).then(res => res.json());

