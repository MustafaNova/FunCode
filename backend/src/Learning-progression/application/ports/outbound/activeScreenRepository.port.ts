import { ActiveScreen } from '../../../domain/entities/activeScreen';
import { Course } from '@funcode/shared';

export interface ActiveScreenRepositoryPort {
    initActiveScreen(
        userId: string,
        course: Course,
    ): Promise<void>;
    findByUserId(userId: string): Promise<ActiveScreen>;
}
