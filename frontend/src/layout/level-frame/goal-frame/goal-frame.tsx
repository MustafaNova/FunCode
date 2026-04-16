import "./goal-frame.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faListCheck,
    faBullseye,
} from "@fortawesome/free-solid-svg-icons";
import type { props } from './types.ts';


export function Goal({isVisible, data}: props) {

    return (
        <div className={`step-content ${!isVisible && "hidden"}`}>
            <div className="goal-component">
                <div className="topic">
                    <div>
                       <FontAwesomeIcon icon={faBullseye} className="fs-35"/>
                    </div>
                    <div>
                        <h1 className="title">Level 1: Erste Schritte</h1>
                        <span className="subtitle" id="subtitle">
                            {data.subtitle}
                        </span>
                    </div>
                </div>
                <div className="topic-content">
                    <div className="mission-header">
                        <span className="mission-icon">
                            <FontAwesomeIcon icon={faListCheck}/>
                            Mission
                        </span>
                        <span className="fw-800" id="title">{data.title}</span>
                    </div>
                    <ul className="goal-list" id="objectives">
                        <li>{data.objectives[0]}</li>
                        <li>{data.objectives[1]}</li>
                        <li>{data.objectives[2]}</li>
                        <li>{data.objectives[3]}</li>
                    </ul>
                    <span className="hint-txt" id="hint">
                        {data.hint}
                    </span>
                </div>
            </div>
        </div>
    )
}