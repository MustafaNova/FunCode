import "./goal-frame.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faListCheck,
    faBullseye,
} from "@fortawesome/free-solid-svg-icons";

type props = {
    isVisible: boolean
}

export function Goal({isVisible}: props) {

    return (
        <div className={`step-content ${!isVisible && "hidden"}`}>
            <div className="goal-component">
                <div className="topic">
                    <div>
                       <FontAwesomeIcon icon={faBullseye} className="fs-35"/>
                    </div>
                    <div>
                        <h1 className="title">Level 1: Erste Schritte</h1>
                        <span className="subtitle">
                            Lets Go!
                        </span>
                    </div>
                </div>
                <div className="topic-content">
                    <div className="mission-header">
                        <span className="mission-icon">
              <FontAwesomeIcon icon={faListCheck}/>
              Mission
            </span>
                        <span className="fw-800">Basic Html</span>
                    </div>
                    <ul className="goal-list">
                        <li>Löse die ersten Aufgaben erfolgreich</li>
                        <li>Erreiche das Ziel, ohne alle Leben zu verlier</li>
                        <li>Erreiche das Ziel, ohne alle Leben zu verlieren</li>
                        <li>Erreiche das Ziel, ohne alle Leben zu verlieren</li>
                    </ul>
                    <span className="hint-txt">
      💡             Tipp: Wenn du unsicher bist, lies den Hinweis noch einmal – Geschwindigkeit kommt später.
                    </span>
                </div>
            </div>
        </div>
    )
}