import { ClassicTask, TaskDto } from '@funcode/shared';

export function toTaskDto(task: ClassicTask): TaskDto {
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
