import "./school.scss"

export function School() {

    function runLevelOne() {
        return
    }

    return (
        <div>
            <div className="course-title">
                Introduction Web-development
            </div>
            <div className="level-row">
                <div className="adjustToRight">
                <button className="level-btn" onClick={() => runLevelOne()}>
                    <div className="inside-btn">1</div>
                </button>
                <svg width="200" height="130" xmlns="http://www.w3.org/2000/svg">
                    <path d="M-1,60 Q95,50 65,181" stroke="#C77DFF" stroke-width="15" fill="transparent"/>
                </svg>
            </div>
            </div>
            <div className="level-row">
                <button className="level-btn moveToRight">
                    <div className="inside-btn">2</div>
                </button>
            </div>
            <div className="level-row">
                <div className="d-flex">
                    <svg width="200" height="140" xmlns="http://www.w3.org/2000/svg">
                        <path d="M201,48 Q115,42 140,181" stroke="#C77DFF" stroke-width="15" fill="transparent"/>
                    </svg>
                    <button className="level-btn">
                        <div className="inside-btn">3</div>
                    </button>
                    <svg width="200" height="130" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0,48 Q75,50 75,-1" stroke="#C77DFF" stroke-width="15" fill="transparent"/>
                    </svg>
                </div>
            </div>
            <div className="level-row">
                <div className="level-btns moveLeft-btns">
                    <button className="level-btn">
                        <div className="inside-btn">4</div>
                    </button>
                    <button className="level-btn">
                        <div className="inside-btn">5</div>
                    </button>
                </div>
            </div>
            <div className="level-row">
                <div className="centerY">
                    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                        <path d="M201,95 Q130,100 135,-1" stroke="#C77DFF" stroke-width="15" fill="transparent"/>
                    </svg>
                    <button className="level-btn">
                        <div className="inside-btn">6</div>
                    </button>
                    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                        <path d="M-1,95 Q65,99 65,201" stroke="#C77DFF" stroke-width="15" fill="transparent"/>
                    </svg>
                </div>
            </div>
            <div className="level-row">
                <div className="level-btns moveRight-btns">
                    <button className="level-btn">
                        <div className="inside-btn">7</div>
                    </button>
                    <button className="level-btn">
                        <div className="inside-btn">8</div>
                    </button>
                </div>
            </div>
            <div className="level-row">
                <div className="project-wrapper">
                    <svg className="line-svg" width="100%" height="60" xmlns="http://www.w3.org/2000/svg">
                        <path d="M260,0 260,60" stroke="#C77DFF" stroke-width="15" fill="transparent"/>
                    </svg>
                    <button className="project-btn">
                        <div className="inside-btn">Your first Project !</div>
                    </button>
                </div>
            </div>
        </div>
)
}