export function firstOrDefault<T>(array: T[], defaultValue: T): T {
    if (!array) {
        return defaultValue;
    }
    return array.length > 0 ? array[0] : defaultValue;
}