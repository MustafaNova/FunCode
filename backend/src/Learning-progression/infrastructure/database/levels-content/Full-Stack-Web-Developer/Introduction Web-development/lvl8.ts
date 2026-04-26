import {
    LevelModel,
    QuizTab,
} from '../../../../../domain/value-objects/level.model';

export const quizDataEight: QuizTab[] = [
    {
        question: 'Was ist Authentifizierung?',
        hint: 'Tipp: Wer bist du?',
        answers: [
            'Daten speichern',
            'Benutzer identifizieren',
            'Design erstellen',
            'Server starten',
        ],
        correct: 1,
        correctMsg:
            'Richtig! Authentifizierung prüft die Identität eines Nutzers.',
        falseMsg: 'Nicht ganz! Es geht darum, Nutzer zu identifizieren.',
    },
    {
        question: 'Was wird oft zum Speichern von Login-Zuständen genutzt?',
        hint: 'Tipp: Token',
        answers: ['HTML', 'CSS', 'JWT (Token)', 'DOM'],
        correct: 2,
        correctMsg: 'Genau! JWTs werden häufig für Authentifizierung genutzt.',
        falseMsg: 'Nicht korrekt! JWT ist eine gängige Lösung für Auth.',
    },
    {
        question: 'Warum sollten Passwörter gehasht werden?',
        hint: 'Tipp: Sicherheit',
        answers: [
            'Für schnelleres Laden',
            'Damit sie lesbar bleiben',
            'Zum Schutz vor Diebstahl',
            'Für Designzwecke',
        ],
        correct: 2,
        correctMsg: 'Richtig! Hashing schützt Passwörter.',
        falseMsg: 'Nicht ganz! Passwörter müssen sicher gespeichert werden.',
    },
];

export const levelEight: LevelModel = {
    tabs: {
        goal: {
            subtitle: 'Next Step!',
            title: 'Authentifizierung & Sicherheit',
            objectives: [
                'Verstehe Login- und Registrierungssysteme',
                'Lerne, wie Authentifizierung funktioniert',
                'Arbeite mit Tokens (JWT)',
                'Speichere Passwörter sicher',
            ],
            hint: 'Tipp: Sicherheit ist ein zentraler Teil jeder Web-App.',
        },
        concept: {
            title: 'Wie funktionieren Login-Systeme?',
            subtitle:
                'Webanwendungen nutzen Authentifizierung, um Benutzer zu verwalten und zu schützen.',
            icon: {
                name: 'lock',
                className: 'lockIcon',
            },
            unitOneTitle: 'Authentifizierung',
            unitOne:
                'Authentifizierung bedeutet, einen Benutzer zu identifizieren.\nZum Beispiel durch Login mit E-Mail und Passwort.',
            unitOneNote: 'Merke: Auth = Wer bist du?',
            visualOne: 'Full-Stack-Developer/auth.png',
            keyPointsTitle: 'Auth Key Points',
            keyPointsSubtitle: 'Security',
            pointOneTitle: 'Login',
            pointOneContent: 'Benutzer melden sich mit Credentials an.',
            pointTwoTitle: 'JWT',
            pointTwoContent: 'Tokens speichern den Login-Zustand im Client.',
            pointThreeTitle: 'Hashing',
            pointThreeContent: 'Passwörter werden verschlüsselt gespeichert.',
            unitTwoTitle: 'Sichere Anwendungen',
            unitTwo:
                'Nach dem Login erhält der Nutzer einen Token.\nDieser wird bei Requests mitgeschickt, um Zugriff zu gewähren.',
            unitTwoNote: 'Merke: Sicherheit schützt Daten und Nutzer.',
            visualTwo: 'Full-Stack-Developer/jwt.flow.png',
        },
        quiz: quizDataEight,
        task: {
            title: 'Aufgabe: Login System',
            subtitle: 'Erstelle ein einfaches Authentifizierungssystem.',
            goals: [
                'Erstelle eine Registrierung (User speichern)',
                'Implementiere Login (Vergleich Passwort)',
                'Nutze Hashing für Passwörter (z. B. bcrypt)',
                'Erstelle und verwende ein JWT für geschützte Routen',
            ],
            hint: 'Tipp: Nutze bcrypt für Hashing und jsonwebtoken für Tokens.',
        },
    },
};
