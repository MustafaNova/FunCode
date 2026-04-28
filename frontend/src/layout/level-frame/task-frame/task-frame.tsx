import s from './task-frame.module.scss';
import type { props } from './types.ts';
import { useState } from 'react';
import { Preview } from '../../../features/codeEditor/preview.tsx';


export function TaskFrame({isVisible, data} : props) {
    const [code, setCode] = useState("")

    return (
        <div className={isVisible ? "" : s.hidden}>
            <main className={s.content}>
                <section className={s.panel}>
                    <div className={s.brand}>
                        <div className={s.logo} aria-hidden="true">
                            <span>WP</span>
                        </div>
                        <div style={{ width: "100%" }}>
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
                                <li id="goal1">
                                    {data.goals[0]}
                                </li>
                                <li id="goal2">
                                    {data.goals[1]}
                                </li>
                                <li id="goal3">
                                    {data.goals[2]}
                                </li>
                            </ul>
                            <div className={s.tip} id="hint">
                                {data.hint}
                            </div>
                        </div>
                        <div className={s.editorWrap}>
                            <div className={s.editorHeader}>
                                <div className={s.title}>🧑‍💻 Code Editor</div>
                                <div className={s.actions}>
                                    <button className={s.btnSmall} id="btnReset" onClick={() => setCode("")}>
                                        Reset
                                    </button>
                                    <button className={`${s.btnSmall} ${s.btnRun}`} id="btnRun" type="button">
                                        Prüfen
                                    </button>
                                </div>
                            </div>
                            <textarea className={s.editor} id="editor" spellCheck={false} value={code}
                                      onChange={(e) => setCode(e.target.value)} />
                            <div className={s.hint}>
                            </div>
                        </div>
                    </div>
                    <div className={s.output} aria-label="Output">
                        <div className={s.outputTop}>
                            <div>
                                <div className={s.outputTitle}>🖥️ Output</div>
                                <div className={s.outputHint}>
                                    Hier siehst du die gerenderte Seite aus deinem Code.
                                </div>
                            </div>
                            <span className={s.badge} id="resultBadge">🟣</span>
                        </div>
                        <Preview code={code} />
                    </div>
                </section>
            </main>
        </div>
    )
}