import { levelOne } from './Full-Stack-Web-Developer/Introduction Web-development/lvl1/lvl1';
import { LevelModel } from '../../../domain/value-objects/level.model';
import { Course } from '@funcode/shared';

export const LevelsMap: LevelsMapType = {
    'Full-Stack-Developer': {
        'Introduction Web-development': {
            1: levelOne,
        },
    },
};

type LevelsMapType = {
    [C in Course]: {
        [module: string]: {
            [level: number]: LevelModel;
        };
    };
};
