export const basicFetch = async<returnType>(endpoint: string, token: string = ''): Promise<returnType> => {

    const res = await fetch(endpoint, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    // if (!res.ok) {
    //     console.log('Error fetching data:', res.statusText + ' ' + endpoint);
    //     throw new Error(`Error fetching data: ${res.statusText}`);
    // }
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

const cache: { [key: string]: { data: any; timestamp: number } } = {};
