import { TaskTest } from '../../entities/taskTest';
import { CodeGolfTask } from '../tasks/codeGolfTask';


export type CodeGolfTaskEntry = {
    task: CodeGolfTask,
    tests: TaskTest[]
};

export type CodeGolfTaskMap = Record<string, CodeGolfTaskEntry>;