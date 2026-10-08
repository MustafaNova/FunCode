export const QUICK_MESSAGES = [
    'Good luck!',
    'Nice!',
    'So close!',
    'Wow!',
    'GG!',
] as const;

export type QuickMessage = typeof QUICK_MESSAGES[number];

export type MatchMessagePayload = {
    message: QuickMessage;
};