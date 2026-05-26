import "./level-frame.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHeart,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import { Goal } from "./goal-frame/goal-frame.tsx";
import { ConceptFrame } from "./concept-frame/concept-frame.tsx";
import { QuizFrame } from "./quiz-frame/quiz-frame.tsx";
import { TaskFrame } from "./task-frame/task-frame.tsx";
import { useEffect, useState } from "react";
import type { LevelTabs } from './types.ts';
import { useNavigate, useParams } from "react-router-dom";
import { getLevel } from "../../services/learning.progression.ts";
import { Course, type LevelModelDto } from "@funcode/shared";
import { LevelLoading } from "./level-loading/level-loading.tsx";
import { steps } from './steps.ts';

export function LevelFrame() {
    const { course, module, level } = useParams();
    const navigate = useNavigate();
    const [curTab, setCurTab] = useState<LevelTabs>("goal");
    const [levelContent, setLevelContent] = useState<LevelModelDto>();
    const [showModal, setShowModal] = useState(false);
    const [quizFinished, setQuizFinished] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const maxHearts = 2;
    const [hearts, setHearts] = useState<number>(maxHearts);
    const isLastTab = curTab === steps[steps.length - 1].tab;
    const continueDisabled = (curTab === "quiz" && !quizFinished) || isLastTab;

    function handleLoseHeart() {
        setHearts(prev => {
            if (prev == 0) {
                navigate("/levelLose");
            }
            return prev - 1;
        })
    }

    function nextTab() {
        const curIndex = steps.findIndex((step) => step.tab === curTab);
        setCurTab(steps[curIndex + 1].tab);
    }

    useEffect(() => {
        if (!course || !module || !level) return;
        const fetchLevel = async () => {
            const res = await getLevel({ course: course as Course, module, level: Number(level) });
            setLevelContent(res.data);
            setTimeout(() => setIsLoading(false), 1500)
        };
        void fetchLevel();
    }, [course, module, level]);

    if (isLoading || !levelContent) {
        return <LevelLoading />;
    }

    return (
        <div className="level-frame-shell">
            <div className="level-frame">
                <div className={`level-frame-overlay ${!showModal ? "is-hidden" : ""}`}>
                    <div className="level-frame-modal">
                        <h3 className="level-frame-modal__title">Are you sure?</h3>
                        <p className="level-frame-modal__text">Leave level? Your progress will not be saved.</p>
                        <div className="level-frame-modal__actions">
                            <button
                                className="level-frame-modal__btn level-frame-modal__btn--cancel"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="level-frame-modal__btn level-frame-modal__btn--leave"
                                onClick={() => navigate("/home")}
                            >
                                Leave
                            </button>
                        </div>
                    </div>
                </div>

                <header className="level-frame-header">
                    <button
                        className="level-frame-close-btn"
                        onClick={() => setShowModal(true)}
                        aria-label="Close level"
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                    <div className="level-frame-hearts" aria-label="Remaining hearts">
                        {Array.from({ length: maxHearts }).map((_, i) => (
                            <FontAwesomeIcon
                                key={i}
                                icon={i < hearts ? faHeart : emptyHeart}
                                className="level-frame-heart-icon"
                            />
                        ))}
                    </div>
                </header>

                <div className="level-frame-steps">
                    {steps.map((step) => {
                        const isActive = step.tab === curTab;

                        return (
                            <button
                                className={`level-frame-step ${isActive && "is-active"}`}
                                onClick={() => setCurTab(step.tab)}
                                disabled={!isActive}
                                aria-label={step.tab}
                            >
                                <FontAwesomeIcon icon={step.icon} />
                                <span>{step.tab}</span>
                            </button>
                        );
                    })}
                </div>

                <div className="level-frame-content">
                    <Goal isVisible={curTab === "goal"} data={levelContent.tabs.goal} />
                    <ConceptFrame isVisible={curTab === "concept"} data={levelContent.tabs.concept} />
                    <QuizFrame
                        isVisible={curTab === "quiz"}
                        quizData={levelContent.tabs.quiz}
                        onFinish={() => setQuizFinished(true)}
                        onHeartLose={handleLoseHeart}
                    />
                    <TaskFrame
                        isVisible={curTab === "task"}
                        data={levelContent.tabs.task}
                        onHeartLose={handleLoseHeart}
                    />
                </div>

                <footer className="level-frame-footer">
                    <button className="level-frame-next-btn" onClick={nextTab} disabled={continueDisabled}>
                        Continue
                    </button>
                </footer>
            </div>
        </div>
    );
}
