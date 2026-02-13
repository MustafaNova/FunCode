import { tasks } from './tasks';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
    getRandomTask() {
        return tasks[0];
    }
}
