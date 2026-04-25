import { QuizTab } from '../../../../../../domain/value-objects/level.model';

export const quizDataOne: QuizTab[] = [
    {
        question: 'Was schickt der Browser zuerst an den Server, wenn du eine Website öffnest',
        hint: 'Tipp: Denke an Request und Response',
        answers: [
            'Eine Response',
            'Eine Request',
            'Ein CSS file automatisch',
            'Ein DOM-Baum',
        ],
        correct: 1,
        correctMsg: 'Genau! Erst kommt der Request vom Browser(Client)',
        falseMsg:
            'Nicht ganz! Erst schickt der Browser ein Request(Anfrage). Dann kommt der Response(Antwort)',
    },
    {
        question:
            '2Was schickt der Browser zuerst an den Server, wenn du eine Website öffnest',
        hint: '2Tipp: Denke an Request und Response',
        answers: [
            '2Eine Response',
            '2Eine Request',
            '2Ein CSS file automatisch',
            '2Ein DOM-Baum',
        ],
        correct: 3,
        correctMsg: '2Genau! Erst kommt der Request vom Browser(Client)',
        falseMsg:
            '2Nicht ganz! Erst schickt der Browser ein Request(Anfrage). Dann kommt der Response(Antwort)',
    },
    {
        question:
            '3Was schickt der Browser zuerst an den Server, wenn du eine Website öffnest',
        hint: '3Tipp: Denke an Request und Response',
        answers: [
            '3Eine Response',
            '3Eine Request',
            '3Ein CSS file automatisch',
            '3Ein DOM-Baum',
        ],
        correct: 3,
        correctMsg: '3Genau! Erst kommt der Request vom Browser(Client)',
        falseMsg:
            '3Nicht ganz! Erst schickt der Browser ein Request(Anfrage). Dann kommt der Response(Antwort)',
    },
];
