import { TaskTabDto } from './taskTab';
import { GoalTabDto } from './goalTab';
import { ConceptTabDto } from './conceptTab';
import { QuizTabDto } from './quizTab';

export interface LevelModelDto {
    tabs: {
        goal: GoalTabDto;
        concept: ConceptTabDto;
        quiz: QuizTabDto[];
        task: TaskTabDto;
    };
}