import { LevelRepositoryPort } from '../../../application/ports/outbound/level.repository.port';
import { Course } from '@funcode/shared';
import { LevelModel } from '../../../domain/value-objects/level.model';


export class LevelRepositoryAdapter implements LevelRepositoryPort {
    getLevel(course: Course, module: string, level: number): LevelModel {

    }
}
