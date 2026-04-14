import "./school.scss"
import { LevelFrame } from "../../layout/level-frame/level-frame.tsx";
import { useState } from "react";
import { useActiveScreen } from '../../store/activeScreenStore.ts';

export function School() {
    const [levelOneActive, setLevelOneActive] = useState(false)
    const course = useActiveScreen((state) => state.course);
    const module = useActiveScreen((state) => state.module);
    const unlockedLevel = useActiveScreen((state) => state.unlockedLevel);

    return (
        <div>
            <div className="course-title">
                Introduction Web-development
            </div>
            <div className="level-row">
                <div className="adjustToRight">
                <button className={`level-btn ${1 < unlockedLevel && "done"} ${1 > unlockedLevel && "locked"}`} onClick={() => setLevelOneActive(true)}>
                    <div className="inside-btn">1</div>
                </button>
                <svg width="200" height="130" xmlns="http://www.w3.org/2000/svg">
                    <path d="M-1,60 Q95,50 65,181" stroke="#C77DFF" stroke-width="15" fill="transparent"/>
                </svg>
            </div>
            </div>
            <div className="level-row">
                <button className={`level-btn moveToRight ${2 < unlockedLevel && "done"} ${2 > unlockedLevel && "locked"}`}>
                    <div className="inside-btn">2</div>
                </button>
            </div>
            <div className="level-row">
                <div className="d-flex">
                    <svg width="200" height="140" xmlns="http://www.w3.org/2000/svg">
                        <path d="M201,48 Q115,42 140,181" stroke="#C77DFF" stroke-width="15" fill="transparent"/>
                    </svg>
                    <button className={`level-btn ${3 < unlockedLevel && "done"} ${3 > unlockedLevel && "locked"}`}>
                        <div className="inside-btn">3</div>
                    </button>
                    <svg width="200" height="130" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0,48 Q75,50 75,-1" stroke="#C77DFF" stroke-width="15" fill="transparent"/>
                    </svg>
                </div>
            </div>
            <div className="level-row">
                <div className="level-btns moveLeft-btns">
                    <button className={`level-btn ${4 < unlockedLevel && "done"} ${4 > unlockedLevel && "locked"}`}>
                        <div className="inside-btn">4</div>
                    </button>
                    <button className={`level-btn ${5 < unlockedLevel && "done"} ${5 > unlockedLevel && "locked"}`}>
                        <div className="inside-btn">5</div>
                    </button>
                </div>
            </div>
            <div className="level-row">
                <div className="centerY">
                    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                        <path d="M201,95 Q130,100 135,-1" stroke="#C77DFF" stroke-width="15" fill="transparent"/>
                    </svg>
                    <button className={`level-btn ${6 < unlockedLevel && "done"} ${6 > unlockedLevel && "locked"}`}>
                        <div className="inside-btn">6</div>
                    </button>
                    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                        <path d="M-1,95 Q65,99 65,201" stroke="#C77DFF" stroke-width="15" fill="transparent"/>
                    </svg>
                </div>
            </div>
            <div className="level-row">
                <div className="level-btns moveRight-btns">
                    <button className={`level-btn ${7 < unlockedLevel && "done"} ${7 > unlockedLevel && "locked"}`}>
                        <div className="inside-btn">7</div>
                    </button>
                    <button className={`level-btn ${8 < unlockedLevel && "done"} ${8 > unlockedLevel && "locked"}`}>
                        <div className="inside-btn">8</div>
                    </button>
                </div>
            </div>
            <div className="level-row">
                <div className="project-wrapper">
                    <svg className="line-svg" width="100%" height="60" xmlns="http://www.w3.org/2000/svg">
                        <path d="M260,0 260,60" stroke="#C77DFF" stroke-width="15" fill="transparent"/>
                    </svg>
                    <button className={`project-btn ${9 < unlockedLevel && "done"} ${9 > unlockedLevel && "locked"}`}>
                        <div className="inside-btn">Your first Project !</div>
                    </button>
                </div>
            </div>
            <LevelFrame isActive={levelOneActive} setIsActive={setLevelOneActive}/>
        </div>
    )
}