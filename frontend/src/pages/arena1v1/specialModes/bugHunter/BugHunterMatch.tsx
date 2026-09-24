import Editor from '@monaco-editor/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBug,
    faClock, faTriangleExclamation,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import s from './bugHunterMatch.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import type { BugHunterTask, SubmitResponse } from '@funcode/shared';
import { onError, onLose, onWin, onWrongSubmit, sendCode } from '../../../../services/socket/gameSocket.ts';

export function BugHunterMatch() {
    const navigate = useNavigate();
    const [submitResponse, setSubmitResponse] = useState<SubmitResponse | null>(null);
    const location = useLocation();
    const task: BugHunterTask = location.state
    const [code, setCode] = useState(task.code);

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>;

        const offWrong = onWrongSubmit((res) => {
            setSubmitResponse(res);

            clearTimeout(timeoutId);

            timeoutId = setTimeout(() => {
                setSubmitResponse(null);
            }, 2000);
        })

        const offError = onError((res) => {
            console.log(res);
        })

        const offWin = onWin(() => {
            navigate('/match/win');
        })

        const offLose = onLose(() => {
            navigate('/match/lose');
        })

        return () => {
            clearTimeout(timeoutId);
            offWrong();
            offWin();
            offLose();
            offError();
        }
    }, [navigate])

    function handleSubmit() {
        sendCode({ taskId: task.id, code})
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

                    {submitResponse && (
                        <span className={s.feedbackMessage}>
                                <FontAwesomeIcon icon={faTriangleExclamation} />
                            {submitResponse.playerName} had a failed submit
                            </span>
                    )}

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
                    </div>

                    <Editor
                        height="520px"
                        language="typescript"
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
