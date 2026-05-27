import "./school.scss"
import { useActiveScreen } from '../../store/activeScreenStore.ts';
import { useNavigate } from 'react-router-dom';
import { SchoolLiveTerminal } from './liveTerminal/SchoolLiveTerminal.tsx';

export function School() {
    const navigate = useNavigate();
    const course = useActiveScreen((state) => state.course);
    const module = useActiveScreen((state) => state.module);
    const unlockedLevel = useActiveScreen((state) => state.unlockedLevel);
    const goToLevel = (id: number) => navigate(`/level/${course}/${module}/${id}`);
    const isDisabled = (level: number) => level !== unlockedLevel;
    const completedLevels = Math.max(0, Math.min(unlockedLevel - 1, 9));
    const progress = Math.round((completedLevels / 9) * 100);
    const LEVELS = [1,2,3,4,5,6,7,8]

    return (
        <section className="school-screen">
            <div className="school-hero">
                <div className="school-copy">
                    <span className="school-kicker">{course}</span>
                    <h1>{module}</h1>
                    <p>Level up your coding skills and unlock your first complete project.</p>
                </div>
                <div className="school-terminal" aria-hidden="true">
                    <SchoolLiveTerminal />
                </div>
            </div>

            <div className="school-progress">
                <div className="school-progress-head">
                    <span>Campaign progress</span>
                    <strong>{progress}% complete</strong>
                </div>
                <div className="school-progress-track" aria-hidden="true">
                    <span style={{ width: `${progress}%` }} />
                </div>
            </div>

            <div className="school-level-grid" aria-label="Course levels">
                {LEVELS.map((level) => {
                    const isDone = level < unlockedLevel;
                    const isLocked = level > unlockedLevel;

                    return (
                        <button
                            key={level}
                            disabled={isDisabled(level)}
                            className={`school-level-card ${isDone ? "done" : ""} ${isLocked ? "locked" : ""}`}
                            onClick={() => goToLevel(level)}
                        >
                            <span className="school-level-number">{level}</span>
                            <span className="school-level-label">
                                {isDone ? "Cleared" : isLocked ? "Locked" : "Current battle"}
                            </span>
                        </button>
                    );
                })}
                <button
                    disabled={isDisabled(9)}
                    className={`school-project-card ${9 < unlockedLevel ? "done" : ""} ${9 > unlockedLevel ? "locked" : ""}`}
                    onClick={() => goToLevel(9)}
                >
                    <span className="school-project-tag">Final quest</span>
                    <strong>Your First Project</strong>
                    <span>
                        {9 === unlockedLevel ? "Ready to launch" : 9 < unlockedLevel ? "Completed" : "Unlock all levels"}
                    </span>
                </button>
            </div>
        </section>
    )
}
