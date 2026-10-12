export const QUICK_MESSAGES = [
    'Good luck!',
    'Wow!',
    'GG!',
    '💀',
    '❤️',
    '😂'
] as const;

export type QuickMessage = typeof QUICK_MESSAGES[number];

export type MatchMessagePayload = {
    message: QuickMessage;
};

export function isQuickMessage(value: unknown): value is QuickMessage {
    return typeof value === 'string' &&
        (QUICK_MESSAGES as readonly string[]).includes(value);
}