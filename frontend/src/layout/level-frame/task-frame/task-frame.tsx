import s from './task-frame.module.scss';

type props = {
    isVisible: boolean
}

export function TaskFrame({isVisible} : props) {

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
                                    <h1 id="title"></h1>
                                    <p className={s.subtitle} id="subtitle">
                                    </p>
                                </div>
                                <span className={s.badge} id="status">
                                    🟣 Noch nicht geprüft
                                </span>
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
                                </li>
                                <li id="goal2">
                                </li>
                                <li id="goal3">
                                </li>
                            </ul>
                            <div className={s.tip} id="hint">
                            </div>
                        </div>
                        <div className={s.editorWrap}>
                            <div className={s.editorHeader}>
                                <div className={s.title}>🧑‍💻 Code Editor</div>
                                <div className={s.actions}>
                                    <button className={s.btnSmall} id="btnReset" type="button">
                                        Reset
                                    </button>
                                    <button className={`${s.btnSmall} ${s.btnRun}`} id="btnRun" type="button">
                                        Ausführen &amp; Prüfen
                                    </button>
                                </div>
                            </div>
                            <textarea className={s.editor} id="editor" spellCheck={false} />
                            <div className={s.hint}>
                                Hinweis: Der Code läuft in einer Sandbox (iframe). Fokus: HTML/CSS/JS-Grundlagen.
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
                            <span className={s.badge} id="resultBadge">—</span>
                        </div>
                        <iframe
                            className={s.preview}
                            id="preview"
                            sandbox="allow-scripts allow-forms allow-same-origin"
                            title="Preview"
                        />
                    </div>
                </section>
            </main>
        </div>
    )
}