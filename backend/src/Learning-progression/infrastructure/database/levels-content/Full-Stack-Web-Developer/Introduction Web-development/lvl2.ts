import {
    LevelModel,
    QuizTab,
} from '../../../../../domain/value-objects/level.model';
import { LEVEL_TASKS } from '../../task.map';

export const quizDataTwo: QuizTab[] = [
    {
        question: 'Was erstellt der Browser aus HTML-Code?',
        hint: 'Tipp: Es ist eine Baumstruktur',
        answers: ['Ein CSS File', 'Ein DOM-Baum', 'Ein Server', 'Ein Request'],
        correct: 1,
        correctMsg: 'Richtig! HTML wird in einen DOM-Baum umgewandelt.',
        falseMsg: 'Nicht ganz! Der Browser erstellt aus HTML einen DOM-Baum.',
    },
    {
        question: 'Wie kannst du ein HTML-Element mit JavaScript auswählen?',
        hint: 'Tipp: document...',
        answers: [
            'select.element()',
            'get.html()',
            'document.getElementById()',
            'query.html()',
        ],
        correct: 2,
        correctMsg: 'Genau! Damit greifst du auf Elemente zu.',
        falseMsg:
            'Nicht korrekt! document.getElementById() ist die richtige Methode.',
    },
    {
        question: 'Was kannst du mit JavaScript im DOM machen?',
        hint: 'Tipp: Inhalte verändern',
        answers: [
            'Nur lesen',
            'Nur löschen',
            'Verändern und hinzufügen',
            'Nur anzeigen',
        ],
        correct: 2,
        correctMsg: 'Richtig! Du kannst Inhalte verändern und hinzufügen.',
        falseMsg: 'Nicht ganz! JavaScript kann den DOM aktiv verändern.',
    },
];

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
        task: LEVEL_TASKS.CHANGE,
    },
};
