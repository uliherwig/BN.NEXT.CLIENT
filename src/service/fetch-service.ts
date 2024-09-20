

export const fetchService = {   

    async nextJsPost(endpoint: string, body?: any) : Promise<any> {
    
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
    },   

    async nextJsGet(endpoint: string): Promise<any> { 

        const res = await fetch(endpoint);
        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }
        return await res.json();

    },

    //  async nextJsGetCached<returnType>(endpoint: string, minutes: number = 60): Promise<returnType> {
    //     const cache: { [key: string]: { data: any; timestamp: number } } = {};

    //     const CACHE_DURATION = minutes * 60 * 1000; 
    
    //     console.log('CACHE_DURATION', CACHE_DURATION);
    //     console.log('cache1:', cache[endpoint] !== undefined);
    
    //     const now = Date.now();
    
    //     if (cache[endpoint] && (now - cache[endpoint].timestamp < CACHE_DURATION)) {
    //         return cache[endpoint].data;
    //     }
    
    //     // Fetch the data from the endpoint
    //     const res = await fetch(endpoint);
    //     if (!res.ok) {
    //         throw new Error('Failed to fetch data');
    //     }
    //     const data = await res.json();
    
    //     // Store the response in the cache with the current timestamp
    //     cache[endpoint] = { data, timestamp: now };
    //     return data;
    // }
};