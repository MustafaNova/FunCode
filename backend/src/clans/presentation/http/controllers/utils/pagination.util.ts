
export function toPageNumber(page: string) {
    return Math.max(Number(page) || 1, 1);
}

export function toLimitNumber(limit: string) {
    return Math.min(Math.max(Number(limit) || 20, 1), 50);
}