export const basicFetch = async<returnType>(endpoint: string): Promise<returnType> => {

    console.log('endpoint:', endpoint);
    const res = await fetch(endpoint); 

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

export const fetchWithCache = async<returnType>(endpoint: string, minutes: number = 60): Promise<returnType> => {


    const CACHE_DURATION = minutes * 60 * 1000; // Cache duration in milliseconds 

    console.log('CACHE_DURATION', CACHE_DURATION);
    console.log('cache1:', cache[endpoint] !== undefined);

    const now = Date.now();

    // Check if the response is in the cache and not expired
    if (cache[endpoint] && (now - cache[endpoint].timestamp < CACHE_DURATION)) {
        return cache[endpoint].data;
    }

    // Fetch the data from the endpoint
    const res = await fetch(endpoint);
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    const data = await res.json();

    // Store the response in the cache with the current timestamp
    cache[endpoint] = { data, timestamp: now };
    return data;
}

export default fetchWithCache;