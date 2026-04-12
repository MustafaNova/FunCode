import { GetActiveScreenRes } from '../../use-cases/getActiveScreen/getActiveScreen.res';

export interface GetActiveScreenPort {
    getActiveScreen(userId: string): Promise<GetActiveScreenRes>;
}
