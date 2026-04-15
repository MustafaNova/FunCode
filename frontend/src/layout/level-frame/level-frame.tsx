import "./level-frame.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHeart,
    faBullseye,
    faBook,
    faQuestion,
    faCode
} from "@fortawesome/free-solid-svg-icons";
import { Goal } from "./goal-frame/goal-frame.tsx";
import {ConceptFrame} from "./concept-frame/concept-frame.tsx";
import {QuizFrame} from "./quiz-frame/quiz-frame.tsx";
import {TaskFrame} from "./task-frame/task-frame.tsx";
import {useState} from "react";
import { quizData } from './quiz-frame/data/questions.tsx';

type props = {
    isActive: boolean
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>
}

type LevelTabs = "goal" | "concept" | "quiz" | "task"

export function LevelFrame({isActive, setIsActive}: props) {
    const levelOne = {
        tabs: {
            goal: {
                subtitle: 'Lets Go!',
                title: 'Basic Html',
                objectives: [
                    'Löse die ersten Aufgaben erfolgreich',
                    'Erreiche das Ziel, ohne alle Leben zu verlieren',
                    'Erreiche das Ziel, ohne alle Leben zu verlieren',
                    'Erreiche das Ziel, ohne alle Leben zu verlieren',
                ],
                hint: 'Tipp: Wenn du unsicher bist, lies den Hinweis noch einmal – Geschwindigkeit kommt später.',
            },
            concept: {
                title: 'Was passiert im Browser ?',
                subtitle:
                    'Wie der Browser Daten aus dem Internet verarbeitet und anzeigt.',
                icon: {
                    name: 'html5',
                    className: 'htmlIcon',
                },
                unitOneTitle: 'Request  →  Response',
                unitOne:
                    'Wenn du eine Website öffnest,\n schickt dein Browser ein Request an einen Server.\n Der Server antwortet mit einem Response (z.B. HTML, CSS, JavaScript).',
                unitOneNote:
                    'Merke: Der Browser ist der „Client“ – der Server liefert die Daten.',
                visualOne: 'Full-Stack-Developer/request.flow.png',
                keyPointsTitle: 'HTML Key Points',
                keyPointsSubtitle: 'HTML',
                pointOneTitle: 'HTML Laden',
                pointOneContent:
                    'Der Browser bekommt das Grundgerüst (Struktur) der Seite.',
                pointTwoTitle: 'HTML Laden',
                pointTwoContent:
                    'Der Browser bekommt das Grundgerüst (Struktur) der Seite.',
                pointThreeTitle: 'HTML Laden',
                pointThreeContent:
                    'Der Browser bekommt das Grundgerüst (Struktur) der Seite.',
                unitTwoTitle: 'Request  →  Response',
                unitTwo:
                    'Wenn du eine Website öffnest,\n schickt dein Browser ein Request an einen Server.\n Der Server antwortet mit einem Response (z.B. HTML, CSS, JavaScript).',
                unitTwoNote:
                    'Merke: Der Browser ist der „Client“ – der Server liefert die Daten.',
                visualTwo: 'Full-Stack-Developer/request.flow.png',
            },
            quiz: quizData,
            task: {
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
        },
    };
    const [curTab, setCurTab] = useState<LevelTabs>("goal")
    const steps = [
        {icon: faBullseye, tab: "goal"},
        {icon: faBook, tab: "concept"},
        {icon: faQuestion, tab: "quiz"},
        {icon: faCode, tab: "task"}
    ]

    function nextTab() {
        const curIndex = steps.findIndex(
            step => step.tab == curTab
        )
        setCurTab(steps[curIndex + 1].tab as LevelTabs)
    }

    return (
        <div className={`tab ${isActive ? "" : "hidden"}`}>
            <div className="goals-tab">
                <header className="level-frame-header">
                    <button className="close-btn" onClick={() => setIsActive(false)}>x</button>
                    <div className="hearts">
                        <FontAwesomeIcon icon={faHeart}/>
                        <FontAwesomeIcon icon={faHeart}/>
                        <FontAwesomeIcon icon={faHeart}/>
                        <FontAwesomeIcon icon={faHeart}/>
                    </div>
                </header>
                <div className="steps">
                    {steps.map((step) => (
                        <button className={`step ${step.tab == curTab && "active"}`}>
                            <FontAwesomeIcon icon={step.icon}/>
                        </button>
                    ))}
                </div>
                <div className="content">
                    <Goal isVisible={curTab == "goal"} data={levelOne.tabs.goal}/>
                    <ConceptFrame isVisible={curTab == "concept"} data={levelOne.tabs.concept}/>
                    <QuizFrame isVisible={curTab == "quiz"} quizData={quizData}/>
                    <TaskFrame isVisible={curTab == "task"}/>
                </div>
                <footer className="footer">
                    <button className="next-btn" onClick={nextTab}>Continue</button>
                </footer>
            </div>
        </div>
)
}
