import {
    LevelModel,
    QuizTab,
} from '../../../../../domain/value-objects/level.model';
import { TASK_IDS } from './taskIds';

export const quizDataOne: QuizTab[] = [
    {
        question:
            'Was schickt der Browser zuerst an den Server, wenn du eine Website öffnest',
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

export const levelOne: LevelModel = {
    tabs: {
        goal: {
            subtitle: 'Lets Go!',
            title: 'Basic Html',
            objectives: [
                'Löse die ersten Aufgaben erfolgreich',
                'Erreiche das Ziel, ohne alle Leben zu verlieren',
                'Erreiche das Ziel, ohne alle Leben zu verlieren',
                'Erreiche das Ziel, ohne alle Leben zu verlieren',
            ],
            hint: 'Tipp: Wenn du unsicher bist, lies den Hinweis noch einmal – Geschwindigkeit kommt später.',
        },
        concept: {
            title: 'Was passiert im Browser ?',
            subtitle:
                'Wie der Browser Daten aus dem Internet verarbeitet und anzeigt.',
            icon: {
                name: 'html5',
                className: 'htmlIcon',
            },
            unitOneTitle: 'Request  →  Response',
            unitOne:
                'Wenn du eine Website öffnest,\n schickt dein Browser ein Request an einen Server.\n Der Server antwortet mit einem Response (z.B. HTML, CSS, JavaScript).',
            unitOneNote:
                'Merke: Der Browser ist der „Client“ – der Server liefert die Daten.',
            visualOne: 'Full-Stack-Developer/request.flow.png',
            keyPointsTitle: 'HTML Key Points',
            keyPointsSubtitle: 'HTML',
            pointOneTitle: 'HTML Laden',
            pointOneContent:
                'Der Browser bekommt das Grundgerüst (Struktur) der Seite.',
            pointTwoTitle: 'HTML Laden',
            pointTwoContent:
                'Der Browser bekommt das Grundgerüst (Struktur) der Seite.',
            pointThreeTitle: 'HTML Laden',
            pointThreeContent:
                'Der Browser bekommt das Grundgerüst (Struktur) der Seite.',
            unitTwoTitle: 'Request  →  Response',
            unitTwo:
                'Wenn du eine Website öffnest,\n schickt dein Browser ein Request an einen Server.\n Der Server antwortet mit einem Response (z.B. HTML, CSS, JavaScript).',
            unitTwoNote:
                'Merke: Der Browser ist der „Client“ – der Server liefert die Daten.',
            visualTwo: 'Full-Stack-Developer/request.flow.png',
        },
        quiz: quizDataOne,
        task: {
            id: TASK_IDS.HELLO_WEB,
            title: 'Aufgabe: Baue eine Mini-Seite',
            subtitle:
                'Schreibe HTML &amp; CSS im Editor. Klicke dann auf „Ausführen“. Unten siehst du das Ergebnis. Wenn alles passt, bekommst du ✅.\n',
            goals: [
                'Erstelle eine h1 Überschrift mit dem Text: "Hallo Web!"\n',
                'Erstelle darunter einen button mit dem Text: "Klick"\n',
                'Wenn man auf den Button klickt, soll im Text darunter erscheinen: "Geklicked"\n',
            ],
            hint: 'Tipp: Du kannst ein Element mit id verwenden und es mit JavaScript ändern.\n',
        },
    },
};
