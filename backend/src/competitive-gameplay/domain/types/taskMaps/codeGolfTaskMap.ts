import { CodeGolfTask } from '@funcode/shared';
import { TaskTest } from '../../entities/taskTest';


export type CodeGolfTaskEntry = {
    task: CodeGolfTask,
    tests: TaskTest[]
};

export type CodeGolfTaskMap = Record<string, CodeGolfTaskEntry>;