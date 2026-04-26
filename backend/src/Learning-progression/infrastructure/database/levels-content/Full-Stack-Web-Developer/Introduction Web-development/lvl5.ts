import {
    LevelModel,
    QuizTab,
} from '../../../../../domain/value-objects/level.model';

export const quizDataFive: QuizTab[] = [
    {
        question: 'Was bedeutet "State" im Frontend?',
        hint: 'Tipp: Zustand der App',
        answers: [
            'Die Farbe der Seite',
            'Der aktuelle Datenzustand einer Anwendung',
            'Ein Server',
            'Ein HTML-Tag',
        ],
        correct: 1,
        correctMsg:
            'Richtig! State beschreibt den aktuellen Zustand der Daten.',
        falseMsg: 'Nicht ganz! State ist der aktuelle Datenzustand der App.',
    },
    {
        question: 'Warum ist State wichtig?',
        hint: 'Tipp: Dynamik',
        answers: [
            'Für das Design',
            'Für Datenbanken',
            'Für dynamische Änderungen im UI',
            'Für HTML-Struktur',
        ],
        correct: 2,
        correctMsg: 'Genau! State macht Anwendungen dynamisch.',
        falseMsg: 'Nicht korrekt! State steuert dynamische UI-Änderungen.',
    },
    {
        question: 'Was passiert, wenn sich der State ändert?',
        hint: 'Tipp: UI reagiert',
        answers: [
            'Nichts',
            'Die Seite lädt neu',
            'Das UI wird aktualisiert',
            'Der Server stoppt',
        ],
        correct: 2,
        correctMsg: 'Richtig! Änderungen im State aktualisieren das UI.',
        falseMsg: 'Nicht ganz! Das UI reagiert auf State-Änderungen.',
    },
];

export const levelFive: LevelModel = {
    tabs: {
        goal: {
            subtitle: 'Next Step!',
            title: 'State & Dynamische UI',
            objectives: [
                'Verstehe, was State im Frontend bedeutet',
                'Lerne, wie Daten das UI beeinflussen',
                'Erstelle dynamische Inhalte mit JavaScript',
                'Reagiere auf Benutzerinteraktionen',
            ],
            hint: 'Tipp: State ist wie der "Speicher" deiner App im Moment.',
        },
        concept: {
            title: 'Wie wird eine Website dynamisch?',
            subtitle:
                'Moderne Webapps reagieren auf Datenänderungen und Nutzerinteraktionen.',
            icon: {
                name: 'refresh',
                className: 'refreshIcon',
            },
            unitOneTitle: 'Was ist State?',
            unitOne:
                'State beschreibt den aktuellen Zustand deiner Anwendung.\nZum Beispiel: eingeloggter Nutzer oder geladene Daten.',
            unitOneNote:
                'Merke: Wenn sich State ändert, ändert sich oft das UI.',
            visualOne: 'Full-Stack-Developer/state.png',
            keyPointsTitle: 'State Key Points',
            keyPointsSubtitle: 'Dynamic UI',
            pointOneTitle: 'State',
            pointOneContent: 'State speichert Daten, die sich ändern können.',
            pointTwoTitle: 'Reaktivität',
            pointTwoContent:
                'Das UI reagiert automatisch auf Änderungen im State.',
            pointThreeTitle: 'User Input',
            pointThreeContent: 'Benutzerinteraktionen verändern den State.',
            unitTwoTitle: 'Dynamische Inhalte',
            unitTwo:
                'Mit JavaScript kannst du Inhalte basierend auf State anzeigen.\nZum Beispiel Listen, Texte oder Buttons dynamisch ändern.',
            unitTwoNote:
                'Merke: Dynamische Webseiten reagieren auf Nutzeraktionen.',
            visualTwo: 'Full-Stack-Developer/dynamic.ui.png',
        },
        quiz: quizDataFive,
        task: {
            title: 'Aufgabe: Dynamische Liste',
            subtitle: 'Erstelle eine interaktive Liste mit JavaScript.',
            goals: [
                'Erstelle ein Eingabefeld und einen Button "Hinzufügen"',
                'Speichere Einträge in einem Array (State)',
                'Zeige die Liste im HTML an',
                'Aktualisiere die Liste bei jedem neuen Eintrag',
            ],
            hint: 'Tipp: Nutze ein Array als State und render() die Liste neu.',
        },
    },
};
