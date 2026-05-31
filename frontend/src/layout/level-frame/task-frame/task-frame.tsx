import s from "./task-frame.module.scss";
import type { props } from "./types.ts";
import { useState } from "react";
import { Preview } from "../../../features/codeEditor/preview.tsx";
import { submitLevelTask } from "../../../services/learning.progression.ts";
import { useNavigate } from "react-router-dom";
import { useActiveScreen } from "../../../store/activeScreenStore.ts";

export function TaskFrame({ isVisible, data, onHeartLose }: props) {
    const navigate = useNavigate();
    const unlockLevel = useActiveScreen((state) => state.unlockNextLevel);
    const course = useActiveScreen((state) => state.course);
    const module = useActiveScreen((state) => state.module);
    const [code, setCode] = useState("");
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    async function submit() {
        if (!course || !module) return;
        const response = await submitLevelTask({ taskId: data.id, code, course, module });
        setIsCorrect(response.res);
        if (response.res) {
            unlockLevel();
            navigate("/levelWin");
        } else {
            onHeartLose();
        }
    }

    return (
        <div className={isVisible ? s.frame : `${s.frame} ${s.hidden}`}>
            <main className={s.content}>
                <section className={s.panel}>
                    <div className={s.brand}>
                        <div className={s.logo} aria-hidden="true">
                            <span>WP</span>
                        </div>
                        <div className={s.brandBody}>
                            <div className={s.taskTitle}>
                                <div>
                                    <h1 id="title">{data.title}</h1>
                                    <p className={s.subtitle} id="subtitle">
                                        {data.subtitle}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={s.grid}>
                    <div className={`${s.panel} ${s.task}`}>
                        <div className={s.taskBox}>
                            <b>Goals:</b>
                            <ul id="goals">
                                {data.goals.map((goal) => (
                                    <li>{goal}</li>
                                ))}
                            </ul>
                            <div className={s.tip} id="hint">
                                {data.hint}
                            </div>
                        </div>

                        <div className={s.editorWrap}>
                            <div className={s.editorHeader}>
                                <div className={s.title}>Code Editor</div>
                                <div className={s.actions}>
                                    <button type="button" className={s.btnSmall} id="btnReset" onClick={() => setCode("")}>
                                        Reset
                                    </button>
                                    <button type="button" className={`${s.btnSmall} ${s.btnRun}`} onClick={submit}>
                                        Pruefen
                                    </button>
                                </div>
                            </div>
                            <textarea
                                className={s.editor}
                                id="editor"
                                spellCheck={false}
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                            <div className={s.hint} />
                        </div>
                    </div>

                    <div className={s.output} aria-label="Output">
                        <div className={s.outputTop}>
                            <div>
                                <div className={s.outputTitle}>Output</div>
                                <div className={s.outputHint}>Hier siehst du die gerenderte Seite aus deinem Code.</div>
                            </div>
                            <span className={s.badge} id="resultBadge">
                                {isCorrect === null ? "-" : isCorrect ? "OK" : "X"}
                            </span>
                        </div>
                        <Preview code={code} />
                    </div>
                </section>
            </main>
        </div>
    );
}
