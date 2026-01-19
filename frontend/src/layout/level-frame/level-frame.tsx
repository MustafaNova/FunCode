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

type props = {
    isActive: boolean
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>
}

type LevelTabs = "goal" | "concept" | "quiz" | "task"

export function LevelFrame({isActive, setIsActive}: props) {

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
                    <Goal isVisible={curTab == "goal"}/>
                    <ConceptFrame isVisible={curTab == "concept"}/>
                    <QuizFrame isVisible={curTab == "quiz"}/>
                    <TaskFrame isVisible={curTab == "task"}/>
                </div>
                <footer className="footer">
                    <button className="next-btn" onClick={nextTab}>Continue</button>
                </footer>
            </div>
        </div>
)
}