import { Course } from '../../../domain/enums';

export interface ActiveScreenRepositoryPort {
    updateActiveScreen(
        userId: string,
        course: Course,
        module: string,
    ): Promise<void>;
}
