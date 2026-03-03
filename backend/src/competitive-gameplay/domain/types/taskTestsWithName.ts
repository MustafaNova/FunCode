import { tasksMap } from './tasksMap';

export type TaskTestsWithName<K extends keyof tasksMap> = {
    functionName: tasksMap[K]['task']['functionName'];
    tests: tasksMap[K]['tests'];
};
