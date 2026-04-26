import {
    LevelModel,
    QuizTab,
} from '../../../../../domain/value-objects/level.model';

export const quizDataNine: QuizTab[] = [
    {
        question: 'Was bedeutet Deployment?',
        hint: 'Tipp: Online stellen',
        answers: [
            'Code löschen',
            'App im Internet verfügbar machen',
            'Design erstellen',
            'Daten speichern',
        ],
        correct: 1,
        correctMsg:
            'Richtig! Deployment bedeutet, deine App online zu bringen.',
        falseMsg: 'Nicht ganz! Deployment = App im Internet bereitstellen.',
    },
    {
        question: 'Was ist ein Hosting-Service?',
        hint: 'Tipp: Server im Internet',
        answers: [
            'Ein CSS-Tool',
            'Ein Ort, wo deine App läuft',
            'Ein HTML-Editor',
            'Ein Browser',
        ],
        correct: 1,
        correctMsg: 'Genau! Hosting stellt Server für deine App bereit.',
        falseMsg: 'Nicht korrekt! Hosting lässt deine App online laufen.',
    },
    {
        question: 'Warum braucht man eine .env Datei?',
        hint: 'Tipp: Geheimnisse',
        answers: [
            'Für Styling',
            'Für HTML',
            'Für sensible Daten wie API Keys',
            'Für Bilder',
        ],
        correct: 2,
        correctMsg: 'Richtig! .env speichert sensible Daten sicher.',
        falseMsg: 'Nicht ganz! .env ist für geheime Konfigurationen.',
    },
];

export const levelNine: LevelModel = {
    tabs: {
        goal: {
            subtitle: 'Final Step!',
            title: 'Deployment & Hosting',
            objectives: [
                'Verstehe, wie Webapps online gehen',
                'Lerne Hosting-Plattformen kennen',
                'Arbeite mit Umgebungsvariablen (.env)',
                'Deploye deine erste Fullstack-App',
            ],
            hint: 'Tipp: Erst durch Deployment wird deine App für andere sichtbar.',
        },
        concept: {
            title: 'Wie kommt deine App ins Internet?',
            subtitle:
                'Deployment bringt deine Anwendung auf einen Server, damit sie weltweit erreichbar ist.',
            icon: {
                name: 'cloud',
                className: 'cloudIcon',
            },
            unitOneTitle: 'Deployment',
            unitOne:
                'Beim Deployment wird deine App auf einen Server geladen.\nDanach ist sie über eine URL erreichbar.',
            unitOneNote: 'Merke: Deployment macht deine App öffentlich.',
            visualOne: 'Full-Stack-Developer/deployment.png',
            keyPointsTitle: 'Deployment Key Points',
            keyPointsSubtitle: 'Go Live',
            pointOneTitle: 'Hosting',
            pointOneContent:
                'Plattformen wie Vercel oder Render hosten deine App.',
            pointTwoTitle: 'Environment',
            pointTwoContent:
                'Umgebungsvariablen speichern sensible Daten sicher.',
            pointThreeTitle: 'Build',
            pointThreeContent: 'Dein Code wird für Produktion optimiert.',
            unitTwoTitle: 'Fullstack Deployment',
            unitTwo:
                'Frontend und Backend können getrennt oder zusammen deployed werden.\nDie App kommuniziert dann live über das Internet.',
            unitTwoNote:
                'Merke: Deployment verbindet alles zu einer echten App.',
            visualTwo: 'Full-Stack-Developer/fullstack.deploy.png',
        },
        quiz: quizDataNine,
        task: {
            title: 'Aufgabe: Deine App online bringen',
            subtitle: 'Deploye deine Fullstack-Anwendung.',
            goals: [
                'Wähle eine Hosting-Plattform (z. B. Vercel oder Render)',
                'Deploye dein Frontend',
                'Deploye dein Backend',
                'Verbinde beide über eine echte API-URL',
            ],
            hint: 'Tipp: Achte darauf, dass deine API-URL im Frontend angepasst ist.',
        },
    },
};
