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
    COUNTER: {
        id: 'COUNTER',
        type: 'htmlE2E',
        title: 'Aufgabe: Einfacher Zähler',
        subtitle: 'Lerne, wie du Zahlen mit JavaScript veränderst.',
        goals: [
            'Erstelle einen paragraph-tag mit der id "#count" und dem Inhalt: "0"',
            'Erstelle einen Button mit dem Text: "+"',
            'Beim Klick auf den Button soll die Zahl im paragraph-tag um 1 erhöht werden',
        ],
        hint: 'Tipp: Nutze parseInt() oder eine Variable für den Zähler.',
    },
    COLOR_PICKER: {
        id: 'COLOR_PICKER',
        type: 'htmlE2E',
        title: 'Aufgabe: Hintergrundfarbe ändern',
        subtitle: 'Lerne den Umgang mit Inputs.',
        goals: [
            'Erstelle ein input-Feld vom Typ "color"',
            'Beim Ändern der Farbe soll sich die Hintergrundfarbe der Seite ändern',
        ],
        hint: 'Tipp: Nutze das change- oder input-Event.',
    },
    RANDOM_NUMBER: {
        id: 'RANDOM_NUMBER',
        type: 'htmlE2E',
        title: 'Aufgabe: Zufallszahl erzeugen',
        subtitle: 'Arbeite mit Math.random().',
        goals: [
            'Erstelle einen Button mit dem Text: "Zufall"',
            'Erstelle einen paragraph-tag mit der id "#result"',
            'Beim Klick soll eine Zufallszahl zwischen 1 und 10 angezeigt werden',
        ],
        hint: 'Tipp: Nutze Math.floor() und Math.random().',
    },
    CHAR_COUNTER: {
        id: 'CHAR_COUNTER',
        type: 'htmlE2E',
        title: 'Aufgabe: Zeichen zählen',
        subtitle: 'Reagiere auf Texteingaben.',
        goals: [
            'Erstelle ein textarea-element',
            'Erstelle einen paragraph-tag mit der id "#count"',
            'Während der Benutzer tippt, soll die Anzahl der Zeichen angezeigt werden',
        ],
        hint: 'Tipp: Nutze value.length.',
    },
};
