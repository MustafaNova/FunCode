import {
    LevelModel,
    QuizTab,
} from '../../../../../domain/value-objects/level.model';
import { TASK_IDS } from './taskIds';

export const quizDataThree: QuizTab[] = [
    {
        question: 'Was gehört zum Frontend einer Webanwendung?',
        hint: 'Tipp: Was der Nutzer sieht',
        answers: ['Datenbank', 'Serverlogik', 'UI im Browser', 'API'],
        correct: 2,
        correctMsg:
            'Richtig! Das Frontend ist alles, was im Browser sichtbar ist.',
        falseMsg:
            'Nicht ganz! Das Frontend ist die Benutzeroberfläche im Browser.',
    },
    {
        question: 'Was ist die Aufgabe eines Backends?',
        hint: 'Tipp: Verarbeitung im Hintergrund',
        answers: [
            'Design erstellen',
            'Daten speichern und verarbeiten',
            'HTML anzeigen',
            'CSS stylen',
        ],
        correct: 1,
        correctMsg: 'Genau! Das Backend kümmert sich um Logik und Daten.',
        falseMsg:
            'Nicht korrekt! Das Backend verarbeitet Daten im Hintergrund.',
    },
    {
        question: 'Was verbindet Frontend und Backend?',
        hint: 'Tipp: Kommunikation',
        answers: ['HTML', 'CSS', 'API', 'DOM'],
        correct: 2,
        correctMsg: 'Richtig! APIs verbinden Frontend und Backend.',
        falseMsg: 'Nicht ganz! APIs ermöglichen die Kommunikation.',
    },
];

export const levelThree: LevelModel = {
    tabs: {
        goal: {
            subtitle: 'Next Step!',
            title: 'Einführung in Web Development',
            objectives: [
                'Verstehe den Unterschied zwischen Frontend und Backend',
                'Lerne die Grundlagen einer Webanwendung',
                'Erkenne, wie Daten zwischen Client und Server fließen',
                'Verstehe die Rolle von APIs',
            ],
            hint: 'Tipp: Stell dir eine Website wie ein Restaurant vor – Frontend = Service, Backend = Küche.',
        },
        concept: {
            title: 'Wie funktioniert Web Development?',
            subtitle:
                'Webanwendungen bestehen aus Frontend, Backend und der Kommunikation dazwischen.',
            icon: {
                name: 'globe',
                className: 'globeIcon',
            },
            unitOneTitle: 'Frontend & Backend',
            unitOne:
                'Das Frontend ist alles, was du im Browser siehst.\nDas Backend läuft auf einem Server und verarbeitet Daten.',
            unitOneNote: 'Merke: Frontend = sichtbar, Backend = Logik & Daten.',
            visualOne: 'Full-Stack-Developer/frontend.backend.png',
            keyPointsTitle: 'Web Dev Key Points',
            keyPointsSubtitle: 'Fullstack Basics',
            pointOneTitle: 'Frontend',
            pointOneContent:
                'HTML, CSS und JavaScript bilden die Benutzeroberfläche.',
            pointTwoTitle: 'Backend',
            pointTwoContent:
                'Das Backend verarbeitet Anfragen und greift auf Datenbanken zu.',
            pointThreeTitle: 'API',
            pointThreeContent:
                'APIs ermöglichen die Kommunikation zwischen Frontend und Backend.',
            unitTwoTitle: 'Client-Server Kommunikation',
            unitTwo:
                'Der Browser (Client) sendet Anfragen an den Server.\nDer Server antwortet mit Daten, die im Frontend angezeigt werden.',
            unitTwoNote:
                'Merke: Jede Interaktion im Web basiert auf Requests und Responses.',
            visualTwo: 'Full-Stack-Developer/client.server.png',
        },
        quiz: quizDataThree,
        task: {
            id: TASK_IDS.LOAD_DATA,
            title: 'Aufgabe: Erste Fullstack Verbindung',
            subtitle:
                'Simuliere eine einfache Kommunikation zwischen Frontend und Backend.',
            goals: [
                'Erstelle eine HTML-Seite mit einem Button "Daten laden"',
                'Simuliere eine API (z. B. mit einer JSON-Datei oder Mock-Daten)',
                'Zeige beim Klick auf den Button Daten im Browser an',
            ],
            hint: 'Tipp: Nutze fetch() oder einfache JavaScript-Objekte als Mock-Daten.',
        },
    },
};
