import {
    LevelModel,
    QuizTab,
} from '../../../../../domain/value-objects/level.model';

export const quizDataSeven: QuizTab[] = [
    {
        question: 'Warum braucht man eine Datenbank?',
        hint: 'Tipp: Daten speichern',
        answers: [
            'Für Styling',
            'Zum dauerhaften Speichern von Daten',
            'Für HTML-Struktur',
            'Für Animationen',
        ],
        correct: 1,
        correctMsg: 'Richtig! Datenbanken speichern Daten dauerhaft.',
        falseMsg: 'Nicht ganz! Datenbanken sind für persistente Daten da.',
    },
    {
        question: 'Welche Art von Datenbank ist MongoDB?',
        hint: 'Tipp: Kein Tabellenmodell',
        answers: [
            'Relationale Datenbank',
            'NoSQL Datenbank',
            'CSS Framework',
            'Programmiersprache',
        ],
        correct: 1,
        correctMsg: 'Genau! MongoDB ist eine NoSQL-Datenbank.',
        falseMsg: 'Nicht korrekt! MongoDB gehört zu den NoSQL-Datenbanken.',
    },
    {
        question: 'Was bedeutet CRUD?',
        hint: 'Tipp: Grundoperationen',
        answers: [
            'Create, Read, Update, Delete',
            'Code, Run, Upload, Deploy',
            'Connect, Render, Use, Design',
            'Create, Reset, Undo, Debug',
        ],
        correct: 0,
        correctMsg: 'Richtig! CRUD beschreibt die Basisoperationen auf Daten.',
        falseMsg: 'Nicht ganz! CRUD = Create, Read, Update, Delete.',
    },
];

export const levelSeven: LevelModel = {
    tabs: {
        goal: {
            subtitle: 'Next Step!',
            title: 'Datenbanken & Persistenz',
            objectives: [
                'Verstehe, warum Datenbanken wichtig sind',
                'Lerne den Unterschied zwischen SQL und NoSQL',
                'Führe CRUD-Operationen durch',
                'Verbinde Backend mit einer Datenbank',
            ],
            hint: 'Tipp: Ohne Datenbank vergisst deine App alles nach dem Reload.',
        },
        concept: {
            title: 'Wie werden Daten gespeichert?',
            subtitle:
                'Datenbanken speichern Informationen dauerhaft und machen sie abrufbar.',
            icon: {
                name: 'database',
                className: 'databaseIcon',
            },
            unitOneTitle: 'Datenbanken',
            unitOne:
                'Eine Datenbank speichert Daten dauerhaft.\nBeispiele sind SQL (Tabellen) oder NoSQL (Dokumente).',
            unitOneNote: 'Merke: Datenbanken sorgen für Persistenz.',
            visualOne: 'Full-Stack-Developer/database.png',
            keyPointsTitle: 'Database Key Points',
            keyPointsSubtitle: 'Persistence',
            pointOneTitle: 'CRUD',
            pointOneContent:
                'Create, Read, Update und Delete sind die Basisoperationen.',
            pointTwoTitle: 'SQL vs NoSQL',
            pointTwoContent:
                'SQL nutzt Tabellen, NoSQL nutzt flexible Datenstrukturen.',
            pointThreeTitle: 'Backend Verbindung',
            pointThreeContent: 'Das Backend verbindet sich mit der Datenbank.',
            unitTwoTitle: 'Daten speichern & abrufen',
            unitTwo:
                'Dein Server kann Daten in einer Datenbank speichern und abrufen.\nDiese Daten kannst du dann im Frontend anzeigen.',
            unitTwoNote:
                'Merke: Datenfluss geht oft von DB → Backend → Frontend.',
            visualTwo: 'Full-Stack-Developer/db.flow.png',
        },
        quiz: quizDataSeven,
        task: {
            title: 'Aufgabe: CRUD API',
            subtitle: 'Erweitere dein Backend mit einer Datenbank.',
            goals: [
                'Verbinde dein Backend mit einer Datenbank (z. B. MongoDB)',
                'Erstelle eine Route zum Speichern von Daten (Create)',
                'Erstelle eine Route zum Abrufen von Daten (Read)',
                'Optional: Update und Delete hinzufügen',
            ],
            hint: 'Tipp: Nutze ein ORM/ODM wie Mongoose für MongoDB.',
        },
    },
};
