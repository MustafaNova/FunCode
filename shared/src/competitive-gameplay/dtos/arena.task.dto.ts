import { ClassicTaskDto } from './classic.task.dto.js';
import { BugHunterTaskDto } from './bugHunter.task.dto.js';
import { CodeGolfTaskDto } from './codeGolf.task.dto.js';

export type ArenaTaskDto = ClassicTaskDto | BugHunterTaskDto | CodeGolfTaskDto