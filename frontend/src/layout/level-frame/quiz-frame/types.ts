import type { QuizTab } from '@funcode/shared';

export type props = {
    isVisible: boolean,
    quizData: QuizTab[]
}
export type Selected = number | null;