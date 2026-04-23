export type SubmitResponse =
    { type: 'wrong'; playerName: string} | { type: 'error'; message: string};

export interface WinRes {
    playerName: string;
    solution: string;
}

export interface LoseRes {
    playerName: string;
    solution: string;
}
