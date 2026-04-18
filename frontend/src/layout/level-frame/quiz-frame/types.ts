import type { QuizTabDto } from '@funcode/shared';


export type props = {
    isVisible: boolean,
    quizData: QuizTabDto[],
}
export type Selected = number | null;