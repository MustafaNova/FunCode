export interface QuizTabDto {
    question: string;
    hint: string;
    answers: string[];
    correct: number;
    correctMsg: string;
    falseMsg: string;
}
