import { LevelRepositoryPort } from '../../../application/ports/outbound/level.repository.port';
import { Course } from '@funcode/shared';
import { LevelModel } from '../../../domain/value-objects/level.model';
import { Injectable } from '@nestjs/common';
import { CourseMapService } from '../levels-content/course.map';
import { LevelNotFoundException } from '../errors/levelNotFound.err';

@Injectable()
export class LevelRepositoryAdapter implements LevelRepositoryPort {
    getLevel(course: Course, module: string, level: number): LevelModel {
        const res = CourseMapService.getLevel(course, module, level);
        if (res == undefined) {
            throw new LevelNotFoundException();
        }
        return res;
    }
}
