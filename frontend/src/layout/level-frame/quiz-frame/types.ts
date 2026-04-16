export type props = {
    isVisible: boolean,
    quizData: {
        question: string,
        hint: string,
        answers: string[],
        correct: number,
        correctMsg: string,
        falseMsg: string,
    }[],
}
export type Selected = number | null;