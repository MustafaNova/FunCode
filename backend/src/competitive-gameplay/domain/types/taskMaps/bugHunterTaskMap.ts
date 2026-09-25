import { TaskTest } from '../../entities/taskTest';
import { BugHunterTask } from '../tasks/bugHunterTask';

export type BugHunterTaskEntry = { task: BugHunterTask, tests: TaskTest[] };

export type BugHunterTaskMap = Record<string, BugHunterTaskEntry>;