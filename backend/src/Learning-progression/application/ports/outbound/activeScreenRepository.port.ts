import { ActiveScreen } from '../../../domain/entities/activeScreen';
import { Course } from '@funcode/shared';

export interface ActiveScreenRepositoryPort {
    updateActiveScreen(
        userId: string,
        course: Course,
        module: string,
    ): Promise<void>;
    findByUserId(userId: string): Promise<ActiveScreen>;
}
