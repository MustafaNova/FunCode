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

type props = {
    isActive: boolean
}

export function LevelFrame({isActive}: props) {

    return (
        <div className={`tab ${isActive ? "" : "d-none"}`}>
            <div className="goals-tab">
                <header className="header">
                    <button className="close-btn">x</button>
                    <div className="hearts">
                        <FontAwesomeIcon icon={faHeart}/>
                        <FontAwesomeIcon icon={faHeart}/>
                        <FontAwesomeIcon icon={faHeart}/>
                        <FontAwesomeIcon icon={faHeart}/>
                    </div>
                </header>
                <div className="steps">
                    <button className="step">
                        <FontAwesomeIcon icon={faBullseye}/>
                    </button>
                    <button className="step">
                        <FontAwesomeIcon icon={faBook}/>
                    </button>
                    <button className="step">
                        <FontAwesomeIcon icon={faQuestion}/>
                    </button>
                    <button className="step">
                        <FontAwesomeIcon icon={faCode}/>
                    </button>
                </div>
                <div className="content">
                    <Goal/>
                </div>
                <footer className="footer">
                    <button className="next-btn">Continue</button>
                </footer>
            </div>
        </div>
)
}