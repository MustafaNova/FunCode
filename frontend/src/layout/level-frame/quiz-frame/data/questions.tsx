// question 1
const questionOne = "Was schickt der Browser zuerst an den Server, wenn du eine Website öffnest";
const hintOne = "Tipp: Denke an Request und Response";
const answersOne = {
    one: "Eine Response",
    two: "Eine Request",
    three: "Ein CSS file automatisch",
    four: "Ein DOM-Baum",
};
const correctOne = 1; // index of correct response in answers array
const correctMsgOne = "Genau! Erst kommt der Request vom Browser(Client)";
const falseMsgOne = "Nicht ganz! Erst schickt der Browser ein Request(Anfrage). Dann kommt der Response(Antwort)";


// question 2
const questionTwo = "2Was schickt der Browser zuerst an den Server, wenn du eine Website öffnest";
const hintTwo = "2Tipp: Denke an Request und Response";
const answersTwo = {
    one: "2Eine Response",
    two: "2Eine Request",
    three: "2Ein CSS file automatisch",
    four: "2Ein DOM-Baum",
};
const correctTwo = 3;
const correctMsgTwo = "2Genau! Erst kommt der Request vom Browser(Client)";
const falseMsgTwo = "2Nicht ganz! Erst schickt der Browser ein Request(Anfrage). Dann kommt der Response(Antwort)";


// question 3
const questionThree = "3Was schickt der Browser zuerst an den Server, wenn du eine Website öffnest";
const hintThree = "3Tipp: Denke an Request und Response";
const answersThree = {
    one: "3Eine Response",
    two: "3Eine Request",
    three: "3Ein CSS file automatisch",
    four: "3Ein DOM-Baum",
};
const correctThree = 3;
const correctMsgThree = "3Genau! Erst kommt der Request vom Browser(Client)";
const falseMsgThree = "3Nicht ganz! Erst schickt der Browser ein Request(Anfrage). Dann kommt der Response(Antwort)";

export const questions = [
    {
        question: questionOne,
        hint: hintOne,
        answers: [answersOne.one, answersOne.two, answersOne.three, answersOne.four],
        correct: correctOne,
        correctMsg: correctMsgOne,
        falseMsg: falseMsgOne,
    },
    {
        question: questionTwo,
        hint: hintTwo,
        answers: [answersTwo.one, answersTwo.two, answersTwo.three, answersTwo.four],
        correct: correctTwo,
        correctMsg: correctMsgTwo,
        falseMsg: falseMsgTwo,
    },
    {
        question: questionThree,
        hint: hintThree,
        answers: [answersThree.one, answersThree.two, answersThree.three, answersThree.four],
        correct: correctThree,
        correctMsg: correctMsgThree,
        falseMsg: falseMsgThree,
    },
    ];
