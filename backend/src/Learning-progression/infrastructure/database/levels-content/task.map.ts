import { TaskTab } from '../../../domain/value-objects/level.model';

export const LEVEL_TASKS: Record<string, TaskTab> = {
    HELLO_WEB: {
        id: 'HELLO_WEB',
        type: 'html',
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
    CHANGE: {
        id: 'CHANGE',
        type: 'html',
        title: 'Aufgabe: Interaktive Seite',
        subtitle:
            'Erstelle eine strukturierte HTML-Seite und verändere sie mit JavaScript.',
        goals: [
            'Erstelle eine h1 Überschrift mit dem Text: "Meine Seite"',
            'Erstelle einen Button mit dem Text: "Ändern"',
            'Beim Klick soll sich der Text der Überschrift zu "Geändert!" ändern',
        ],
        hint: 'Tipp: Nutze document.getElementById() und addEventListener().',
    },
    LOAD_DATA: {
        id: 'LOAD_DATA',
        type: 'html',
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
    FETCH: {
        id: 'FETCH',
        type: 'html',
        title: 'Aufgabe: API Daten anzeigen',
        subtitle: 'Hole Daten von einer API und zeige sie im Frontend an.',
        goals: [
            'Erstelle einen Button "Daten laden"',
            'Nutze fetch(), um Daten von einer API zu laden (z. B. JSONPlaceholder)',
            'Zeige die geladenen Daten im HTML an (z. B. Titel eines Posts)',
        ],
        hint: 'Tipp: Nutze fetch().then() oder async/await und console.log() zum Testen.',
    },
    ADD: {
        id: 'ADD',
        type: 'html',
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
    SERVER: {
        id: 'SERVER',
        type: 'html',
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
        type: 'html',
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
        type: 'html',
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
        type: 'html',
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
