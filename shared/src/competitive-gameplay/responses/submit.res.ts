export type SubmitResponse = {
    playerName: string
}

export interface WinRes {
    playerName: string;
}

export interface LoseRes {
    playerName: string;
    solution: string;
}
