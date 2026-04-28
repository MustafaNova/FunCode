import {
    LevelModel,
    QuizTab,
} from '../../../../../domain/value-objects/level.model';
import { TASK_IDS } from './taskIds';

export const quizDataFour: QuizTab[] = [
    {
        question: 'Was ist ein HTTP Request?',
        hint: 'Tipp: Kommunikation zum Server',
        answers: [
            'Eine Datenbank',
            'Eine Anfrage vom Client an den Server',
            'Ein HTML-Element',
            'Ein CSS-Stil',
        ],
        correct: 1,
        correctMsg: 'Richtig! Ein Request ist eine Anfrage an den Server.',
        falseMsg:
            'Nicht ganz! Ein Request wird vom Client an den Server gesendet.',
    },
    {
        question:
            'Welche Methode wird verwendet, um Daten vom Server zu holen?',
        hint: 'Tipp: Standard-Methode',
        answers: ['POST', 'PUT', 'GET', 'DELETE'],
        correct: 2,
        correctMsg: 'Genau! GET wird verwendet, um Daten abzurufen.',
        falseMsg:
            'Nicht korrekt! GET ist die richtige Methode zum Abrufen von Daten.',
    },
    {
        question: 'Was macht fetch() in JavaScript?',
        hint: 'Tipp: Moderne API-Funktion',
        answers: [
            'Stylt HTML',
            'Sendet HTTP Requests',
            'Erstellt Datenbanken',
            'Startet Server',
        ],
        correct: 1,
        correctMsg: 'Richtig! fetch() wird für HTTP Requests genutzt.',
        falseMsg: 'Nicht ganz! fetch() sendet Requests an Server.',
    },
];

export const levelFour: LevelModel = {
    tabs: {
        goal: {
            subtitle: 'Next Step!',
            title: 'HTTP & API Requests',
            objectives: [
                'Verstehe, wie HTTP funktioniert',
                'Lerne verschiedene Request-Methoden kennen',
                'Nutze fetch() für API Calls',
                'Arbeite mit echten Daten aus APIs',
            ],
            hint: 'Tipp: Jede Website lädt Daten über Requests im Hintergrund.',
        },
        concept: {
            title: 'Wie funktioniert Kommunikation im Web?',
            subtitle:
                'Webseiten kommunizieren über HTTP Requests und Responses mit Servern.',
            icon: {
                name: 'network',
                className: 'networkIcon',
            },
            unitOneTitle: 'HTTP Grundlagen',
            unitOne:
                'HTTP ist das Protokoll für die Kommunikation im Web.\nEin Client sendet eine Anfrage (Request) und erhält eine Antwort (Response).',
            unitOneNote:
                'Merke: Ohne HTTP keine Kommunikation zwischen Browser und Server.',
            visualOne: 'Full-Stack-Developer/http.request.png',
            keyPointsTitle: 'HTTP Key Points',
            keyPointsSubtitle: 'Requests & APIs',
            pointOneTitle: 'Request',
            pointOneContent: 'Der Client sendet eine Anfrage an den Server.',
            pointTwoTitle: 'Response',
            pointTwoContent: 'Der Server antwortet mit Daten (z. B. JSON).',
            pointThreeTitle: 'Methoden',
            pointThreeContent:
                'GET, POST, PUT und DELETE bestimmen die Art der Anfrage.',
            unitTwoTitle: 'fetch() & APIs',
            unitTwo:
                'Mit fetch() kannst du Daten von APIs laden.\nDie Antwort kommt oft im JSON-Format.',
            unitTwoNote:
                'Merke: fetch() ist dein Werkzeug für echte Daten im Frontend.',
            visualTwo: 'Full-Stack-Developer/fetch.api.png',
        },
        quiz: quizDataFour,
        task: {
            id: TASK_IDS.FETCH,
            title: 'Aufgabe: API Daten anzeigen',
            subtitle: 'Hole Daten von einer API und zeige sie im Frontend an.',
            goals: [
                'Erstelle einen Button "Daten laden"',
                'Nutze fetch(), um Daten von einer API zu laden (z. B. JSONPlaceholder)',
                'Zeige die geladenen Daten im HTML an (z. B. Titel eines Posts)',
            ],
            hint: 'Tipp: Nutze fetch().then() oder async/await und console.log() zum Testen.',
        },
    },
};
