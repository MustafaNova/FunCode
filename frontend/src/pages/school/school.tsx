import "./school.scss"
import { useActiveScreen } from '../../store/activeScreenStore.ts';
import { useNavigate } from 'react-router-dom';

export function School() {
    const navigate = useNavigate();
    const course = useActiveScreen((state) => state.course);
    const module = useActiveScreen((state) => state.module);
    const unlockedLevel = useActiveScreen((state) => state.unlockedLevel);
    const goToLevel = (id: number) => navigate(`/level/${course}/${module}/${id}`);
    const isDisabled = (level: number) => level != unlockedLevel;
    return (
        <div>
            <div className="course-title">
                Introduction Web-development
            </div>
            <div className="level-row">
                <div className="adjustToRight">
                <button
                    disabled={isDisabled(1)}
                    className={`level-btn ${1 < unlockedLevel && "done"} ${1 > unlockedLevel && "locked"}`}
                    onClick={() => goToLevel(1)}>
                    <div className="inside-btn">1</div>
                </button>
                <svg width="200" height="130" xmlns="http://www.w3.org/2000/svg">
                    <path d="M-1,60 Q95,50 65,181" stroke="#C77DFF" stroke-width="15" fill="transparent"/>
                </svg>
            </div>
            </div>
            <div className="level-row">
                <button
                    disabled={isDisabled(2)}
                    className={`level-btn moveToRight ${2 < unlockedLevel && "done"} ${2 > unlockedLevel && "locked"}`}
                    onClick={() => goToLevel(2)}>
                    <div className="inside-btn">2</div>
                </button>
            </div>
            <div className="level-row">
                <div className="d-flex">
                    <svg width="200" height="140" xmlns="http://www.w3.org/2000/svg">
                        <path d="M201,48 Q115,42 140,181" stroke="#C77DFF" stroke-width="15" fill="transparent"/>
                    </svg>
                    <button
                        disabled={isDisabled(3)}
                        className={`level-btn ${3 < unlockedLevel && "done"} ${3 > unlockedLevel && "locked"}`}
                        onClick={() => goToLevel(3)}>
                        <div className="inside-btn">3</div>
                    </button>
                    <svg width="200" height="130" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0,48 Q75,50 75,-1" stroke="#C77DFF" stroke-width="15" fill="transparent"/>
                    </svg>
                </div>
            </div>
            <div className="level-row">
                <div className="level-btns moveLeft-btns">
                    <button
                        disabled={isDisabled(4)}
                        className={`level-btn ${4 < unlockedLevel && "done"} ${4 > unlockedLevel && "locked"}`}
                        onClick={() => goToLevel(4)}>
                        <div className="inside-btn">4</div>
                    </button>
                    <button
                        disabled={isDisabled(5)}
                        className={`level-btn ${5 < unlockedLevel && "done"} ${5 > unlockedLevel && "locked"}`}
                        onClick={() => goToLevel(5)}>
                        <div className="inside-btn">5</div>
                    </button>
                </div>
            </div>
            <div className="level-row">
                <div className="centerY">
                    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                        <path d="M201,95 Q130,100 135,-1" stroke="#C77DFF" stroke-width="15" fill="transparent"/>
                    </svg>
                    <button
                        disabled={isDisabled(6)}
                        className={`level-btn ${6 < unlockedLevel && "done"} ${6 > unlockedLevel && "locked"}`}
                        onClick={() => goToLevel(6)}>
                        <div className="inside-btn">6</div>
                    </button>
                    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                        <path d="M-1,95 Q65,99 65,201" stroke="#C77DFF" stroke-width="15" fill="transparent"/>
                    </svg>
                </div>
            </div>
            <div className="level-row">
                <div className="level-btns moveRight-btns">
                    <button
                        disabled={isDisabled(7)}
                        className={`level-btn ${7 < unlockedLevel && "done"} ${7 > unlockedLevel && "locked"}`}
                        onClick={() => goToLevel(7)}>
                        <div className="inside-btn">7</div>
                    </button>
                    <button
                        disabled={isDisabled(8)}
                        className={`level-btn ${8 < unlockedLevel && "done"} ${8 > unlockedLevel && "locked"}`}
                        onClick={() => goToLevel(8)}>
                        <div className="inside-btn">8</div>
                    </button>
                </div>
            </div>
            <div className="level-row">
                <div className="project-wrapper">
                    <svg className="line-svg" width="100%" height="60" xmlns="http://www.w3.org/2000/svg">
                        <path d="M260,0 260,60" stroke="#C77DFF" stroke-width="15" fill="transparent"/>
                    </svg>
                    <button
                        disabled={isDisabled(9)}
                        className={`project-btn ${9 < unlockedLevel && "done"} ${9 > unlockedLevel && "locked"}`}
                        onClick={() => goToLevel(9)}>
                        <div className="inside-btn">Your first Project !</div>
                    </button>
                </div>
            </div>
        </div>
    )
}