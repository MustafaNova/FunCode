import { TaskDto } from '@funcode/shared';
import { Task } from '../../../../domain/entities/task';

export function toTaskDto(task: Task): TaskDto {
    return {
        id: task.id,
        name: task.name,
        functionName: task.functionName,
        difficulty: task.difficulty,
        description: task.description,
        examples: task.examples,
        constraints: task.constraints,
        starterCode: task.starterCode,
    };
}
