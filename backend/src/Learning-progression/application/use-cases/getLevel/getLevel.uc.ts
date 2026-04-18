import { GetLevelPort } from '../../ports/inbound/getLevel.port';
import { GetLevelCmd } from './getLevel.cmd';
import { LevelRepositoryPort } from '../../ports/outbound/level.repository.port';
import { LevelModel } from '../../../domain/value-objects/level.model';

export class GetLevelUC implements GetLevelPort {
    constructor(private readonly levelRepo: LevelRepositoryPort) {}

    execute(cmd: GetLevelCmd): LevelModel {
        return this.levelRepo.getLevel(cmd.course, cmd.module, cmd.level);
    }
}
