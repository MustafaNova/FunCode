import { TaskTabDto } from './taskTab.js';
import { GoalTabDto } from './goalTab.js';
import { ConceptTabDto } from './conceptTab.js';
import { QuizTabDto } from './quizTab.js';

export interface LevelModelDto {
    tabs: {
        goal: GoalTabDto;
        concept: ConceptTabDto;
        quiz: QuizTabDto[];
        task: TaskTabDto;
    };
}