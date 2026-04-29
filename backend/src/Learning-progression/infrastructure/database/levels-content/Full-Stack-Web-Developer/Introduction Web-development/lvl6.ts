import {
    LevelModel,
    QuizTab,
} from '../../../../../domain/value-objects/level.model';
import { LEVEL_TASKS } from '../../task.map';

export const quizDataSix: QuizTab[] = [
    {
        question: 'Was ist ein Server?',
        hint: 'Tipp: Reagiert auf Anfragen',
        answers: [
            'Ein Browser',
            'Ein Programm, das Requests verarbeitet',
            'Ein CSS-File',
            'Ein HTML-Element',
        ],
        correct: 1,
        correctMsg:
            'Richtig! Ein Server verarbeitet Anfragen und sendet Antworten.',
        falseMsg: 'Nicht ganz! Ein Server reagiert auf Requests vom Client.',
    },
    {
        question:
            'Welche Technologie wird oft für ein JavaScript-Backend genutzt?',
        hint: 'Tipp: Läuft außerhalb des Browsers',
        answers: ['React', 'CSS', 'Node.js', 'HTML'],
        correct: 2,
        correctMsg: 'Genau! Node.js wird für Backend-JavaScript genutzt.',
        falseMsg: 'Nicht korrekt! Node.js läuft auf dem Server.',
    },
    {
        question: 'Was ist eine Route im Backend?',
        hint: 'Tipp: URL-Pfad',
        answers: [
            'Ein Design',
            'Ein Datenbankeintrag',
            'Ein definierter Endpunkt für Requests',
            'Ein HTML-Tag',
        ],
        correct: 2,
        correctMsg:
            'Richtig! Routen definieren, wie der Server auf Requests reagiert.',
        falseMsg: 'Nicht ganz! Eine Route ist ein Endpunkt im Server.',
    },
];

export const levelSix: LevelModel = {
    tabs: {
        goal: {
            subtitle: 'Next Step!',
            title: 'Backend Basics & Server',
            objectives: [
                'Verstehe, was ein Server ist',
                'Lerne Node.js als Backend-Technologie kennen',
                'Erstelle einfache Server-Routen',
                'Verarbeite Requests und sende Responses',
            ],
            hint: 'Tipp: Der Server ist das Gehirn deiner Webanwendung.',
        },
        concept: {
            title: 'Wie funktioniert ein Backend?',
            subtitle:
                'Das Backend verarbeitet Anfragen, führt Logik aus und liefert Daten zurück.',
            icon: {
                name: 'server',
                className: 'serverIcon',
            },
            unitOneTitle: 'Server Grundlagen',
            unitOne:
                'Ein Server ist ein Programm, das auf Anfragen reagiert.\nEr empfängt Requests und sendet Responses zurück.',
            unitOneNote: 'Merke: Ohne Server keine Datenverarbeitung.',
            visualOne: 'Full-Stack-Developer/server.png',
            keyPointsTitle: 'Backend Key Points',
            keyPointsSubtitle: 'Server Basics',
            pointOneTitle: 'Node.js',
            pointOneContent: 'Ermöglicht JavaScript außerhalb des Browsers.',
            pointTwoTitle: 'Routing',
            pointTwoContent:
                'Bestimmt, wie der Server auf verschiedene URLs reagiert.',
            pointThreeTitle: 'Response',
            pointThreeContent: 'Der Server sendet Daten zurück an den Client.',
            unitTwoTitle: 'Eigener Server',
            unitTwo:
                'Mit Node.js kannst du eigene Server erstellen.\nZum Beispiel kannst du auf /api Daten zurückgeben.',
            unitTwoNote: 'Merke: Backend steuert Logik und Datenfluss.',
            visualTwo: 'Full-Stack-Developer/node.server.png',
        },
        quiz: quizDataSix,
        task: LEVEL_TASKS.SERVER,
    },
};
