import { LevelModel } from '../../../../../../domain/value-objects/level.model';
import { quizDataTwo } from './quizData';

export const levelTwo: LevelModel = {
    tabs: {
        goal: {
            subtitle: 'Next Step!',
            title: 'HTML Struktur & DOM',
            objectives: [
                'Verstehe, wie HTML strukturiert ist',
                'Lerne den DOM-Baum kennen',
                'Baue deine erste strukturierte Seite',
                'Verknüpfe HTML mit JavaScript',
            ],
            hint: 'Tipp: Denke daran – HTML ist wie ein Baum mit verschachtelten Elementen.',
        },
        concept: {
            title: 'Wie ist HTML aufgebaut?',
            subtitle:
                'HTML besteht aus verschachtelten Elementen, die der Browser als Baum darstellt.',
            icon: {
                name: 'code',
                className: 'codeIcon',
            },
            unitOneTitle: 'HTML Struktur',
            unitOne:
                'HTML besteht aus Elementen wie <html>, <body> oder <div>.\n Diese sind ineinander verschachtelt und bilden eine Struktur.',
            unitOneNote:
                'Merke: HTML ist wie ein Baum – jedes Element kann Kinder haben.',
            visualOne: 'Full-Stack-Developer/dom.tree.png',
            keyPointsTitle: 'DOM Key Points',
            keyPointsSubtitle: 'DOM',
            pointOneTitle: 'DOM Baum',
            pointOneContent: 'Der Browser wandelt HTML in einen DOM-Baum um.',
            pointTwoTitle: 'Elemente greifen',
            pointTwoContent:
                'Mit JavaScript kannst du Elemente im DOM auswählen.',
            pointThreeTitle: 'Manipulation',
            pointThreeContent: 'Du kannst Inhalte im DOM verändern.',
            unitTwoTitle: 'JavaScript & DOM',
            unitTwo:
                'JavaScript kann HTML verändern.\n Zum Beispiel kannst du Text ändern oder Elemente hinzufügen.',
            unitTwoNote: 'Merke: JavaScript macht Webseiten interaktiv.',
            visualTwo: 'Full-Stack-Developer/dom.manipulation.png',
        },
        quiz: quizDataTwo,
        task: {
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
    },
};
