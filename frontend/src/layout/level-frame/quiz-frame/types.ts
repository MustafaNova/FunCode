import type { QuizTabDto } from '@funcode/shared';


export type props = {
    isVisible: boolean,
    quizData: QuizTabDto[],
    onFinish: () => void,
    onHeartLose: () => void,
}