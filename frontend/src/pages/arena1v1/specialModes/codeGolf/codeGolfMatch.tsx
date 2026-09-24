import Editor from '@monaco-editor/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCode,
    faFlagCheckered,
    faKeyboard,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import s from './codeGolfMatch.module.scss';
import { useLocation } from 'react-router-dom';
import type { CodeGolfTask } from '@funcode/shared';

export function CodeGolfMatch() {
    const location = useLocation();
    const task: CodeGolfTask = location.state;
    const [code, setCode] = useState(task.code);

    const characterCount = code.length;
    const isOverLimit = characterCount > task.characterLimit;

    function handleSubmit() {
        if (isOverLimit) return;
        console.log(code);
    }

    return (
        <main className={`${s.container} galaxyGridBackground`}>
            <section className={s.matchPanel}>
                <header className={s.header}>
                    <div>
                        <span className={s.kicker}>
                            <FontAwesomeIcon icon={faFlagCheckered} />
                            Code Golf · 1v1
                        </span>
                        <h1>{task.name}</h1>
                        <p className={s.description}>{task.description}</p>
                    </div>

                    <div className={s.limitCard}>
                        <FontAwesomeIcon icon={faKeyboard} />

                        <div>
                            <span>Character limit</span>
                            <strong>{task.characterLimit}</strong>
                        </div>
                    </div>
                </header>

                <div className={s.editorSection}>
                    <div className={s.editorHeader}>
                        <span>
                            <FontAwesomeIcon icon={faCode} />
                            solution.js
                        </span>

                        <span
                            className={`${s.counter} ${
                                isOverLimit ? s.counterOverLimit : ''
                            }`}
                        >
                            {characterCount} / {task.characterLimit}
                        </span>
                    </div>

                    <Editor
                        height="520px"
                        language={task.language}
                        theme="vs-dark"
                        value={code}
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

                <div className={s.footer}>
                    <div>
                        <span className={s.footerLabel}>
                            Current solution
                        </span>

                        <strong
                            className={
                                isOverLimit ? s.overLimitText : undefined
                            }
                        >
                            {characterCount} characters
                        </strong>

                        <span className={s.remaining}>
                            {isOverLimit
                                ? `${characterCount - task.characterLimit} characters over the limit`
                                : `${task.characterLimit - characterCount} characters remaining`}
                        </span>
                    </div>

                    <button
                        className={s.submitButton}
                        disabled={isOverLimit}
                        onClick={handleSubmit}
                    >
                        Submit Solution
                    </button>
                </div>
            </section>
        </main>
    );
}