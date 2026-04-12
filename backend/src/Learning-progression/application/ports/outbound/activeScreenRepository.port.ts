import { Course } from '../../../domain/enums';
import { ActiveScreen } from '../../../domain/entities/activeScreen';

export interface ActiveScreenRepositoryPort {
    updateActiveScreen(
        userId: string,
        course: Course,
        module: string,
    ): Promise<void>;
    findByUserId(userId: string): Promise<ActiveScreen>;
}
