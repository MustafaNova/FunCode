import { GetLevelCmd } from '../../use-cases/getLevel/getLevel.cmd';
import { LevelModel } from '../../../domain/value-objects/level.model';

export interface GetLevelPort {
    execute(cmd: GetLevelCmd): LevelModel;
}
