import Editor from '@monaco-editor/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBug,
    faClock,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import s from './bugHunterMatch.module.scss';
import { useLocation } from 'react-router-dom';
import type { BugHunterTask } from '@funcode/shared';

export function BugHunterMatch() {
    const [code, setCode] = useState(`function calculateTotal(items) {
    let total = 0;

    for (let i = 0; i <= items.length; i++) {
        total += items[i].price;
    }

    return total;
}`);
    const location = useLocation();
    const task: BugHunterTask = location.state

    function handleSubmit() {
        console.log(code);
    }

    return (
        <main className={`${s.container} galaxyGridBackground`}>
            <section className={s.matchPanel}>
                <header className={s.header}>
                    <div>
                        <span className={s.kicker}>
                            <FontAwesomeIcon icon={faBug} />
                            Bug Hunter · 1v1
                        </span>

                        <h1>{task.name}</h1>

                        <p>
                            {task.description}
                        </p>
                    </div>

                    <div className={s.matchInfo}>
                        <span>
                            <FontAwesomeIcon icon={faUser} />
                            Opponent
                        </span>

                        <span>
                            <FontAwesomeIcon icon={faClock} />
                            01:42
                        </span>
                    </div>
                </header>
                <div className={s.editorSection}>
                    <div className={s.editorHeader}>
                        <span>solution.ts</span>
                        <span>1 hidden bug</span>
                    </div>

                    <Editor
                        height="520px"
                        language="typescript"
                        theme="vs-dark"
                        value={task.code}
                        onChange={(value) => setCode(value ?? '')}
                        options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            padding: { top: 16 },
                            scrollBeyondLastLine: false,
                            automaticLayout: true,
                        }}
                    />
                </div>
                <div className={s.actions}>
                    <span>
                        Fix the bug and submit your solution.
                    </span>

                    <button
                        className={s.submitButton}
                        onClick={handleSubmit}
                    >
                        Submit Fix
                    </button>
                </div>
            </section>
        </main>
    );
}