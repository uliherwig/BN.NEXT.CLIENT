import NodeCache from 'node-cache';

class CacheService {
    private cache: NodeCache;

    constructor(ttlSeconds: number) {
        this.cache = new NodeCache({ stdTTL: ttlSeconds });
    }

    get<T>(key: string): T | undefined {
        return this.cache.get<T>(key);
    }

    set<T>(key: string, value: T): void {
        this.cache.set(key, value);
    }

    del(key: string): void {
        this.cache.del(key);
    }

    flush(): void {
        this.cache.flushAll();
    }
}

export const cacheService = new CacheService(3600); // 1 day // TODO adjust in production