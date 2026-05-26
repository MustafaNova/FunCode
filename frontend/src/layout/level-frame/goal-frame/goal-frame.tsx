import "./goal-frame.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck, faBullseye } from "@fortawesome/free-solid-svg-icons";
import type { props } from "./types.ts";

export function Goal({ isVisible, data }: props) {
    return (
        <div className={`goal-frame ${!isVisible ? "goal-frame--hidden" : ""}`}>
            <div className="goal-frame__panel">
                <div className="goal-frame__topic">
                    <FontAwesomeIcon icon={faBullseye} className="goal-frame__topic-icon" />
                    <div>
                        <h2 className="goal-frame__heading">Mission Briefing</h2>
                        <p className="goal-frame__subtitle" id="subtitle">
                            {data.subtitle}
                        </p>
                    </div>
                </div>

                <div className="goal-frame__mission">
                    <div className="goal-frame__mission-header">
                        <span className="goal-frame__mission-badge">
                            <FontAwesomeIcon icon={faListCheck} />
                            Mission
                        </span>
                        <span className="goal-frame__mission-title" id="title">
                            {data.title}
                        </span>
                    </div>

                    <ul className="goal-frame__list" id="objectives">
                        {data.objectives.map((objective) => (
                            <li>{objective}</li>
                        ))}
                    </ul>

                    <span className="goal-frame__hint" id="hint">
                        {data.hint}
                    </span>
                </div>
            </div>
        </div>
    );
}
