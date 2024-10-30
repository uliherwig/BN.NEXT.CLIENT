export function firstOrDefault<T>(array: T[], defaultValue: T): T {
    if (!array) {
        return defaultValue;
    }
    return array.length > 0 ? array[0] : defaultValue;
}

export const formatUSD = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});