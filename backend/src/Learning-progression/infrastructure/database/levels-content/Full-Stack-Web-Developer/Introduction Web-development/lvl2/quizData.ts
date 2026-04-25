import { QuizTab } from '../../../../../../domain/value-objects/level.model';

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
