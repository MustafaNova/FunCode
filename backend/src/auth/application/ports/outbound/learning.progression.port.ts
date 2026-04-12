import { ActiveScreen } from '../../../domain/entitys/activeScreen';

export interface LearningProgressionPort {
    getActiveScreen(userId: string): Promise<ActiveScreen>;
}
