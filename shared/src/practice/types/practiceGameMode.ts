export const PRACTICE_GAME_MODES = [
    'bug-hunter',
    'code-golf',
] as const;

export type PracticeGameMode =
    typeof PRACTICE_GAME_MODES[number];