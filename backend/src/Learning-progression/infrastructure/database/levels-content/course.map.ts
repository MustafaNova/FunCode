import { levelOne } from './Full-Stack-Web-Developer/Introduction Web-development/lvl1';
import { LevelModel } from '../../../domain/value-objects/level.model';
import { Course } from '@funcode/shared';
import { levelTwo } from './Full-Stack-Web-Developer/Introduction Web-development/lvl2';
import { levelThree } from './Full-Stack-Web-Developer/Introduction Web-development/lvl3';
import { levelFive } from './Full-Stack-Web-Developer/Introduction Web-development/lvl5';
import { levelFour } from './Full-Stack-Web-Developer/Introduction Web-development/lvl4';
import { levelSix } from './Full-Stack-Web-Developer/Introduction Web-development/lvl6';
import { levelSeven } from './Full-Stack-Web-Developer/Introduction Web-development/lvl7';
import { levelEight } from './Full-Stack-Web-Developer/Introduction Web-development/lvl8';
import { levelNine } from './Full-Stack-Web-Developer/Introduction Web-development/lvl9_project';


export class CourseMapService {
    static CourseMap: CourseMapType = {
        'Full-Stack-Developer': {
            modules: [
                {
                    number: 1,
                    name: 'Introduction Web-development',
                    levels: {
                        1: levelOne,
                        2: levelTwo,
                        3: levelThree,
                        4: levelFour,
                        5: levelFive,
                        6: levelSix,
                        7: levelSeven,
                        8: levelEight,
                        9: levelNine,
                    }
                },
            ]
        },
    };

    static getLevel(course: Course, module: string, level: number) {
        const selectedModule = this.CourseMap[course].modules.find(
            moduleItem => moduleItem.name == module
        )
        if (!selectedModule) {
            return undefined;
        }
        return selectedModule.levels[level]
    }

    static getModuleName(course: Course, moduleNumber: number) {
        const selectedModule = this.CourseMap[course].modules.find(
            moduleItem => moduleItem.number == moduleNumber
        )
        if (!selectedModule) {
            return undefined;
        }
        return selectedModule.name;
    }

}

type CourseMapType = {
    [C in Course]: {
        modules: {
            number: 1;
            name: string;
            levels: {
                [level: number]: LevelModel;
            }
        }[];
    };
};
