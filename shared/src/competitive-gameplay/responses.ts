export interface SubmitRes {
    status: 'failed' | 'success';
    solution?: string;
    playerName: string;
}
