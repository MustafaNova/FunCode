import { TaskTab } from '../../../domain/value-objects/level.model';

export const LEVEL_TASKS: Record<string, TaskTab> = {
    HELLO_WEB: {
        id: 'HELLO_WEB',
        type: 'htmlE2E',
        title: 'Aufgabe: Baue eine Mini-Seite',
        subtitle:
            'Schreibe HTML &amp; CSS im Editor. Klicke dann auf „Ausführen“. Unten siehst du das Ergebnis. Wenn alles passt, bekommst du ✅.\n',
        goals: [
            'Erstelle eine h1 Überschrift mit dem Text: "Hallo Web!"\n',
            'Erstelle darunter einen button mit dem Text: "Klick"\n',
            'Wenn man auf den Button klickt, soll im Text darunter erscheinen(element mit id: #result): "Geklicked"\n',
        ],
        hint: 'Tipp: Du kannst ein Element mit id verwenden und es mit JavaScript ändern.\n',
    },
    CHANGE: {
        id: 'CHANGE',
        type: 'htmlE2E',
        title: 'Aufgabe: Interaktive Seite',
        subtitle:
            'Erstelle eine strukturierte HTML-Seite und verändere sie mit JavaScript.',
        goals: [
            'Erstelle eine h1 Überschrift mit dem Text: "Meine Seite"',
            'Erstelle einen Button mit dem Text: "Ändern"',
            'Beim Klick soll sich der Text der Überschrift mit der id "#result" zu "Geändert!" ändern',
        ],
        hint: 'Tipp: Nutze document.getElementById() und addEventListener().',
    },
    TOGGLE_VISIBILITY: {
        id: 'TOGGLE_VISIBILITY',
        type: 'htmlE2E',
        title: 'Aufgabe: Sichtbarkeit umschalten',
        subtitle: 'Lerne, wie du Elemente ein- und ausblendest.',
        goals: [
            'Erstelle einen span-tag mit dem Inhalt: "Hallo Welt"',
            'Erstelle einen Button mit dem Text: "Toggle"',
            'Beim Klick auf Button soll der span-tag ein- und ausgeblendet werden',
        ],
        hint: 'Tipp: Nutze style.display oder classList.toggle().',
    },
    INPUT_PREVIEW: {
        id: 'INPUT_PREVIEW',
        type: 'htmlE2E',
        title: 'Aufgabe: Live Texteingabe anzeigen',
        subtitle: 'Lerne, wie du auf Eingaben reagierst.',
        goals: [
            'Erstelle ein input-Feld mit #input',
            'Erstelle einen paragraph-tag #output',
            'Während der Benutzer tippt, soll der Inhalt des paragraph-tags aktualisiert werden',
        ],
        hint: 'Tipp: Nutze das input-Event und textContent.',
    },
    FORM_SUBMIT: {
        id: 'FORM_SUBMIT',
        type: 'htmlE2E',
        title: 'Aufgabe: Formular absenden',
        subtitle: 'Lerne, wie Formulare verarbeitet werden.',
        goals: [
            'Erstelle ein input-Feld mit der id "#name"',
            'Erstelle einen Button mit dem Text: "Senden"',
            'Erstelle einen paragraph-tag mit der id "#result"',
            'Beim Klick auf den Button soll im paragraph-tag stehen: "Hallo, NAME"',
        ],
        hint: 'Tipp: Nutze value und textContent.',
    },
    SERVER: {
        id: 'SERVER',
        type: 'htmlStatic',
        title: 'Aufgabe: Eigener Server',
        subtitle: 'Erstelle deinen ersten einfachen Backend-Server.',
        goals: [
            'Installiere Node.js',
            'Erstelle einen einfachen Server (z. B. mit Express)',
            'Erstelle eine Route /api/test',
            'Gib eine JSON-Antwort zurück (z. B. { message: "Hello World" })',
        ],
        hint: 'Tipp: Nutze Express und app.get(), um Routen zu definieren.',
    },
    DATABASE: {
        id: 'DATABASE',
        type: 'htmlStatic',
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
    REGISTRATION: {
        id: 'REGISTRATION',
        type: 'htmlStatic',
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
    DEPLOYMENT: {
        id: 'DEPLOYMENT',
        type: 'htmlStatic',
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
};
