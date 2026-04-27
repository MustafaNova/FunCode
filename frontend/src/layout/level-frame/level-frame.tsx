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
import { useEffect, useState } from 'react';
import type { LevelTabs } from './types.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { getLevel } from '../../services/learning.progression.ts';
import { Course, type LevelModelDto } from '@funcode/shared';


export function LevelFrame() {
    const { course, module, level } = useParams();
    const navigate = useNavigate();
    const [curTab, setCurTab] = useState<LevelTabs>("goal")
    const [levelContent, setLevelContent] = useState<LevelModelDto>();
    const [showModal, setShowModal] = useState(false)
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

    useEffect(() => {
        if (!course || !module || !level) return;
        const fetchLevel = async () => {
            const res = await getLevel({ course: course as Course, module, level: Number(level) });
            setLevelContent(res.data);
        }
        fetchLevel();
    }, [])

    if(!levelContent) {
        return <div className="black">...loading</div>
    }

    return (
        <div className="tab">
            <div className="goals-tab">
                <div className={`overlay ${!showModal && "d-none"}`}>
                    <div className="modal">
                        <h3 className="title">Are you sure?</h3>
                        <p className="text">
                            Leave level? Your progress won’t be saved.
                        </p>

                        <div className="actions">
                            <button
                                className="btn btn-cancel"
                                onClick={() => setShowModal(false)}>
                                Cancel
                            </button>

                            <button
                                className="btn btn-leave"
                                onClick={() => navigate("/home")}>
                                Leave
                            </button>
                        </div>
                    </div>
                </div>
                <header className="level-frame-header">
                    <button className="close-btn" onClick={() => setShowModal(true)}>x</button>
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
                    <Goal isVisible={curTab == "goal"} data={levelContent.tabs.goal}/>
                    <ConceptFrame isVisible={curTab == "concept"} data={levelContent.tabs.concept}/>
                    <QuizFrame isVisible={curTab == "quiz"} quizData={levelContent.tabs.quiz}/>
                    <TaskFrame isVisible={curTab == "task"} data={levelContent.tabs.task}/>
                </div>
                <footer className="footer">
                    <button className="next-btn" onClick={nextTab}>Continue</button>
                </footer>
            </div>
        </div>
    )
}
